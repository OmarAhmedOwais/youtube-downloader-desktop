import fs from "fs";
import path from "path";

/**
 * Ensure a directory exists, create it if it doesn't
 * @param {string} dirPath - The directory path to ensure
 */
export function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Sanitize filename for cross-platform compatibility
 * @param {string} filename - The filename to sanitize
 * @returns {string} - Sanitized filename
 */
export function sanitizeFilename(filename) {
  return filename
    .replace(/[<>:"/\\|?*]/g, "_")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Format bytes to human readable string
 * @param {number} bytes - Number of bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted string
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Extract progress percentage from yt-dlp output
 * @param {string} output - yt-dlp output string
 * @returns {number|null} - Progress percentage or null if not found
 */
export function extractProgress(output) {
  const progressMatch = output.match(/(\d+(?:\.\d+)?)%/);
  return progressMatch ? parseFloat(progressMatch[1]) : null;
}

/**
 * Validate YouTube URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid YouTube URL
 */
export function isValidYouTubeURL(url) {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/playlist\?list=)/;
  return youtubeRegex.test(url);
}

/**
 * Get file extension from format
 * @param {string} format - Format string
 * @returns {string} - File extension
 */
export function getFileExtension(format) {
  const extensionMap = {
    mp4: "mp4",
    webm: "webm",
    mkv: "mkv",
    avi: "avi",
    mp3: "mp3",
    m4a: "m4a",
    ogg: "ogg",
    any: "mp4", // default
  };

  return extensionMap[format] || "mp4";
}
