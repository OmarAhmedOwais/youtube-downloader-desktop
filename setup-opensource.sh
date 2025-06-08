#!/bin/bash

# YouTube Downloader Desktop - Open Source Setup Script
# This script helps prepare the repository for open source release

echo "🚀 Setting up YouTube Downloader Desktop for Open Source Release..."
echo "👤 GitHub Profile: https://github.com/OmarAhmedOwais"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📋 Checklist for Open Source Release:"
echo ""

echo "✅ Files Created/Updated:"
echo "   - LICENSE (MIT License)"
echo "   - CONTRIBUTING.md (Contribution guidelines)"
echo "   - SECURITY.md (Security policy)"
echo "   - CHANGELOG.md (Version history)"
echo "   - docs/INSTALLATION.md (Setup guide)"
echo "   - .github/ISSUE_TEMPLATE/ (Issue templates)"
echo "   - .github/workflows/ (CI/CD workflows)"
echo "   - .gitignore (Comprehensive ignore patterns)"
echo ""

echo "✅ Repository Configuration:"
echo "   - GitHub URL: https://github.com/OmarAhmedOwais/youtube-downloader-desktop"
echo "   - License: MIT"
echo "   - Keywords: Updated with relevant tags"
echo "   - Author: YouTube Downloader Team"
echo ""

echo "📝 Next Steps:"
echo ""
echo "1. 🔄 Initialize Git Repository (if not done):"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'feat: initial open source release'"
echo ""
echo "2. 📤 Create GitHub Repository:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: youtube-downloader-desktop"
echo "   - Description: A modern desktop application for downloading YouTube videos and playlists"
echo "   - Make it public ✅"
echo "   - Don't initialize with README (we already have one)"
echo ""
echo "3. 🔗 Connect Local to Remote:"
echo "   git remote add origin https://github.com/OmarAhmedOwais/youtube-downloader-desktop.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. ⚙️ Configure GitHub Repository:"
echo "   - Enable Issues ✅"
echo "   - Enable Discussions ✅"
echo "   - Enable Wikis ✅"
echo "   - Add topics: youtube, downloader, electron, desktop, video, cross-platform"
echo ""
echo "5. 🏷️ Create First Release:"
echo "   - Go to Releases > Create a new release"
echo "   - Tag: v1.0.0"
echo "   - Title: YouTube Downloader Desktop v1.0.0"
echo "   - Description: Copy from CHANGELOG.md"
echo ""
echo "6. 📋 Repository Settings:"
echo "   - Default branch: main"
echo "   - Merge button: Enable squash merging"
echo "   - Delete head branches: Enable"
echo "   - Enable branch protection for main"
echo ""

# Check if yt-dlp is installed
echo "🔍 Checking Dependencies:"
if command -v yt-dlp &> /dev/null; then
    echo "   ✅ yt-dlp is installed ($(yt-dlp --version))"
else
    echo "   ❌ yt-dlp is not installed or not in PATH"
    echo "      Install: pip install yt-dlp"
fi

if command -v node &> /dev/null; then
    echo "   ✅ Node.js is installed ($(node --version))"
else
    echo "   ❌ Node.js is not installed"
fi

if command -v npm &> /dev/null; then
    echo "   ✅ npm is installed ($(npm --version))"
else
    echo "   ❌ npm is not installed"
fi

echo ""
echo "🎉 Repository is ready for open source release!"
echo "📚 Don't forget to:"
echo "   - Update the GitHub repository URL placeholders if any remain"
echo "   - Add repository topics/tags on GitHub"
echo "   - Set up branch protection rules"
echo "   - Configure GitHub Actions secrets if needed"
echo "   - Add collaborators if working with a team"
echo ""
echo "🌟 Star the repository to show your support!"
echo "🔗 Repository URL: https://github.com/OmarAhmedOwais/youtube-downloader-desktop"
