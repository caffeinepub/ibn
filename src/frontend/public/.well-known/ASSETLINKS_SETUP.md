# Digital Asset Links Setup Guide

## What are Digital Asset Links?

Digital Asset Links are a way to verify that you own both your website domain and your Android app. This is required for Trusted Web Activities (TWAs) to work properly on Android.

When a user opens your TWA app, Android checks this file to confirm that the app is authorized to display content from your domain without showing browser UI.

## Step-by-Step Setup

### 1. Generate Your Signing Key

If you don't already have a signing key, generate one using the Java keytool:

