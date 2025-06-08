# YouTube Downloader Desktop App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/OmarAhmedOwais/youtube-downloader-desktop.svg)](https://github.com/OmarAhmedOwais/youtube-downloader-desktop/releases)
[![GitHub issues](https://img.shields.io/github/issues/OmarAhmedOwais/youtube-downloader-desktop.svg)](https://github.com/OmarAhmedOwais/youtube-downloader-desktop/issues)
[![GitHub stars](https://img.shields.io/github/stars/OmarAhmedOwais/youtube-downloader-desktop.svg)](https://github.com/OmarAhmedOwais/youtube-downloader-desktop/stargazers)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/OmarAhmedOwais/youtube-downloader-desktop/releases)

A modern, professional desktop application for downloading YouTube videos and playlists with advanced features like quality selection, format options, progress tracking, and cancel functionality.

## 🚀 Features

### ✨ Modern UI & UX

- **Clean, Responsive Design**: Modern interface with intuitive layout
- **Real-time Progress**: Live progress bars with percentage display
- **Status Indicators**: Color-coded messages and status updates
- **Enhanced Visual Elements**: Emoji-enhanced buttons and sections
- **Professional Styling**: External CSS with consistent theming

### 🎥 Video Downloads

- **Single Video Support**: Download individual YouTube videos
- **Quality Selection**: Choose from 4K, 1080p, 720p, 480p, 360p, 240p, 144p
- **Format Options**: MP4, WebM, MKV, AVI, or automatic format selection
- **Audio-Only Downloads**: Extract audio in various quality levels

### 📋 Playlist Downloads

- **Full Playlist Support**: Download entire YouTube playlists
- **Batch Processing**: Efficient handling of multiple videos
- **Same Quality Options**: All video features available for playlists
- **Progress Tracking**: Individual and overall progress monitoring

### 🎛️ Advanced Controls

- **Cancel Functionality**: Stop downloads at any time
- **Format Selection**: Choose specific output formats
- **Quality Control**: Fine-tune video/audio quality
- **Error Recovery**: Robust error handling and user feedback

### 📁 Download Location Selection

- **Custom Directory**: Choose any folder on your system for downloads
- **Directory Display**: Shows current download location
- **Persistent Selection**: Remembers your choice during the session
- **Default Location**: Falls back to built-in downloads folder

### 🏗️ Technical Architecture

- **Modular Structure**: Organized codebase with separated concerns
- **Secure IPC**: Safe communication between main and renderer processes
- **Configuration Management**: Centralized app settings
- **Utility Functions**: Reusable code components
- **Build System**: Ready for distribution packaging

## 📁 Project Structure

```
youtube-downloader-desktop/
├── src/
│   ├── main/                    # Main Electron process
│   │   ├── main.js             # Application entry point
│   │   └── handlers/           # IPC handlers
│   │       └── downloadHandlers.js
│   ├── renderer/               # Frontend (UI)
│   │   ├── pages/
│   │   │   └── index.html      # Main UI
│   │   ├── css/
│   │   │   └── styles.css      # Application styles
│   │   └── js/
│   │       └── renderer.js     # Frontend logic
│   ├── preload/                # Security bridge
│   │   └── preload.js          # API exposure
│   ├── config/                 # Configuration
│   │   └── appConfig.js        # App settings
│   └── utils/                  # Utilities
│       └── fileUtils.js        # Helper functions
├── assets/                     # Static assets
│   ├── icons/                  # Application icons
│   └── images/                 # UI images
├── downloads/                  # Download destination
├── docs/                       # Documentation
└── build configuration files
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- yt-dlp (automatically handled)

### Installation Steps

1. **Clone or Download the Project**

   ```bash
   git clone <repository-url>
   cd youtube-downloader-desktop
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Install yt-dlp** (if not already installed)

   ```bash
   # Windows (using pip)
   pip install yt-dlp

   # Or download from GitHub releases
   # https://github.com/yt-dlp/yt-dlp/releases
   ```

4. **Run the Application**
   ```bash
   npm start
   ```

## 🎯 How to Use

### Single Video Download

1. Launch the application
2. Enter a YouTube video URL in the input field
3. Click "🔍 Get Available Qualities" to fetch available options
4. Select your preferred quality from the dropdown
5. Choose output format (MP4, WebM, MKV, AVI, or Auto)
6. Click "⬇️ Download Video" to start the download
7. Monitor real-time progress in the progress bar
8. Use "❌ Cancel" to stop the download if needed

### Playlist Download

1. Enter a YouTube playlist URL
2. Click "🔍 Get Playlist Qualities"
3. Select quality and format options
4. Click "⬇️ Download Playlist"
5. Watch as each video downloads with progress tracking

### Audio-Only Downloads

1. Enter any YouTube URL (video or playlist)
2. Get available qualities
3. Select an audio quality option (usually marked with bitrates)
4. Choose format and download

## 📊 Status Indicators

- 🔵 **Info**: General information and progress updates
- 🟢 **Success**: Successful operations and completions
- 🔴 **Error**: Error messages and failed operations
- 🟡 **Warning**: Warnings and cancelled operations

## 🔧 Build & Distribution

### Development

```bash
npm run dev    # Run in development mode
```

### Building for Distribution

```bash
npm run build           # Build for current platform
npm run build:win       # Build for Windows
npm run build:mac       # Build for macOS
npm run build:linux     # Build for Linux
```

### Clean Build Files

```bash
npm run clean
```

## 📦 Dependencies

### Runtime Dependencies

- **Electron**: ^36.4.0 - Desktop application framework
- **yt-dlp**: External dependency for YouTube downloads

### Development Dependencies

- **electron-builder**: ^24.0.0 - Application packaging and distribution

## 🔒 Security Features

- **Context Isolation**: Renderer process is isolated from Node.js
- **No Node Integration**: Frontend cannot directly access Node.js APIs
- **Preload Script**: Secure API bridge between main and renderer processes
- **IPC Handlers**: All communication goes through registered handlers

## 🚀 Features Implemented

✅ **Quality Selection**: Standard resolutions from 4K to 144p  
✅ **Format Options**: MP4, WebM, MKV, AVI support  
✅ **Audio Downloads**: Various audio formats and bitrates  
✅ **Progress Tracking**: Real-time progress bars and percentages  
✅ **Cancel Functionality**: Stop downloads at any time  
✅ **Error Handling**: Comprehensive error messages  
✅ **Modern UI**: Clean, responsive design with status indicators  
✅ **Modular Architecture**: Organized, maintainable codebase  
✅ **Build System**: Ready for distribution packaging  
✅ **Security**: Proper Electron security practices

## 🎨 UI Features

- **Modern Design**: Professional, clean interface
- **Responsive Layout**: Works at different window sizes
- **Progress Visualization**: Real-time progress bars
- **Status Messages**: Color-coded feedback system
- **Intuitive Controls**: Easy-to-use buttons and dropdowns
- **Loading States**: Visual feedback during operations

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

- 🐛 **Report Bugs**: Open an issue if you find a bug
- 💡 **Suggest Features**: Share ideas for new features
- 🔧 **Submit PRs**: Contribute code improvements
- 📚 **Improve Docs**: Help enhance documentation
- ⭐ **Star the Repo**: Show your support!

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting contributions.

### Quick Start for Contributors

```bash
# Clone the repository
git clone https://github.com/OmarAhmedOwais/youtube-downloader-desktop.git
cd youtube-downloader-desktop

# Install dependencies
npm install

# Start development
npm start
```

## 🔒 Security

Security is important to us. If you discover a security vulnerability, please follow our [Security Policy](SECURITY.md) for responsible disclosure.

## 📞 Support & Community

- 🐛 **Bug Reports**: [Create an Issue](../../issues)
- 💡 **Feature Requests**: [Open a Discussion](../../discussions)
- 📖 **Documentation**: Check the `/docs` folder
- 🤔 **Questions**: Use GitHub Discussions

## 📊 Project Status

- ✅ **Active Development**: Regular updates and improvements
- 🧪 **Stable**: Ready for production use
- 🌍 **Cross-Platform**: Windows, macOS, and Linux support
- 🔒 **Secure**: Following Electron security best practices

## 🙏 Acknowledgments

- **yt-dlp**: The powerful download engine behind this app
- **Electron**: Cross-platform desktop app framework
- **Contributors**: Everyone who helps improve this project
- **Community**: Users who provide feedback and suggestions

## 📚 Related Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [yt-dlp Documentation](https://github.com/yt-dlp/yt-dlp)
- [YouTube Terms of Service](https://www.youtube.com/t/terms)

---

⭐ **If you find this project useful, please consider giving it a star!** ⭐

**YouTube Downloader Desktop App** - A professional, open-source solution for downloading YouTube content with modern UI and advanced features.
