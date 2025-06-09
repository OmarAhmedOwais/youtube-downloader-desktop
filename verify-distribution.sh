#!/bin/bash

# YouTube Downloader Desktop - Distribution Verification Script
# This script verifies that the distribution package is ready

echo "================================================"
echo "YouTube Downloader Desktop - Distribution Check"
echo "================================================"
echo

# Check if we're in the right directory
if [ ! -f "YouTube Downloader 1.0.0.exe" ]; then
    echo "❌ Error: YouTube Downloader 1.0.0.exe not found"
    echo "Please run this script from the build directory"
    exit 1
fi

echo "📁 Checking distribution files..."

# Check main executable
if [ -f "YouTube Downloader 1.0.0.exe" ]; then
    SIZE=$(stat -c%s "YouTube Downloader 1.0.0.exe" 2>/dev/null || stat -f%z "YouTube Downloader 1.0.0.exe" 2>/dev/null)
    SIZE_MB=$((SIZE / 1024 / 1024))
    echo "✅ Main executable: YouTube Downloader 1.0.0.exe (${SIZE_MB}MB)"
else
    echo "❌ Missing: YouTube Downloader 1.0.0.exe"
fi

# Check launcher script
if [ -f "Launch-YouTube-Downloader-Fixed.bat" ]; then
    echo "✅ Launcher script: Launch-YouTube-Downloader-Fixed.bat"
else
    echo "⚠️  Optional: Launch-YouTube-Downloader-Fixed.bat (missing)"
fi

# Check quick start guide
if [ -f "README-QuickStart.txt" ]; then
    echo "✅ Quick start guide: README-QuickStart.txt"
else
    echo "⚠️  Optional: README-QuickStart.txt (missing)"
fi

echo
echo "📋 Documentation files..."

# Check main documentation files
cd ..
if [ -f "INSTALLATION.md" ]; then
    echo "✅ Installation guide: INSTALLATION.md"
else
    echo "❌ Missing: INSTALLATION.md"
fi

if [ -f "README.md" ]; then
    echo "✅ Project README: README.md"
else
    echo "❌ Missing: README.md"
fi

if [ -f "LICENSE" ]; then
    echo "✅ License file: LICENSE"
else
    echo "❌ Missing: LICENSE"
fi

if [ -f "CHANGELOG.md" ]; then
    echo "✅ Changelog: CHANGELOG.md"
else
    echo "⚠️  Optional: CHANGELOG.md (missing)"
fi

echo
echo "🔧 System compatibility check..."

# Check if this is Windows
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
    echo "✅ Running on Windows - compatible with executable"
else
    echo "⚠️  Not running on Windows - executable may not run directly"
fi

echo
echo "📊 Distribution Package Status:"
echo "==============================="

# Count required vs optional files
REQUIRED_COUNT=0
OPTIONAL_COUNT=0

cd build 2>/dev/null || true

# Required files
[ -f "YouTube Downloader 1.0.0.exe" ] && ((REQUIRED_COUNT++))

# Optional files  
[ -f "Launch-YouTube-Downloader-Fixed.bat" ] && ((OPTIONAL_COUNT++))
[ -f "README-QuickStart.txt" ] && ((OPTIONAL_COUNT++))

cd .. 2>/dev/null || true

[ -f "INSTALLATION.md" ] && ((REQUIRED_COUNT++))
[ -f "README.md" ] && ((REQUIRED_COUNT++))
[ -f "LICENSE" ] && ((REQUIRED_COUNT++))

# Optional documentation
[ -f "CHANGELOG.md" ] && ((OPTIONAL_COUNT++))

echo "Required files: ${REQUIRED_COUNT}/4"
echo "Optional files: ${OPTIONAL_COUNT}/4"

if [ $REQUIRED_COUNT -eq 4 ]; then
    echo
    echo "🎉 DISTRIBUTION STATUS: READY FOR RELEASE"
    echo "✅ All required files present"
    echo "📦 Package is ready for distribution"
    echo
    echo "🚀 Next steps:"
    echo "1. Create distribution folder"
    echo "2. Copy executable and documentation"
    echo "3. Create zip/archive for distribution"
    echo "4. Test on clean Windows system"
else
    echo
    echo "❌ DISTRIBUTION STATUS: NOT READY"
    echo "Missing required files - please check above"
fi

echo
echo "================================================"
