import { spawn, execSync } from "child_process";
import { APP_CONFIG } from "../../config/appConfig.js";
import { extractProgress } from "../../utils/fileUtils.js";
import fs from "fs";
import path from "path";
import ytdlpPackage from "ffmpeg-ffprobe-yt-dlp-static-electron";

// Track active downloads and quality checks
export let activeDownloads = {
  video: null,
  playlist: null,
};

export let activeQualityChecks = {
  video: null,
  playlist: null,
};

// Track download info for cleanup
let downloadInfo = {
  video: { outputPath: null, partialFiles: [] },
  playlist: { outputPath: null, partialFiles: [] },
};

// Get the correct yt-dlp path (bundled or system)
function getYtDlpPath() {
  try {
    // Try to use bundled yt-dlp first
    if (ytdlpPackage && ytdlpPackage.ytdlp && ytdlpPackage.ytdlp.path) {
      const ytdlpPath = ytdlpPackage.ytdlp.path;
      console.log("Using bundled yt-dlp:", ytdlpPath);
      return ytdlpPath;
    }
  } catch (error) {
    console.log("Error accessing bundled yt-dlp:", error.message);
  }

  console.log("Bundled yt-dlp not available, falling back to system yt-dlp");
  // Fallback to system yt-dlp
  return "yt-dlp";
}

// Function to clean up partial files
function cleanupPartialFiles(type) {
  const info = downloadInfo[type];
  if (info.outputPath) {
    try {
      // Get the directory where files would be downloaded
      const outputTemplate = info.outputPath;
      const baseDir = outputTemplate.includes("/")
        ? outputTemplate.substring(0, outputTemplate.lastIndexOf("/"))
        : outputTemplate.substring(0, outputTemplate.lastIndexOf("\\"));

      console.log(`Cleaning up partial files in: ${baseDir}`);

      // Check if directory exists
      if (!fs.existsSync(baseDir)) {
        console.log(`Directory ${baseDir} doesn't exist, nothing to clean up`);
        return;
      }

      // Read all files in the directory
      const files = fs.readdirSync(baseDir);
      let cleanedCount = 0;

      files.forEach((file) => {
        const filePath = path.join(baseDir, file);
        let shouldDelete = false;

        // Check for various partial file patterns
        if (
          file.includes(".part") ||
          file.includes(".temp") ||
          file.includes(".tmp") ||
          file.includes(".ytdl") ||
          file.endsWith(".f248.webm") ||
          file.endsWith(".f251.webm") ||
          file.match(/\.f\d+\.\w+$/) || // Format-specific temp files like .f248.webm
          file.includes("(pass ") || // Files with "(pass -k to keep)"
          (file.includes("temp") &&
            (file.includes("video") || file.includes("audio")))
        ) {
          shouldDelete = true;
        }

        if (shouldDelete) {
          try {
            const stats = fs.statSync(filePath);
            // Only delete files, not directories
            if (stats.isFile()) {
              fs.unlinkSync(filePath);
              console.log(`✓ Cleaned up partial file: ${file}`);
              cleanedCount++;
            }
          } catch (err) {
            console.log(`✗ Could not clean up file ${file}: ${err.message}`);
          }
        }
      });

      console.log(`Cleanup completed. Removed ${cleanedCount} partial files.`);
    } catch (err) {
      console.log(`Error during cleanup: ${err.message}`);
    }
  }

  // Reset download info
  downloadInfo[type] = { outputPath: null, partialFiles: [] };
}

export function parseQualities(output) {
  console.log("Raw yt-dlp output:", output);
  return APP_CONFIG.qualities;
}

export function handleGetVideoQualities(event, videoURL) {
  return new Promise((resolve, reject) => {
    // Cancel any existing quality check
    if (activeQualityChecks.video) {
      activeQualityChecks.video.kill("SIGKILL");
    }
    const ytProcess = spawn(getYtDlpPath(), ["-F", "--no-playlist", videoURL]);
    activeQualityChecks.video = ytProcess;
    let output = "";

    ytProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    ytProcess.stderr.on("data", (data) => {
      output += data.toString();
    });

    ytProcess.on("close", (code) => {
      activeQualityChecks.video = null;
      if (code === 0) {
        const qualities = parseQualities(output);
        resolve(qualities);
      } else if (code === null || code === 137) {
        // Process was killed
        reject("Quality check was cancelled");
      } else {
        reject("Failed to get video qualities.");
      }
    });

    ytProcess.on("error", (error) => {
      activeQualityChecks.video = null;
      reject(`Failed to start quality check: ${error.message}`);
    });
  });
}

