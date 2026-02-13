# Google Play Store Build & Submission Guide

This guide walks you through packaging your web app as a Trusted Web Activity (TWA) and submitting it to the Google Play Store.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Required Inputs](#required-inputs)
3. [Build Process](#build-process)
4. [Digital Asset Links Configuration](#digital-asset-links-configuration)
5. [Pre-Submission Checklist](#pre-submission-checklist)
6. [Play Console Submission](#play-console-submission)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Google Play Console Account

- Sign up at [play.google.com/console](https://play.google.com/console)
- One-time registration fee: $25 USD
- Account approval can take 24-48 hours

### Development Environment

Choose one of these packaging tools:

#### Option A: Bubblewrap (CLI)
- **Node.js**: Version 14 or higher
- **Java JDK**: Version 8 or higher
- **Android SDK**: Required for building APK/AAB
  - Install via [Android Studio](https://developer.android.com/studio) or standalone SDK tools
  - Set `ANDROID_HOME` environment variable

#### Option B: PWABuilder (Web UI)
- **Web Browser**: Any modern browser
- No local setup required

### Required Assets

All visual assets are already prepared in the repository:

- **App Icons**:
  - `frontend/public/assets/generated/ibn-app-icon.dim_192x192.png` (192x192)
  - `frontend/public/assets/generated/ibn-app-icon.dim_512x512.png` (512x512)

- **Feature Graphic**:
  - `frontend/public/assets/generated/ibn-feature-graphic.dim_1024x500.png` (1024x500)

- **Screenshots** (Android phone format):
  - `frontend/public/assets/generated/playstore-screenshot-1.dim_1080x1920.png` (1080x1920)
  - `frontend/public/assets/generated/playstore-screenshot-2.dim_1080x1920.png` (1080x1920)

---

## Required Inputs

Before starting, gather these exact values from your deployed application:

### 1. App Origin URL
Your deployed app's base URL.
- **Example**: `https://your-app.icp0.io`

### 2. Manifest URL
`{origin}/manifest.webmanifest`
- **Example**: `https://your-app.icp0.io/manifest.webmanifest`
- **Verify**: Open this URL in your browser to confirm it's accessible

### 3. Digital Asset Links URL
`{origin}/.well-known/assetlinks.json`
- **Example**: `https://your-app.icp0.io/.well-known/assetlinks.json`
- **File location**: `frontend/public/.well-known/assetlinks.json`

### 4. Privacy Policy URL
`{origin}/#privacy-policy`
- **Example**: `https://your-app.icp0.io/#privacy-policy`
- **Required by Google** for all Play Store apps

---

## Build Process

### Option A: Using Bubblewrap (Recommended for Developers)

#### Automated Script (Easiest)

We provide a helper script that automates the entire Bubblewrap workflow:

