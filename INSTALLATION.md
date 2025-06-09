# 📥 YouTube Downloader Desktop - Installation Guide

Welcome to YouTube Downloader Desktop! This guide will help you install and set up the application on your system.

## 🖥️ Windows Installation

### Method 1: Enhanced Installation Script (Recommended)

1. **Download the Application Package**

   - Get the complete package including:
     - `YouTube Downloader 1.0.0.exe`
     - `Enhanced-Install-YouTube-Downloader.bat`
   - File size: ~290 MB

2. **Run the Enhanced Installer**

   - Right-click `Enhanced-Install-YouTube-Downloader.bat`
   - Select **"Run as administrator"** (for best results)
   - The script will automatically:
     - ✅ Create desktop shortcut
     - ✅ Create Start Menu entry
     - ✅ Set up download directory
     - ✅ Test application startup
     - ✅ Verify all dependencies (no separate yt-dlp installation needed!)

3. **Installation Complete**
   - Desktop shortcut will be created automatically
   - Find the app in Start Menu under "YouTube Downloader"
   - Downloads folder will be created in your Documents

### Method 2: Manual Installation

1. **Download the Application**

   - Get `YouTube Downloader 1.0.0.exe` from the releases or build folder
   - File size: ~290 MB

2. **Choose Installation Location**

   ```
   Recommended locations:
   📁 C:\Program Files\YouTube Downloader\
   📁 C:\Users\[YourName]\Desktop\
   📁 D:\Applications\YouTube Downloader\
   ```

3. **First Launch**

   - Double-click `YouTube Downloader 1.0.0.exe`
   - **Security Warning**: Windows may show "Windows protected your PC"
     - Click **"More info"**
     - Click **"Run anyway"**
   - The app will create its download folder automatically

4. **Manual Desktop Shortcut Creation**
   - Right-click on the executable
   - Select "Create shortcut"
   - Move shortcut to Desktop

### Method 3: Using Basic Launcher Script

1. **Download Both Files**

   - `YouTube Downloader 1.0.0.exe`
   - `Launch-YouTube-Downloader-Fixed.bat`

2. **Run the Launcher**
   - Double-click the `.bat` file
   - Follow the guided startup process

### Windows System Requirements

| Component            | Requirement                                |
| -------------------- | ------------------------------------------ |
| **Operating System** | Windows 10 (1903+) or Windows 11           |
| **Architecture**     | 64-bit (x64)                               |
| **Memory (RAM)**     | 4 GB minimum, 8 GB recommended             |
| **Storage**          | 350 MB free space for app + download space |
| **Internet**         | Required for downloading videos            |
| **Graphics**         | DirectX 11 compatible                      |

## 🍎 macOS Installation

### Building from Source (Required)

Currently, pre-built macOS binaries are not available. You'll need to build from source:

1. **Prerequisites**

   ```bash
   # Install Node.js (18+)
   brew install node

   # Install Git
   brew install git
   ```

2. **Clone and Build**

   ```bash
   # Clone the repository
   git clone https://github.com/OmarAhmedOwais/youtube-downloader-desktop.git
   cd youtube-downloader-desktop

   # Install dependencies
   npm install

   # Build for macOS
   npm run build:mac
   ```

3. **Install the App**
   ```bash
   # The .dmg file will be in the build/ folder
   open build/YouTube\ Downloader*.dmg
   ```

### macOS System Requirements

| Component            | Requirement                                |
| -------------------- | ------------------------------------------ |
| **Operating System** | macOS 10.15 (Catalina) or later            |
| **Architecture**     | Intel x64 or Apple Silicon (M1/M2)         |
| **Memory (RAM)**     | 4 GB minimum, 8 GB recommended             |
| **Storage**          | 350 MB free space for app + download space |
| **Internet**         | Required for downloading videos            |

## 🐧 Linux Installation

### Building from Source