export function handleGetPlaylistQualities(event, playlistURL) {
  return new Promise((resolve, reject) => {
    // Cancel any existing quality check
    if (activeQualityChecks.playlist) {
      activeQualityChecks.playlist.kill("SIGKILL");
    }
    const ytProcess = spawn(getYtDlpPath(), [
      "-F",
      "--flat-playlist",
      playlistURL,
    ]);
    activeQualityChecks.playlist = ytProcess;
    let output = "";

    ytProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    ytProcess.stderr.on("data", (data) => {
      output += data.toString();
    });

    ytProcess.on("close", (code) => {
      activeQualityChecks.playlist = null;
      if (code === 0) {
        const qualities = parseQualities(output);
        resolve(qualities);
      } else if (code === null || code === 137) {
        // Process was killed
        reject("Quality check was cancelled");
      } else {
        reject("Failed to get playlist qualities.");
      }
    });

    ytProcess.on("error", (error) => {
      activeQualityChecks.playlist = null;
      reject(`Failed to start quality check: ${error.message}`);
    });
  });
}

export function handleDownloadVideo(
  event,
  videoURL,
  quality = "best",
  format = "mp4",
  downloadDir = "downloads"
) {
  return new Promise((resolve, reject) => {
    // Cancel any existing video download
    if (activeDownloads.video) {
      activeDownloads.video.kill("SIGKILL");
      cleanupPartialFiles("video");
    }

    // Clean up any existing partial files before starting
    downloadInfo.video.outputPath = `${downloadDir}/%(title)s.%(ext)s`;
    cleanupPartialFiles("video");

    const output = `${downloadDir}/%(title)s.%(ext)s`;
    downloadInfo.video.outputPath = output;

    let formatArg =
      quality === "best"
        ? "bv+ba/best"
        : quality === "worst"
        ? "worst"
        : quality;

    // Apply format preference if not "any"
    if (format !== "any" && !quality.includes("audio")) {
      formatArg = `${formatArg}[ext=${format}]/best[ext=${format}]/${formatArg}`;
    }
    const args = [
      "-f",
      formatArg,
      "-o",
      output,
      "--newline",
      "--abort-on-error",
      videoURL,
    ];
    const ytProcess = spawn(getYtDlpPath(), args, {
      detached: false, // Keep attached so we can kill the process group
      stdio: "pipe",
    });
    activeDownloads.video = ytProcess;

    ytProcess.stdout.on("data", (data) => {
      const output = data.toString();
      event.sender.send("download-progress", output);

      // Extract progress information
      const percentage = extractProgress(output);
      if (percentage !== null) {
        event.sender.send("download-progress", {
          type: "video",
          percentage,
          text: output,
        });
      }
    });

    ytProcess.stderr.on("data", (data) => {
      event.sender.send("download-progress", data.toString());
    });

    ytProcess.on("close", (code) => {
      activeDownloads.video = null;
      if (code === 0) {
        downloadInfo.video = { outputPath: null, partialFiles: [] }; // Reset on success
        event.sender.send("download-complete", { type: "video" });
        resolve("Video download completed!");
      } else if (code === null || code === 137 || code === -15) {
        // Process was killed (null, SIGKILL=137, SIGTERM=-15)
        cleanupPartialFiles("video");
        event.sender.send("download-cancelled", { type: "video" });
        resolve("Download was cancelled");
      } else {
        cleanupPartialFiles("video");
        reject("Video download failed.");
      }
    });

    ytProcess.on("error", (error) => {
      activeDownloads.video = null;
      cleanupPartialFiles("video");
      reject(`Failed to start download: ${error.message}`);
    });
  });
}

