# TWA Build Workflow Helper

This directory contains helper scripts and documentation for building a Trusted Web Activity (TWA) package for Google Play Store submission.

## Quick Reference

### Required Inputs

Before starting, gather these exact values from your deployed application:

1. **App Origin URL**: Your deployed app's base URL
   - Example: `https://your-app.icp0.io`

2. **Manifest URL**: `{origin}/manifest.webmanifest`
   - Example: `https://your-app.icp0.io/manifest.webmanifest`
   - Verify it's accessible in your browser

3. **Digital Asset Links URL**: `{origin}/.well-known/assetlinks.json`
   - Example: `https://your-app.icp0.io/.well-known/assetlinks.json`
   - File location: `frontend/public/.well-known/assetlinks.json`

4. **Privacy Policy URL**: `{origin}/#privacy-policy`
   - Example: `https://your-app.icp0.io/#privacy-policy`
   - Required by Google Play Store

### Environment Prerequisites

#### For Bubblewrap (CLI)

- **Node.js**: Version 14 or higher
- **Java JDK**: Version 8 or higher
- **Android SDK**: Required for building APK/AAB
  - Install via [Android Studio](https://developer.android.com/studio) or standalone SDK tools
  - Set `ANDROID_HOME` environment variable

#### For PWABuilder (Web UI)

- **Web Browser**: Any modern browser
- No local setup required

---

## Using the Bubblewrap Helper Script

### What the Script Does

The `bubblewrap-release.sh` script automates the entire TWA build workflow:

1. **Checks prerequisites**: Verifies that Bubblewrap, keytool, and optionally ANDROID_HOME are available
2. **Prompts for inputs**: Asks for your app origin URL and Android package name
3. **Handles signing keys**: Either generates a new keystore or uses an existing one
4. **Initializes TWA project**: Runs `bubblewrap init` with your manifest URL in a predictable output directory
5. **Builds release artifacts**: Generates both AAB (for Play Store) and APK (for testing) files
6. **Extracts SHA-256 fingerprint**: Automatically extracts the fingerprint from your signing key
7. **Prints clear next steps**: Shows exact file paths and the placeholders to replace in `assetlinks.json`

### Step 1: Make the Script Executable

