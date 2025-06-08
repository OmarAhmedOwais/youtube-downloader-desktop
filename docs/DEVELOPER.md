# Developer Documentation

## Architecture Overview

This YouTube Downloader Desktop App follows Electron.js best practices with a modular architecture that separates concerns for better maintainability and security.

### Core Architecture

```
Main Process (Node.js) ←→ IPC ←→ Renderer Process (Chromium)
```

- **Main Process**: Handles system operations, file I/O, and yt-dlp interactions
- **Renderer Process**: Manages the UI and user interactions
- **IPC (Inter-Process Communication)**: Secure bridge between processes

### File Organization

#### `src/main/`

Contains the main Electron process files:

- `main.js`: Application entry point, window management, and IPC handler registration
- `handlers/downloadHandlers.js`: All download-related IPC handlers

#### `src/renderer/`

Contains the frontend code:

- `pages/index.html`: Main UI structure
- `css/styles.css`: Application styling
- `js/renderer.js`: Frontend logic and UI interactions

#### `src/preload/`

Security layer:

- `preload.js`: Exposes secure APIs to the renderer process

#### `src/config/`

Configuration management:

- `appConfig.js`: Centralized application settings

#### `src/utils/`

Utility functions:

- `fileUtils.js`: File system utilities and helpers

## Key Features Implementation

### Quality Selection

- Uses yt-dlp's `--list-formats` to fetch available qualities
- Parses output to extract video and audio formats
- Provides user-friendly quality names (4K, 1080p, etc.)

### Progress Tracking

- Monitors yt-dlp's stdout for progress information
- Extracts percentage and speed data using regex
- Updates UI in real-time via IPC messages

### Cancel Functionality

- Tracks active download processes
- Sends SIGTERM signal to gracefully stop downloads
- Cleans up process references

### Format Selection

- Supports multiple output formats (MP4, WebM, MKV, AVI)
- Uses yt-dlp's format selection syntax
- Handles audio-only downloads

### Directory Selection

- Uses Electron's `dialog.showOpenDialog()` for native OS directory picker
- Tracks current download directory in main process
- Updates yt-dlp output path dynamically
- Validates directory permissions before selection

## Security Considerations

### Context Isolation

- Renderer process cannot directly access Node.js APIs
- All system operations go through the preload script

### IPC Security

- All IPC handlers are explicitly registered
- Input validation on all IPC messages
- No eval() or dangerous operations exposed

### File System Safety

- Downloads restricted to designated directory
- Path validation to prevent directory traversal
- Automatic directory creation with proper permissions

## Development Guidelines

### Adding New Features

1. Add IPC handler in `src/main/handlers/`
2. Expose API in `src/preload/preload.js`
3. Implement UI logic in `src/renderer/js/renderer.js`
4. Update configuration if needed in `src/config/appConfig.js`

### Code Style

- Use ES6+ modules
- Implement proper error handling
- Add JSDoc comments for functions
- Follow consistent naming conventions

### Testing

- Test all IPC communication paths
- Verify error handling scenarios
- Check UI responsiveness
- Validate file operations

## Build Process

### Development

```bash
npm start       # Launch in development mode
npm run dev     # Launch with development flags
```

### Production Build

```bash
npm run build           # Build for current platform
npm run build:win       # Windows installer
npm run build:mac       # macOS DMG
npm run build:linux     # Linux AppImage
```

### Build Configuration

- Uses electron-builder for packaging
- Icons and assets automatically included
- NSIS installer for Windows
- Code signing can be added for distribution

## Troubleshooting

### Common Issues

1. **yt-dlp not found**: Ensure yt-dlp is installed and in PATH
2. **Permission errors**: Check download directory permissions
3. **Network issues**: Verify internet connection and proxy settings
4. **Format unavailable**: Some videos may not have all quality options

### Debug Mode

Run with additional logging:

```bash
npm run dev
```

### Error Handling

- All errors are caught and displayed to users
- Console logging available in development mode
- Process cleanup on application exit

## Future Enhancements

### Planned Features

- Download history and management
- Custom download locations
- Subtitles download
- Video conversion options
- Batch URL processing

### Technical Improvements

- Unit testing framework
- Automated builds/CI
- Code coverage reporting
- Performance monitoring

## Dependencies

### Runtime

- **Electron**: Desktop app framework
- **yt-dlp**: YouTube download engine (external)

### Build Tools

- **electron-builder**: App packaging and distribution
- **Node.js**: Runtime environment

### External Tools

- **yt-dlp**: Must be installed separately for video downloading functionality

## License & Distribution

The application is licensed under MIT License and can be freely distributed. For commercial use, ensure compliance with YouTube's Terms of Service and local copyright laws.
