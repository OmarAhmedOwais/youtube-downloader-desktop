// Get DOM elements
const videoUrlInput = document.getElementById("videoUrl");
const playlistUrlInput = document.getElementById("playlistUrl");
const selectDirectoryBtn = document.getElementById("selectDirectoryBtn");
const directoryPath = document.getElementById("directoryPath");
const getVideoQualitiesBtn = document.getElementById("getVideoQualitiesBtn");
const getPlaylistQualitiesBtn = document.getElementById(
  "getPlaylistQualitiesBtn"
);
const cancelVideoQualitiesBtn = document.getElementById(
  "cancelVideoQualitiesBtn"
);
const cancelPlaylistQualitiesBtn = document.getElementById(
  "cancelPlaylistQualitiesBtn"
);
const videoQualitySelect = document.getElementById("videoQualitySelect");
const playlistQualitySelect = document.getElementById("playlistQualitySelect");
const videoFormatSelect = document.getElementById("videoFormatSelect");
const playlistFormatSelect = document.getElementById("playlistFormatSelect");
const downloadVideoBtn = document.getElementById("downloadVideoBtn");
const downloadPlaylistBtn = document.getElementById("downloadPlaylistBtn");
const cancelVideoBtn = document.getElementById("cancelVideoBtn");
const cancelPlaylistBtn = document.getElementById("cancelPlaylistBtn");
const progressDiv = document.getElementById("progress");
const progressFill = document.getElementById("progressFill");
const progressPercentage = document.getElementById("progressPercentage");
const videoFormatContainer = document.getElementById("videoFormatContainer");
const playlistFormatContainer = document.getElementById(
  "playlistFormatContainer"
);
const videoDownloadContainer = document.getElementById(
  "videoDownloadContainer"
);
const playlistDownloadContainer = document.getElementById(
  "playlistDownloadContainer"
);
const videoStatus = document.getElementById("videoStatus");
const playlistStatus = document.getElementById("playlistStatus");

// Progress tracking
let currentProgress = { video: 0, playlist: 0 };
let isDownloading = { video: false, playlist: false };

function appendProgress(text) {
  if (typeof text === "object") {
    // Handle progress data with percentage
    const { type, percentage, text: progressText } = text;
    currentProgress[type] = percentage;

    // Update progress bar (use the active download's progress)
    const activeProgress = isDownloading.video
      ? currentProgress.video
      : isDownloading.playlist
      ? currentProgress.playlist
      : 0;

    updateProgressBar(activeProgress);
    appendProgress(progressText);
  } else {
    // Handle regular text
    progressDiv.textContent += text;
    progressDiv.scrollTop = progressDiv.scrollHeight;
  }
}

function updateProgressBar(percentage) {
  progressFill.style.width = `${percentage}%`;
  progressFill.textContent = `${percentage.toFixed(1)}%`;
  progressPercentage.textContent = `${percentage.toFixed(1)}%`;
}

function resetProgress() {
  currentProgress = { video: 0, playlist: 0 };
  updateProgressBar(0);
}

function showStatus(element, message, type = "info") {
  element.textContent = message;
  element.className = `status-info ${type}`;
  element.classList.remove("hidden");
}

function hideStatus(element) {
  element.classList.add("hidden");
}

function setDownloadState(type, downloading) {
  isDownloading[type] = downloading;

  if (type === "video") {
    downloadVideoBtn.disabled = downloading;
    cancelVideoBtn.classList.toggle("hidden", !downloading);

    if (downloading) {
      downloadVideoBtn.textContent = "⏳ Downloading...";
      showStatus(videoStatus, "Download in progress...", "info");
    } else {
      downloadVideoBtn.textContent = "⬇️ Download Video";
      downloadVideoBtn.disabled = false;
    }
  } else {
    downloadPlaylistBtn.disabled = downloading;
    cancelPlaylistBtn.classList.toggle("hidden", !downloading);

    if (downloading) {
      downloadPlaylistBtn.textContent = "⏳ Downloading...";
      showStatus(playlistStatus, "Download in progress...", "info");
    } else {
      downloadPlaylistBtn.textContent = "⬇️ Download Playlist";
      downloadPlaylistBtn.disabled = false;
    }
  }
}

