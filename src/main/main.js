import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { APP_CONFIG } from "../config/appConfig.js";
import { ensureDirectoryExists } from "../utils/fileUtils.js";
import {
  handleGetVideoQualities,
  handleGetPlaylistQualities,
  handleDownloadVideo,
  handleDownloadPlaylist,
  handleCancelDownload,
  handleCancelQualityCheck,
} from "./handlers/downloadHandlers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Current download directory (default to downloads folder)
let currentDownloadDir = path.join(__dirname, "../../downloads");

// Ensure downloads directory exists
ensureDirectoryExists(currentDownloadDir);

// Handler for directory selection
async function handleSelectDirectory() {
  console.log("handleSelectDirectory called");
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
      title: "Select Download Directory",
      defaultPath: currentDownloadDir,
    });

    console.log("Dialog result:", result);

    if (!result.canceled && result.filePaths.length > 0) {
      currentDownloadDir = result.filePaths[0];
      ensureDirectoryExists(currentDownloadDir);
      console.log("Directory selected:", currentDownloadDir);
      return { success: true, path: currentDownloadDir };
    }

    console.log("Directory selection cancelled");
    return { success: false, path: currentDownloadDir };
  } catch (error) {
    console.error("Error in handleSelectDirectory:", error);
    return { success: false, path: currentDownloadDir, error: error.message };
  }
}

// Handler to get current download directory
function handleGetDownloadDirectory() {
  console.log(
    "handleGetDownloadDirectory called, returning:",
    currentDownloadDir
  );
  return { path: currentDownloadDir };
}

function createWindow() {
  console.log("Creating window...");
  console.log("Preload path:", path.join(__dirname, "../preload/preload.js"));
  console.log(
    "HTML path:",
    path.join(__dirname, "../renderer/pages/index.html")
  );

  const win = new BrowserWindow({
    width: APP_CONFIG.window.width,
    height: APP_CONFIG.window.height,
    minWidth: APP_CONFIG.window.minWidth,
    minHeight: APP_CONFIG.window.minHeight,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, "../../assets/icons/app-icon.svg"),
  });
  win.loadFile(path.join(__dirname, "../renderer/pages/index.html"));

  console.log("Window created successfully");
  // Register IPC handlers after the window is created
  ipcMain.handle("get-video-qualities", handleGetVideoQualities);
  ipcMain.handle("get-playlist-qualities", handleGetPlaylistQualities);
  ipcMain.handle("download-video", (event, ...args) =>
    handleDownloadVideo(event, ...args, currentDownloadDir)
  );
  ipcMain.handle("download-playlist", (event, ...args) =>
    handleDownloadPlaylist(event, ...args, currentDownloadDir)
  );
  ipcMain.handle("cancel-download", handleCancelDownload);
  ipcMain.handle("cancel-quality-check", handleCancelQualityCheck);
  ipcMain.handle("select-directory", handleSelectDirectory);
  ipcMain.handle("get-download-directory", handleGetDownloadDirectory);
}

app.whenReady().then(createWindow);

// App lifecycle events
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
