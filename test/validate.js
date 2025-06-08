// Simple validation test for YouTube Downloader Desktop
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync, existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

console.log("🧪 Running YouTube Downloader Desktop validation tests...\n");

// Test 1: Check required files exist
console.log("📁 Checking required files...");
const requiredFiles = [
  "package.json",
  "README.md",
  "LICENSE",
  "src/main/main.js",
  "src/renderer/pages/index.html",
  "src/preload/preload.js",
  "src/renderer/js/renderer.js",
  "src/main/handlers/downloadHandlers.js",
];

let filesOk = true;
for (const file of requiredFiles) {
  const filePath = join(projectRoot, file);
  if (existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - Missing!`);
    filesOk = false;
  }
}

// Test 2: Validate package.json
console.log("\n📦 Validating package.json...");
try {
  const packageJson = JSON.parse(
    readFileSync(join(projectRoot, "package.json"), "utf8")
  );

  const requiredFields = [
    "name",
    "version",
    "description",
    "main",
    "scripts",
    "license",
  ];
  let packageOk = true;

  for (const field of requiredFields) {
    if (packageJson[field]) {
      console.log(
        `✅ ${field}: ${
          typeof packageJson[field] === "object"
            ? "present"
            : packageJson[field]
        }`
      );
    } else {
      console.log(`❌ ${field} - Missing!`);
      packageOk = false;
    }
  }

  // Check if electron is in dependencies
  if (packageJson.devDependencies && packageJson.devDependencies.electron) {
    console.log(`✅ electron: ${packageJson.devDependencies.electron}`);
  } else {
    console.log("❌ electron dependency - Missing!");
    packageOk = false;
  }

  if (!packageOk) filesOk = false;
} catch (error) {
  console.log("❌ package.json parse error:", error.message);
  filesOk = false;
}

// Test 3: Check main entry point
console.log("\n🚀 Checking main entry point...");
try {
  const mainFile = readFileSync(join(projectRoot, "src/main/main.js"), "utf8");
  if (mainFile.includes("electron")) {
    console.log("✅ Main file imports electron");
  } else {
    console.log("❌ Main file missing electron import");
    filesOk = false;
  }

  if (mainFile.includes("BrowserWindow")) {
    console.log("✅ Main file creates BrowserWindow");
  } else {
    console.log("❌ Main file missing BrowserWindow");
    filesOk = false;
  }
} catch (error) {
  console.log("❌ Main file read error:", error.message);
  filesOk = false;
}

// Test 4: Check HTML file
console.log("\n🌐 Checking HTML structure...");
try {
  const htmlFile = readFileSync(
    join(projectRoot, "src/renderer/pages/index.html"),
    "utf8"
  );
  if (htmlFile.includes("<html") && htmlFile.includes("</html>")) {
    console.log("✅ Valid HTML structure");
  } else {
    console.log("❌ Invalid HTML structure");
    filesOk = false;
  }

  if (htmlFile.includes("YouTube") || htmlFile.includes("Download")) {
    console.log("✅ HTML contains relevant content");
  } else {
    console.log("⚠️  HTML might be missing app-specific content");
  }
} catch (error) {
  console.log("❌ HTML file read error:", error.message);
  filesOk = false;
}

// Test Results
console.log("\n📊 Test Results:");
if (filesOk) {
  console.log("🎉 All validation tests passed!");
  process.exit(0);
} else {
  console.log("💥 Some validation tests failed!");
  process.exit(1);
}