// Update format options based on quality selection
function updateFormatOptions(qualitySelect, formatSelect) {
  const selectedQuality = qualitySelect.value;
  const selectedText = qualitySelect.options[qualitySelect.selectedIndex].text;

  // Check if it's audio-only based on the display text (more reliable)
  const isAudio =
    selectedText.includes("Audio Only") || selectedQuality.startsWith("ba/");

  // Clear current options
  formatSelect.innerHTML = "";

  if (isAudio) {
    // Audio format options
    const audioFormats = [
      { value: "mp3", text: "MP3" },
      { value: "m4a", text: "M4A" },
      { value: "ogg", text: "OGG" },
      { value: "webm", text: "WebM" },
      { value: "any", text: "Any Format" },
    ];

    audioFormats.forEach((format) => {
      const option = document.createElement("option");
      option.value = format.value;
      option.textContent = format.text;
      formatSelect.appendChild(option);
    });
  } else {
    // Video format options
    const videoFormats = [
      { value: "mp4", text: "MP4" },
      { value: "webm", text: "WebM" },
      { value: "mkv", text: "MKV" },
      { value: "avi", text: "AVI" },
      { value: "any", text: "Any Format" },
    ];

    videoFormats.forEach((format) => {
      const option = document.createElement("option");
      option.value = format.value;
      option.textContent = format.text;
      formatSelect.appendChild(option);
    });
  }
}

// Directory selection functionality
async function updateDirectoryDisplay() {
  try {
    if (!window.api || !window.api.getDownloadDirectory) {
      directoryPath.textContent = "API not available";
      return;
    }

    const result = await window.api.getDownloadDirectory();

    if (result && result.path) {
      directoryPath.textContent = result.path;
    } else {
      directoryPath.textContent = "No path returned";
    }
  } catch (error) {
    console.error("Error getting download directory:", error);
    directoryPath.textContent = `Error: ${error.message}`;
  }
}

async function selectDownloadDirectory() {
  try {
    if (!window.api || !window.api.selectDirectory) {
      showStatus(
        videoStatus,
        "❌ Directory selection API not available",
        "error"
      );
      return;
    }

    showStatus(videoStatus, "📂 Opening directory selection dialog...", "info");
    const result = await window.api.selectDirectory();

    if (result && result.success) {
      directoryPath.textContent = result.path;
      showStatus(
        videoStatus,
        `✅ Download directory changed to: ${result.path}`,
        "success"
      );

      // Clear the status after a delay
      setTimeout(() => {
        hideStatus(videoStatus);
      }, 3000);
    } else {
      showStatus(videoStatus, "📂 Directory selection cancelled", "warning");
      setTimeout(() => {
        hideStatus(videoStatus);
      }, 2000);
    }
  } catch (error) {
    console.error("Error selecting directory:", error);
    showStatus(videoStatus, `❌ Error: ${error.message}`, "error");
    setTimeout(() => {
      hideStatus(videoStatus);
    }, 3000);
  }
}

// Event Handlers
getVideoQualitiesBtn.addEventListener("click", async () => {
  const url = videoUrlInput.value.trim();
  if (!url) return alert("Please enter a video URL");

  if (!window.api || !window.api.getVideoQualities) {
    return alert("API not available. Please restart the application.");
  }

  try {
    getVideoQualitiesBtn.disabled = true;
    getVideoQualitiesBtn.textContent = "🔄 Loading...";
    cancelVideoQualitiesBtn.classList.remove("hidden");

    appendProgress("Getting available qualities...\n");
    const qualities = await window.api.getVideoQualities(url);

    // Clear existing options
    videoQualitySelect.innerHTML = "";

    // Add quality options
    qualities.forEach((quality) => {
      const option = document.createElement("option");
      option.value = quality.value;
      option.textContent = quality.display;
      if (quality.disabled) {
        option.disabled = true;
        option.style.fontWeight = "bold";
        option.style.color = "#666";
      }
      videoQualitySelect.appendChild(option);
    });

    // Show quality selector and download button
    videoFormatContainer.classList.remove("hidden");
    videoDownloadContainer.classList.remove("hidden");

    // Update format options based on default selection
    updateFormatOptions(videoQualitySelect, videoFormatSelect);

    appendProgress(`Found ${qualities.length} quality options.\n`);
    showStatus(
      videoStatus,
      `Found ${qualities.length} quality options. Ready to download!`,
      "success"
    );
  } catch (e) {
    appendProgress(`Error getting qualities: ${e}\n`);
    showStatus(videoStatus, `Error: ${e}`, "error");
  } finally {
    getVideoQualitiesBtn.disabled = false;
    getVideoQualitiesBtn.textContent = "🔍 Get Available Qualities";
    cancelVideoQualitiesBtn.classList.add("hidden");
  }
});

