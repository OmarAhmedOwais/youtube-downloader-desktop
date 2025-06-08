const { contextBridge, ipcRenderer } = require("electron");

// Expose the API to the renderer process
contextBridge.exposeInMainWorld("api", {
  downloadVideo: (url, quality, format) =>
    ipcRenderer.invoke("download-video", url, quality, format),
  downloadPlaylist: (url, quality, format) =>
    ipcRenderer.invoke("download-playlist", url, quality, format),
  getVideoQualities: (url) => ipcRenderer.invoke("get-video-qualities", url),
  getPlaylistQualities: (url) =>
    ipcRenderer.invoke("get-playlist-qualities", url),
  cancelDownload: (type) => ipcRenderer.invoke("cancel-download", type),
  cancelQualityCheck: (type) =>
    ipcRenderer.invoke("cancel-quality-check", type),
  selectDirectory: () => ipcRenderer.invoke("select-directory"),
  getDownloadDirectory: () => ipcRenderer.invoke("get-download-directory"),
  onProgress: (callback) =>
    ipcRenderer.on("download-progress", (event, data) => callback(data)),
  onDownloadComplete: (callback) =>
    ipcRenderer.on("download-complete", (event, data) => callback(data)),
  onDownloadCancelled: (callback) =>
    ipcRenderer.on("download-cancelled", (event, data) => callback(data)),
});
