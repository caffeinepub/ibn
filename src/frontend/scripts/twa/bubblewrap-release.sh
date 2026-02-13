#!/bin/bash

# Bubblewrap TWA Release Build Helper Script - Version 14
# This script automates the process of building a signed TWA using Bubblewrap

set -e  # Exit on error

echo "=========================================="
echo "Bubblewrap TWA Release Build Helper"
echo "Version 14"
echo "=========================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js v14 or later."
    exit 1
fi

if ! command -v npx &> /dev/null; then
    echo "Error: npx is not available. Please ensure Node.js is properly installed."
    exit 1
fi

if ! command -v keytool &> /dev/null; then
    echo "Error: keytool is not installed. Please install Java JDK."
    exit 1
fi

echo "✓ Prerequisites check passed"
echo ""

# Prompt for deployed origin URL
read -p "Enter your deployed app URL (e.g., https://your-app.com): " ORIGIN_URL
if [ -z "$ORIGIN_URL" ]; then
  echo "Error: Origin URL is required"
  exit 1
fi

# Ensure URL doesn't end with slash
ORIGIN_URL="${ORIGIN_URL%/}"

# Construct manifest URL
MANIFEST_URL="${ORIGIN_URL}/manifest.webmanifest"

echo ""
echo "Using manifest URL: $MANIFEST_URL"
echo ""

# Prompt for Android package name
read -p "Enter your Android package name (e.g., com.yourcompany.ibn): " PACKAGE_NAME
if [ -z "$PACKAGE_NAME" ]; then
  echo "Error: Package name is required"
  exit 1
fi

# Validate package name format
if ! [[ "$PACKAGE_NAME" =~ ^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$ ]]; then
    echo "Warning: Package name should follow Android conventions (e.g., com.yourcompany.ibn)"
    read -p "Continue anyway? (y/n): " CONTINUE
    if [ "$CONTINUE" != "y" ]; then
        exit 0
    fi
fi

echo ""
echo "Using package name: $PACKAGE_NAME"
echo ""

# Determine output directory (predictable location)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="${SCRIPT_DIR}/out"
PROJECT_DIR="${OUTPUT_DIR}/twa-project"

echo "Output directory: $OUTPUT_DIR"
echo ""

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Check if project already exists
if [ -d "$PROJECT_DIR" ]; then
  echo "Found existing Bubblewrap project at: $PROJECT_DIR"
  read -p "Do you want to rebuild using existing project? (y/n): " REBUILD
  if [ "$REBUILD" != "y" ]; then
    echo "Exiting. Remove $PROJECT_DIR to start fresh."
    exit 0
  fi
  cd "$PROJECT_DIR"
else
  echo "Initializing new Bubblewrap project..."
  cd "$OUTPUT_DIR"
  
  # Check if Bubblewrap is available
  if ! npx @bubblewrap/cli --version &> /dev/null; then
      echo "Error: Bubblewrap CLI is not available. Installing..."
      npm install -g @bubblewrap/cli || {
          echo "Error: Failed to install Bubblewrap CLI"
          exit 1
      }
  fi
  
  npx @bubblewrap/cli init --manifest "$MANIFEST_URL" || {
      echo "Error: Bubblewrap init failed. Please check:"
      echo "  1. Manifest URL is accessible: $MANIFEST_URL"
      echo "  2. Manifest contains valid JSON"
      echo "  3. Network connection is working"
      exit 1
  }
  
  # The init command creates a directory, find it
  if [ -d "twa-project" ]; then
    PROJECT_DIR="${OUTPUT_DIR}/twa-project"
  else
    # Find the created directory (Bubblewrap may use a different name)
    PROJECT_DIR=$(find "$OUTPUT_DIR" -maxdepth 1 -type d -name "*" ! -name "." ! -name ".." ! -name "out" | head -n 1)
    if [ -z "$PROJECT_DIR" ]; then
      echo "Error: Could not find Bubblewrap project directory"
      exit 1
    fi
    # Rename to standard name for consistency
    mv "$PROJECT_DIR" "${OUTPUT_DIR}/twa-project"
    PROJECT_DIR="${OUTPUT_DIR}/twa-project"
  fi
  
  cd "$PROJECT_DIR"
  echo "✓ Project initialized at: $PROJECT_DIR"
fi

echo ""
echo "Building release AAB and APK..."
echo ""