getPlaylistQualitiesBtn.addEventListener("click", async () => {
  const url = playlistUrlInput.value.trim();
  if (!url) return alert("Please enter a playlist URL");

  if (!window.api || !window.api.getPlaylistQualities) {
    return alert("API not available. Please restart the application.");
  }

  try {
    getPlaylistQualitiesBtn.disabled = true;
    getPlaylistQualitiesBtn.textContent = "🔄 Loading...";
    cancelPlaylistQualitiesBtn.classList.remove("hidden");

    appendProgress("Getting available qualities...\n");
    const qualities = await window.api.getPlaylistQualities(url);

    // Clear existing options
    playlistQualitySelect.innerHTML = "";

    // Add quality options
    qualities.forEach((quality) => {
      const option = document.createElement("option");
      option.value = quality.value;
      option.textContent = quality.display;
      if (quality.disabled) {
        option.disabled = true;
        option.style.fontWeight = "bold";
        option.style.color = "#666";
      }
      playlistQualitySelect.appendChild(option);
    });

    // Show quality selector and download button
    playlistFormatContainer.classList.remove("hidden");
    playlistDownloadContainer.classList.remove("hidden");

    // Update format options based on default selection
    updateFormatOptions(playlistQualitySelect, playlistFormatSelect);

    appendProgress(`Found ${qualities.length} quality options.\n`);
    showStatus(
      playlistStatus,
      `Found ${qualities.length} quality options. Ready to download!`,
      "success"
    );
  } catch (e) {
    appendProgress(`Error getting qualities: ${e}\n`);
    showStatus(playlistStatus, `Error: ${e}`, "error");
  } finally {
    getPlaylistQualitiesBtn.disabled = false;
    getPlaylistQualitiesBtn.textContent = "🔍 Get Available Qualities";
    cancelPlaylistQualitiesBtn.classList.add("hidden");
  }
});

// Update format options when quality changes
videoQualitySelect.addEventListener("change", () => {
  updateFormatOptions(videoQualitySelect, videoFormatSelect);
});

playlistQualitySelect.addEventListener("change", () => {
  updateFormatOptions(playlistQualitySelect, playlistFormatSelect);
});

downloadVideoBtn.addEventListener("click", async () => {
  const url = videoUrlInput.value.trim();
  const quality = videoQualitySelect.value;
  const format = videoFormatSelect.value;

  if (!url) return alert("Please enter a video URL");
  if (!quality || quality === "")
    return alert("Please select a valid quality option");

  if (!window.api || !window.api.downloadVideo) {
    return alert("API not available. Please restart the application.");
  }

  try {
    resetProgress();
    setDownloadState("video", true);

    const selectedQualityText =
      videoQualitySelect.options[videoQualitySelect.selectedIndex].text;
    const selectedFormatText =
      videoFormatSelect.options[videoFormatSelect.selectedIndex].text;

    appendProgress(`\n=== Starting Video Download ===\n`);
    appendProgress(`Quality: ${selectedQualityText}\n`);
    appendProgress(`Format: ${selectedFormatText}\n`);
    appendProgress(`URL: ${url}\n`);
    appendProgress(`==============================\n\n`);

    const msg = await window.api.downloadVideo(url, quality, format);
    appendProgress(`\n✅ ${msg}\n`);
  } catch (e) {
    appendProgress(`\n❌ Error: ${e}\n`);
    showStatus(videoStatus, `Error: ${e}`, "error");
  } finally {
    setDownloadState("video", false);
  }
});

downloadPlaylistBtn.addEventListener("click", async () => {
  const url = playlistUrlInput.value.trim();
  const quality = playlistQualitySelect.value;
  const format = playlistFormatSelect.value;

  if (!url) return alert("Please enter a playlist URL");
  if (!quality || quality === "")
    return alert("Please select a valid quality option");

  if (!window.api || !window.api.downloadPlaylist) {
    return alert("API not available. Please restart the application.");
  }

  try {
    resetProgress();
    setDownloadState("playlist", true);

    const selectedQualityText =
      playlistQualitySelect.options[playlistQualitySelect.selectedIndex].text;
    const selectedFormatText =
      playlistFormatSelect.options[playlistFormatSelect.selectedIndex].text;

    appendProgress(`\n=== Starting Playlist Download ===\n`);
    appendProgress(`Quality: ${selectedQualityText}\n`);
    appendProgress(`Format: ${selectedFormatText}\n`);
    appendProgress(`URL: ${url}\n`);
    appendProgress(`=================================\n\n`);

    const msg = await window.api.downloadPlaylist(url, quality, format);
    appendProgress(`\n✅ ${msg}\n`);
  } catch (e) {
    appendProgress(`\n❌ Error: ${e}\n`);
    showStatus(playlistStatus, `Error: ${e}`, "error");
  } finally {
    setDownloadState("playlist", false);
  }
});