1. **Prerequisites**

   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nodejs npm git

   # Fedora/RHEL
   sudo dnf install nodejs npm git

   # Arch Linux
   sudo pacman -S nodejs npm git
   ```

2. **Clone and Build**

   ```bash
   # Clone the repository
   git clone https://github.com/OmarAhmedOwais/youtube-downloader-desktop.git
   cd youtube-downloader-desktop

   # Install dependencies
   npm install

   # Build for Linux
   npm run build:linux
   ```

3. **Install the AppImage**

   ```bash
   # Make the AppImage executable
   chmod +x build/YouTube\ Downloader*.AppImage

   # Run the application
   ./build/YouTube\ Downloader*.AppImage
   ```

### Linux System Requirements

| Component        | Requirement                                          |
| ---------------- | ---------------------------------------------------- |
| **Distribution** | Ubuntu 18.04+, Debian 10+, Fedora 32+, or equivalent |
| **Architecture** | 64-bit (x86_64)                                      |
| **Memory (RAM)** | 4 GB minimum, 8 GB recommended                       |
| **Storage**      | 350 MB free space for app + download space           |
| **Internet**     | Required for downloading videos                      |

## 📁 Download Locations

The app automatically creates a download folder in your Documents directory:

### Default Paths

- **Windows**: `C:\Users\[YourName]\Documents\YouTube Downloader\Downloads\`
- **macOS**: `/Users/[YourName]/Documents/YouTube Downloader/Downloads/`
- **Linux**: `/home/[YourName]/Documents/YouTube Downloader/Downloads/`

### Changing Download Location

1. Open the app
2. Click the **"Select Directory"** button
3. Choose your preferred download folder
4. The app will remember your choice

## 🛠️ Post-Installation Setup

### First Launch Checklist

1. **✅ App Starts Successfully**

   - No error messages appear
   - Main window opens properly

2. **✅ Download Folder Created**

   - Check that the Downloads folder exists
   - Verify you have write permissions

3. **✅ Internet Connection**
   - Test with a simple YouTube video
   - Ensure firewall allows the app

### Recommended Settings

1. **Create Desktop Shortcut** (Windows/Linux)
2. **Add to Applications Menu** (Linux)
3. **Set Download Quality Preferences**
4. **Choose Preferred Download Location**

## 🔧 Troubleshooting

### Windows Issues

#### "Windows protected your PC" Warning

```
Problem: Security warning prevents app from running
Solution:
1. Click "More info"
2. Click "Run anyway"
3. Or: Right-click file → Properties → Unblock → OK
```

#### Antivirus Blocking the App

```
Problem: Antivirus software quarantines the executable
Solution:
1. Add the executable to antivirus whitelist
2. Create an exclusion for the app folder
3. Temporarily disable real-time protection during first run
```

#### App Won't Start

```
Problem: Double-clicking does nothing
Solutions:
1. Run as Administrator (right-click → Run as administrator)
2. Check Windows version compatibility
3. Ensure .NET Framework is installed
4. Try compatibility mode (Windows 8/10)
```

### macOS Issues

#### "App is damaged and can't be opened"

```
Problem: Gatekeeper prevents unsigned app from running
Solution:
1. Right-click app → Open
2. Or: System Preferences → Security → Allow
3. Or: xattr -d com.apple.quarantine /path/to/app
```

### Linux Issues

#### AppImage Won't Execute

```
Problem: Permission denied when running AppImage
Solution:
1. chmod +x YouTube\ Downloader*.AppImage
2. Install FUSE: sudo apt install fuse
3. Check that /tmp has exec permissions
```

### General Issues

#### Downloads Keep Failing

```
Possible Causes & Solutions:
1. Internet connection: Check network stability
2. Disk space: Ensure sufficient storage available
3. Permissions: Verify write access to download folder
4. YouTube changes: App may need updates
```

#### App Crashes on Startup

```
Troubleshooting Steps:
1. Restart your computer
2. Check system requirements
3. Try running in compatibility mode
4. Clear any corrupted cache files
```

## 🛡️ Security & Privacy

### Application Security

- **Open Source**: All source code is publicly available
- **No Data Collection**: The app doesn't collect or transmit personal data
- **Local Processing**: All operations happen on your device
- **Unsigned Binary**: App may trigger security warnings (this is normal)

### Permissions Required

- **File System**: Read/write access to chosen download folder
- **Network**: Internet access for downloading videos
- **System**: Basic system information for proper operation

### Privacy Notes

- **No Tracking**: The app doesn't track your usage or downloads
- **No Analytics**: No usage data is sent to developers
- **Local Storage**: All downloads and settings remain on your device

## 📞 Support

### Getting Help

1. **Documentation**: Check the `docs/` folder for detailed guides
2. **Issues**: Report bugs on the GitHub repository
3. **Community**: Join discussions in the project's community channels

### Before Reporting Issues

1. Check this installation guide
2. Verify system requirements
3. Try the troubleshooting steps
4. Include system information in bug reports

---

## 🎉 You're Ready!

Once installed successfully, you can:

- ✅ Download individual YouTube videos
- ✅ Download entire playlists
- ✅ Choose video quality and format
- ✅ Monitor download progress
- ✅ Organize your downloads

**Happy downloading! 🚀**