export function handleDownloadPlaylist(
  event,
  playlistURL,
  quality = "best",
  format = "mp4",
  downloadDir = "downloads"
) {
  return new Promise((resolve, reject) => {
    // Cancel any existing playlist download
    if (activeDownloads.playlist) {
      activeDownloads.playlist.kill("SIGKILL");
      cleanupPartialFiles("playlist");
    }

    // Clean up any existing partial files before starting
    downloadInfo.playlist.outputPath = `${downloadDir}/%(playlist_index)02d - %(title)s.%(ext)s`;
    cleanupPartialFiles("playlist");

    const output = `${downloadDir}/%(playlist_index)02d - %(title)s.%(ext)s`;
    downloadInfo.playlist.outputPath = output;

    let formatArg =
      quality === "best"
        ? "bv+ba/best"
        : quality === "worst"
        ? "worst"
        : quality;

    // Apply format preference if not "any"
    if (format !== "any" && !quality.includes("audio")) {
      formatArg = `${formatArg}[ext=${format}]/best[ext=${format}]/${formatArg}`;
    }
    const args = [
      "-f",
      formatArg,
      "-o",
      output,
      "--newline",
      "--abort-on-error",
      playlistURL,
    ];
    const ytProcess = spawn(getYtDlpPath(), args, {
      detached: false, // Keep attached so we can kill the process group
      stdio: "pipe",
    });
    activeDownloads.playlist = ytProcess;

    ytProcess.stdout.on("data", (data) => {
      const output = data.toString();
      event.sender.send("download-progress", output);

      // Extract progress information
      const percentage = extractProgress(output);
      if (percentage !== null) {
        event.sender.send("download-progress", {
          type: "playlist",
          percentage,
          text: output,
        });
      }
    });

    ytProcess.stderr.on("data", (data) => {
      event.sender.send("download-progress", data.toString());
    });

    ytProcess.on("close", (code) => {
      activeDownloads.playlist = null;
      if (code === 0) {
        downloadInfo.playlist = { outputPath: null, partialFiles: [] }; // Reset on success
        event.sender.send("download-complete", { type: "playlist" });
        resolve("Playlist download completed!");
      } else if (code === null || code === 137 || code === -15) {
        // Process was killed (null, SIGKILL=137, SIGTERM=-15)
        cleanupPartialFiles("playlist");
        event.sender.send("download-cancelled", { type: "playlist" });
        resolve("Download was cancelled");
      } else {
        cleanupPartialFiles("playlist");
        reject("Playlist download failed.");
      }
    });

    ytProcess.on("error", (error) => {
      activeDownloads.playlist = null;
      cleanupPartialFiles("playlist");
      reject(`Failed to start download: ${error.message}`);
    });
  });
}

export function handleCancelDownload(event, type) {
  if (activeDownloads[type]) {
    console.log(`Attempting to cancel ${type} download...`);

    const process = activeDownloads[type];
    const pid = process.pid;

    // Try multiple kill signals for more aggressive cancellation
    try {
      // First try SIGTERM
      process.kill("SIGTERM");
      console.log(`Sent SIGTERM to PID ${pid}`);

      // Then SIGKILL after a brief delay
      setTimeout(() => {
        if (activeDownloads[type] && activeDownloads[type].pid === pid) {
          try {
            process.kill("SIGKILL");
            console.log(`Sent SIGKILL to PID ${pid}`);
          } catch (e) {
            console.log(`SIGKILL failed: ${e.message}`);
          }
        }
      }, 100);

      // Force cleanup and try system kill
      setTimeout(() => {
        if (activeDownloads[type] && activeDownloads[type].pid === pid) {
          console.log(`Force cleanup for PID ${pid}`);
          try {
            // Try system kill on Windows
            if (process.platform === "win32") {
              execSync(`taskkill /f /pid ${pid}`, { stdio: "ignore" });
              console.log(`Used taskkill on PID ${pid}`);
            } else {
              execSync(`kill -9 ${pid}`, { stdio: "ignore" });
              console.log(`Used kill -9 on PID ${pid}`);
            }
          } catch (e) {
            console.log(`System kill failed: ${e.message}`);
          }

          activeDownloads[type] = null;
          cleanupPartialFiles(type);
        }
      }, 500);
    } catch (error) {
      console.error(`Error killing process:`, error);
    }

    activeDownloads[type] = null;
    cleanupPartialFiles(type);
    event.sender.send("download-cancelled", { type });
    return "Download cancelled and partial files cleaned up";
  }
  return "No active download to cancel";
}

// New function to cancel quality checks
export function handleCancelQualityCheck(event, type) {
  if (activeQualityChecks[type]) {
    activeQualityChecks[type].kill("SIGKILL");
    activeQualityChecks[type] = null;
    return "Quality check cancelled";
  }
  return "No active quality check to cancel";
}