// Cancel buttons
cancelVideoBtn.addEventListener("click", async () => {
  try {
    appendProgress("\n🛑 Cancelling video download...\n");
    showStatus(videoStatus, "Cancelling download...", "warning");

    const result = await window.api.cancelDownload("video");
    appendProgress(`✓ ${result}\n`);
    showStatus(videoStatus, "Download cancelled and cleaned up", "warning");
  } catch (e) {
    appendProgress(`\nError cancelling download: ${e}\n`);
    showStatus(videoStatus, `Error cancelling: ${e}`, "error");
  }
});

cancelPlaylistBtn.addEventListener("click", async () => {
  try {
    appendProgress("\n🛑 Cancelling playlist download...\n");
    showStatus(playlistStatus, "Cancelling download...", "warning");

    const result = await window.api.cancelDownload("playlist");
    appendProgress(`✓ ${result}\n`);
    showStatus(playlistStatus, "Download cancelled and cleaned up", "warning");
  } catch (e) {
    appendProgress(`\nError cancelling download: ${e}\n`);
    showStatus(playlistStatus, `Error cancelling: ${e}`, "error");
  }
});

// Cancel quality check buttons
cancelVideoQualitiesBtn.addEventListener("click", async () => {
  try {
    if (window.api && window.api.cancelQualityCheck) {
      await window.api.cancelQualityCheck("video");
      appendProgress("\n🛑 Video quality check cancelled by user\n");
      showStatus(videoStatus, "Quality check cancelled", "warning");
    }
  } catch (e) {
    appendProgress(`\nError cancelling quality check: ${e}\n`);
    showStatus(videoStatus, `Error cancelling: ${e}`, "error");
  } finally {
    // Reset button state
    getVideoQualitiesBtn.disabled = false;
    getVideoQualitiesBtn.textContent = "🔍 Get Available Qualities";
    cancelVideoQualitiesBtn.classList.add("hidden");
  }
});

cancelPlaylistQualitiesBtn.addEventListener("click", async () => {
  try {
    if (window.api && window.api.cancelQualityCheck) {
      await window.api.cancelQualityCheck("playlist");
      appendProgress("\n🛑 Playlist quality check cancelled by user\n");
      showStatus(playlistStatus, "Quality check cancelled", "warning");
    }
  } catch (e) {
    appendProgress(`\nError cancelling quality check: ${e}\n`);
    showStatus(playlistStatus, `Error cancelling: ${e}`, "error");
  } finally {
    // Reset button state
    getPlaylistQualitiesBtn.disabled = false;
    getPlaylistQualitiesBtn.textContent = "🔍 Get Available Qualities";
    cancelPlaylistQualitiesBtn.classList.add("hidden");
  }
});

// Progress event handlers
if (window.api && window.api.onProgress) {
  window.api.onProgress((data) => {
    appendProgress(data);
  });
}

if (window.api && window.api.onDownloadComplete) {
  window.api.onDownloadComplete((data) => {
    const { type } = data;
    setDownloadState(type, false);

    if (type === "video") {
      showStatus(
        videoStatus,
        "✅ Video download completed successfully!",
        "success"
      );
    } else {
      showStatus(
        playlistStatus,
        "✅ Playlist download completed successfully!",
        "success"
      );
    }

    // Reset progress after a delay
    setTimeout(() => {
      resetProgress();
    }, 2000);
  });
}

if (window.api && window.api.onDownloadCancelled) {
  window.api.onDownloadCancelled((data) => {
    const { type } = data;
    setDownloadState(type, false);
    resetProgress();
  });
}

// Initialize directory display on page load
document.addEventListener("DOMContentLoaded", () => {
  // Wait for API to be available
  const checkApiAndInitialize = () => {
    if (window.api && window.api.getDownloadDirectory) {
      updateDirectoryDisplay();
    } else {
      setTimeout(checkApiAndInitialize, 100);
    }
  };

  checkApiAndInitialize();
});

// Event listener for directory selection
selectDirectoryBtn.addEventListener("click", selectDownloadDirectory);
