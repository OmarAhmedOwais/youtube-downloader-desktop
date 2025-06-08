# Contributing to YouTube Downloader Desktop

Thank you for your interest in contributing to YouTube Downloader Desktop! We welcome contributions from the community.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- yt-dlp installed on your system

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/OmarAhmedOwais/youtube-downloader-desktop.git
   cd youtube-downloader-desktop
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## 🔧 Development

### Project Structure

```
src/
├── main/           # Main Electron process
├── renderer/       # Frontend (HTML/CSS/JS)
├── preload/        # Preload scripts for security
├── config/         # Configuration files
└── utils/          # Utility functions
```

### Code Style

- Use ES6+ features
- Follow existing code patterns
- Add comments for complex logic
- Use meaningful variable names

### Testing

Run the application locally:

```bash
npm start
```

## 🐛 Bug Reports

When filing bug reports, please include:

1. **Description**: Clear description of the issue
2. **Steps to reproduce**: Detailed steps to reproduce the bug
3. **Expected behavior**: What you expected to happen
4. **Actual behavior**: What actually happened
5. **Environment**: OS, Node.js version, Electron version
6. **Screenshots**: If applicable

## 💡 Feature Requests

Feature requests are welcome! Please:

1. Check if a similar request already exists
2. Describe the feature clearly
3. Explain the use case
4. Consider the implementation complexity

## 📝 Pull Requests

### Before Submitting

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with descriptive messages
6. Push to your fork
7. Submit a pull request

### Pull Request Guidelines

- **Title**: Clear, descriptive title
- **Description**: Explain what changes were made and why
- **Testing**: Describe how you tested the changes
- **Screenshots**: Include before/after screenshots for UI changes

## 🔒 Security

If you discover a security vulnerability, please send an email to the maintainers instead of opening a public issue.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

Be respectful, inclusive, and constructive in all interactions. We're here to build something great together!

## 📞 Getting Help

- Open an issue for bugs or feature requests
- Join discussions in the repository
- Check the documentation in `/docs`

Thank you for contributing! 🎉
