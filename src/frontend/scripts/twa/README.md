# TWA (Trusted Web Activity) Build Helper - Version 14

This directory contains helper scripts and documentation for packaging your web app as a Trusted Web Activity (TWA) for the Google Play Store.

## Required Input URLs

Before starting, you'll need these URLs from your deployed app:

- **Manifest URL:** `{origin}/manifest.webmanifest`
- **Digital Asset Links URL:** `{origin}/.well-known/assetlinks.json`
- **Privacy Policy URL:** `{origin}/#privacy-policy`

Replace `{origin}` with your deployed app's origin (e.g., `https://your-app.com`).

## Environment Prerequisites

- **Node.js** (v14 or later)
- **Android SDK** (for Bubblewrap)
- **Java JDK** (for signing)

## Bubblewrap Helper Script

### What It Does

The `bubblewrap-release.sh` script automates the TWA build process for Version 14:

1. Prompts for your deployed app URL and Android package name
2. Initializes a Bubblewrap project (or reuses existing)
3. Generates or reuses a signing key
4. Builds both AAB (Android App Bundle) and APK files
5. Extracts the SHA-256 certificate fingerprint
6. Prints absolute paths to all generated artifacts
7. Provides clear next steps for Digital Asset Links configuration

### Usage