# Build the project
npx @bubblewrap/cli build || {
    echo "Error: Bubblewrap build failed. Please check:"
    echo "  1. Android SDK is installed and ANDROID_HOME is set"
    echo "  2. Java JDK is installed"
    echo "  3. Build tools are available"
    exit 1
}

echo ""
echo "=========================================="
echo "Build Complete!"
echo "=========================================="
echo ""

# Find generated artifacts with better error handling
AAB_FILE=$(find "$PROJECT_DIR" -name "*.aab" -type f 2>/dev/null | head -n 1)
APK_FILE=$(find "$PROJECT_DIR" -name "*.apk" -type f 2>/dev/null | head -n 1)

if [ -z "$AAB_FILE" ]; then
  echo "Error: Could not find generated AAB file"
  echo "Build may have failed. Check the output above for errors."
  exit 1
else
  AAB_PATH=$(realpath "$AAB_FILE")
  echo "✓ AAB (Android App Bundle): $AAB_PATH"
  echo "  → Upload this file to Google Play Console"
fi

echo ""

if [ -z "$APK_FILE" ]; then
  echo "Note: APK file not generated (AAB is preferred for Play Store)"
else
  APK_PATH=$(realpath "$APK_FILE")
  echo "✓ APK (Android Package): $APK_PATH"
  echo "  → Use this file for local testing"
fi

echo ""

# Find keystore and extract SHA-256 fingerprint
KEYSTORE_FILE=$(find "$PROJECT_DIR" -name "*.keystore" -o -name "*.jks" 2>/dev/null | head -n 1)

if [ -z "$KEYSTORE_FILE" ]; then
  echo "Warning: Could not find keystore file"
  echo ""
  echo "To extract SHA-256 fingerprint manually, run:"
  echo "  keytool -list -v -keystore YOUR_KEYSTORE_FILE -alias YOUR_KEY_ALIAS"
  FINGERPRINT=""
else
  echo "Extracting SHA-256 fingerprint from keystore..."
  KEYSTORE_PATH=$(realpath "$KEYSTORE_FILE")
  echo "Keystore: $KEYSTORE_PATH"
  echo ""
  
  # Try to extract fingerprint (may require password)
  FINGERPRINT=$(keytool -list -v -keystore "$KEYSTORE_FILE" -storepass android 2>/dev/null | grep "SHA256:" | head -n 1 | sed 's/.*SHA256: //' | tr -d ' ')
  
  if [ -z "$FINGERPRINT" ]; then
    echo "Could not automatically extract fingerprint (password may be required)"
    echo "Run this command manually:"
    echo "  keytool -list -v -keystore $KEYSTORE_PATH -alias android"
    echo ""
  else
    echo "✓ SHA-256 Fingerprint: $FINGERPRINT"
    echo ""
  fi
fi

echo "=========================================="
echo "Next Steps - IMPORTANT"
echo "=========================================="
echo ""
echo "1. Update Digital Asset Links file:"
echo "   File: frontend/public/.well-known/assetlinks.json"
echo ""
echo "   Replace these TWO placeholders with actual values:"
echo ""
echo "   Placeholder 1: REPLACE_WITH_YOUR_PACKAGE_NAME"
echo "   Replace with:  $PACKAGE_NAME"
echo ""
if [ -n "$FINGERPRINT" ]; then
  echo "   Placeholder 2: REPLACE_WITH_YOUR_SHA256_FINGERPRINT"
  echo "   Replace with:  $FINGERPRINT"
else
  echo "   Placeholder 2: REPLACE_WITH_YOUR_SHA256_FINGERPRINT"
  echo "   Replace with:  (Extract using keytool command above)"
fi
echo ""
echo "2. Redeploy your frontend so the updated assetlinks.json is accessible at:"
echo "   ${ORIGIN_URL}/.well-known/assetlinks.json"
echo ""
echo "3. Verify deployment using Google's Digital Asset Links tester:"
echo "   https://developers.google.com/digital-asset-links/tools/generator"
echo ""
echo "4. Upload the AAB file to Google Play Console:"
if [ -n "$AAB_PATH" ]; then
  echo "   $AAB_PATH"
fi
echo ""
echo "For detailed instructions, see:"
echo "  • frontend/PLAY_STORE_BUILD.md"
echo "  • frontend/scripts/twa/README.md"
echo "  • frontend/public/.well-known/ASSETLINKS_SETUP.md"
echo ""
echo "=========================================="
echo "Version 14 Build Complete"
echo "=========================================="
