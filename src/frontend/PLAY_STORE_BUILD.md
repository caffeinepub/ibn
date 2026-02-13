# Google Play Store Build Guide - Version 14

Complete guide for packaging and publishing your IBN app (Version 14) to the Google Play Store as a Trusted Web Activity (TWA).

## Important Notice

**Publishing to the Play Store is not automatic.** This guide walks you through the manual process of packaging your web app as a TWA and submitting it to Google Play Console.

## Required Input URLs

You will need these URLs during the packaging process:

- **Manifest URL:** `{origin}/manifest.webmanifest`
- **Digital Asset Links URL:** `{origin}/.well-known/assetlinks.json`
- **Privacy Policy URL:** `{origin}/#privacy-policy`

Replace `{origin}` with your deployed app's origin (e.g., `https://your-app.com`).

## Prerequisites

### 1. Google Play Console Account

Sign up at [play.google.com/console](https://play.google.com/console) (one-time $25 registration fee).

### 2. Required Visual Assets

All assets are already prepared in your repository:

- **App icons (192x192 and 512x512):**
  - `frontend/public/assets/generated/ibn-app-icon.dim_192x192.png`
  - `frontend/public/assets/generated/ibn-app-icon.dim_512x512.png`
- **Feature graphic (1024x500):**
  - `frontend/public/assets/generated/ibn-feature-graphic.dim_1024x500.png`
- **Screenshots (1080x1920):**
  - `frontend/public/assets/generated/playstore-screenshot-1.dim_1080x1920.png`
  - `frontend/public/assets/generated/playstore-screenshot-2.dim_1080x1920.png`

### 3. Privacy Policy

Available at: `{origin}/#privacy-policy`

## Packaging Options

Choose one of these tools to package your web app as a TWA:

### Option A: Bubblewrap (Recommended for developers)

Google's official CLI tool. Requires Node.js and Android SDK.

#### Quick Start Using Helper Script

We provide a helper script that automates the Bubblewrap workflow for Version 14:

