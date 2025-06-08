# Installation & Setup Guide

This guide will help you get YouTube Downloader Desktop up and running on your system.

## 📋 Prerequisites

### Required Dependencies

1. **Node.js** (v16 or higher)

   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)

   - Verify installation: `npm --version`

3. **yt-dlp** (Required for downloading)

   - **Windows**: Download from [yt-dlp releases](https://github.com/yt-dlp/yt-dlp/releases) and add to PATH
   - **macOS**: `brew install yt-dlp`
   - **Linux**: `pip install yt-dlp` or use your package manager
   - Verify installation: `yt-dlp --version`

4. **Git** (for development)
   - Download from [git-scm.com](https://git-scm.com/)

## 🚀 Quick Start

### Option 1: Download Pre-built Release (Recommended)

1. Go to the [Releases page](https://github.com/OmarAhmedOwais/youtube-downloader-desktop/releases)
2. Download the appropriate installer for your OS:
   - **Windows**: `.exe` installer
   - **macOS**: `.dmg` file
   - **Linux**: `.AppImage`, `.deb`, or `.rpm`
3. Install and run the application

### Option 2: Build from Source

```bash
# Clone the repository
git clone https://github.com/OmarAhmedOwais/youtube-downloader-desktop.git
cd youtube-downloader-desktop

# Install dependencies
npm install

# Start the application
npm start
```

## 🔧 Development Setup

### 1. Clone and Install

```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/OmarAhmedOwais/youtube-downloader-desktop.git
cd youtube-downloader-desktop

# Install dependencies
npm install
```

### 2. Development Commands

```bash
# Start in development mode
npm start

# Start with dev tools open
npm run dev

# Build for your platform
npm run build

# Build for specific platforms
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux

# Clean build files
npm run clean
```

### 3. Project Structure

```
src/
├── main/           # Main Electron process
│   ├── main.js     # Application entry point
│   └── handlers/   # IPC handlers
├── renderer/       # Frontend (HTML/CSS/JS)
│   ├── pages/      # HTML pages
│   ├── css/        # Stylesheets
│   └── js/         # Frontend JavaScript
├── preload/        # Preload scripts (security)
├── config/         # Configuration files
└── utils/          # Utility functions
```

## 🐛 Troubleshooting

### Common Issues

#### 1. "yt-dlp not found"

- **Solution**: Install yt-dlp and ensure it's in your system PATH
- **Test**: Run `yt-dlp --version` in terminal

#### 2. "Permission denied" on Linux/macOS

- **Solution**: Make the AppImage executable: `chmod +x YouTube-Downloader.AppImage`

#### 3. "App won't start" on macOS

- **Solution**: Right-click the app and select "Open" to bypass Gatekeeper

#### 4. Downloads not working

- **Solution**: Check if the YouTube URL is valid and accessible
- **Check**: Ensure you have internet connection

#### 5. Build fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Getting Help

1. **Check Issues**: Search [existing issues](https://github.com/OmarAhmedOwais/youtube-downloader-desktop/issues)
2. **Create Issue**: If not found, create a new issue with details
3. **Discussions**: Use [GitHub Discussions](https://github.com/OmarAhmedOwais/youtube-downloader-desktop/discussions) for questions

## 🔒 Security Notes

- The app uses Electron's security best practices
- Context isolation is enabled
- Node integration is disabled in renderer
- All IPC communication is validated

## 📱 Platform-Specific Notes

### Windows

- Requires Windows 10 or later
- May trigger Windows Defender (false positive)
- Add exception if needed

### macOS

- Requires macOS 10.15 or later
- First-time users need to allow the app in Security settings
- Install yt-dlp via Homebrew for best experience

### Linux

- Tested on Ubuntu 20.04+, Debian 11+, Fedora 35+
- AppImage should work on most distributions
- Install yt-dlp via pip or package manager

## 🎯 Performance Tips

1. **Download Location**: Use fast storage (SSD) for download directory
2. **Network**: Stable internet connection improves download reliability
3. **System Resources**: Close unnecessary apps during large downloads
4. **Disk Space**: Ensure sufficient free space before downloading

## 🔄 Updates

- **Auto-updates**: Currently not implemented (planned)
- **Manual updates**: Download new version from releases page
- **Development**: Pull latest changes with `git pull`

---

Need more help? Check our [Contributing Guide](CONTRIBUTING.md) or open an [issue](https://github.com/OmarAhmedOwais/youtube-downloader-desktop/issues)!
