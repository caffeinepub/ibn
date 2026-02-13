#!/bin/bash

# TWA Release Build Helper Script
# This script automates the Bubblewrap workflow for creating a signed Android app bundle

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get absolute path to script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="$SCRIPT_DIR/out"
PROJECT_DIR="$OUTPUT_DIR/twa-project"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  TWA Release Build Helper${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v bubblewrap &> /dev/null; then
    echo -e "${RED}Error: Bubblewrap is not installed.${NC}"
    echo "Install it with: npm install -g @bubblewrap/cli"
    exit 1
fi

if ! command -v keytool &> /dev/null; then
    echo -e "${RED}Error: keytool is not installed.${NC}"
    echo "Install Java JDK 8 or higher."
    exit 1
fi

if [ -z "$ANDROID_HOME" ]; then
    echo -e "${YELLOW}Warning: ANDROID_HOME is not set.${NC}"
    echo "You may need to set it for the build to succeed."
    echo "Example: export ANDROID_HOME=/path/to/android/sdk"
    echo ""
fi

echo -e "${GREEN}✓ Prerequisites check complete${NC}"
echo ""

# Prompt for inputs
echo -e "${YELLOW}Please provide the following information:${NC}"
echo ""

read -p "Deployed app origin URL (e.g., https://your-app.icp0.io): " APP_ORIGIN
if [ -z "$APP_ORIGIN" ]; then
    echo -e "${RED}Error: App origin URL is required.${NC}"
    exit 1
fi

MANIFEST_URL="$APP_ORIGIN/manifest.webmanifest"
echo -e "Manifest URL: ${BLUE}$MANIFEST_URL${NC}"
echo ""

read -p "Android package name (e.g., com.yourcompany.ibn): " PACKAGE_NAME
if [ -z "$PACKAGE_NAME" ]; then
    echo -e "${RED}Error: Package name is required.${NC}"
    exit 1
fi
echo ""

# Keystore setup
echo -e "${YELLOW}Signing Key Setup${NC}"
read -p "Do you have an existing keystore? (y/n): " HAS_KEYSTORE

if [ "$HAS_KEYSTORE" = "y" ] || [ "$HAS_KEYSTORE" = "Y" ]; then
    read -p "Path to keystore file: " KEYSTORE_PATH
    read -p "Keystore alias: " KEY_ALIAS
    
    if [ ! -f "$KEYSTORE_PATH" ]; then
        echo -e "${RED}Error: Keystore file not found at $KEYSTORE_PATH${NC}"
        exit 1
    fi
    
    # Convert to absolute path
    KEYSTORE_PATH="$(cd "$(dirname "$KEYSTORE_PATH")" && pwd)/$(basename "$KEYSTORE_PATH")"
else
    echo -e "${YELLOW}Generating new keystore...${NC}"
    KEYSTORE_PATH="$OUTPUT_DIR/ibn-release-key.keystore"
    KEY_ALIAS="ibn-key"
    
    mkdir -p "$OUTPUT_DIR"
    
    echo "You will be prompted for keystore details."
    echo "IMPORTANT: Remember the password - you'll need it for all future updates!"
    echo ""
    
    keytool -genkey -v -keystore "$KEYSTORE_PATH" -alias "$KEY_ALIAS" -keyalg RSA -keysize 2048 -validity 10000
    
    echo ""
    echo -e "${GREEN}✓ Keystore generated at: $KEYSTORE_PATH${NC}"
    echo ""
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Initialize Bubblewrap project
echo -e "${YELLOW}Initializing Bubblewrap project...${NC}"
cd "$OUTPUT_DIR"

if [ -d "$PROJECT_DIR" ]; then
    echo -e "${YELLOW}Removing existing project directory...${NC}"
    rm -rf "$PROJECT_DIR"
fi

bubblewrap init --manifest="$MANIFEST_URL"

echo -e "${GREEN}✓ Project initialized${NC}"
echo ""

# Build signed release
echo -e "${YELLOW}Building signed release...${NC}"
cd "$PROJECT_DIR"

bubblewrap build --signingKeyPath="$KEYSTORE_PATH" --signingKeyAlias="$KEY_ALIAS"

echo -e "${GREEN}✓ Build complete${NC}"
echo ""

# Verify artifacts exist
AAB_FILE="$PROJECT_DIR/app-release-bundle.aab"
APK_FILE="$PROJECT_DIR/app-release-signed.apk"

if [ ! -f "$AAB_FILE" ]; then
    echo -e "${RED}Error: AAB file not found at expected location: $AAB_FILE${NC}"
    exit 1
fi

if [ ! -f "$APK_FILE" ]; then
    echo -e "${YELLOW}Warning: APK file not found at expected location: $APK_FILE${NC}"
fi

# Extract SHA-256 fingerprint
echo -e "${YELLOW}Extracting SHA-256 fingerprint...${NC}"
echo "You will be prompted for the keystore password."
echo ""

FINGERPRINT=$(keytool -list -v -keystore "$KEYSTORE_PATH" -alias "$KEY_ALIAS" 2>/dev/null | grep "SHA256:" | sed 's/.*SHA256: //')

if [ -z "$FINGERPRINT" ]; then
    echo -e "${RED}Error: Failed to extract SHA-256 fingerprint${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ SHA-256 Fingerprint extracted${NC}"
echo ""

# Print summary
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Build Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}Output Artifacts:${NC}"
echo -e "  AAB (Upload to Play Console): ${BLUE}$AAB_FILE${NC}"
if [ -f "$APK_FILE" ]; then
    echo -e "  APK (For testing):             ${BLUE}$APK_FILE${NC}"
fi
echo ""
echo -e "${GREEN}Signing Key:${NC}"
echo -e "  Keystore: ${BLUE}$KEYSTORE_PATH${NC}"
echo -e "  Alias:    ${BLUE}$KEY_ALIAS${NC}"
echo ""
echo -e "${GREEN}SHA-256 Fingerprint:${NC}"
echo -e "  ${BLUE}$FINGERPRINT${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Update Digital Asset Links:"
echo "   - Edit: frontend/public/.well-known/assetlinks.json"
echo "   - Replace: REPLACE_WITH_YOUR_PACKAGE_NAME → $PACKAGE_NAME"
echo "   - Replace: REPLACE_WITH_YOUR_SHA256_FINGERPRINT → $FINGERPRINT"
echo "   - See: frontend/public/.well-known/ASSETLINKS_SETUP.md"
echo ""
echo "2. Rebuild and deploy your frontend with the updated assetlinks.json"
echo ""
echo "3. Verify deployment:"
echo "   - URL: $APP_ORIGIN/.well-known/assetlinks.json"
echo ""
echo "4. Upload the AAB file to Google Play Console:"
echo "   - File: $AAB_FILE"
echo ""
echo "5. Complete the Play Store listing (see frontend/PLAY_STORE_BUILD.md)"
echo ""
echo -e "${GREEN}For detailed instructions, see: frontend/PLAY_STORE_BUILD.md${NC}"
echo ""
