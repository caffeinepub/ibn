# Specification

## Summary
**Goal:** Prepare the frontend for a TWA release by adding required Play Store submission URLs, ensuring Digital Asset Links are deployable and documented, and making the build + checklist workflow reliable and consistent.

**Planned changes:**
- Add a publicly accessible Privacy Policy page (English placeholder content acceptable) and add a persistent “Privacy Policy” link in the app UI.
- Ensure `frontend/public/.well-known/assetlinks.json` is deployed at `/.well-known/assetlinks.json`, and document exactly which placeholders must be replaced (Android package name and SHA-256 fingerprint) before submission.
- Review and update `frontend/PLAY_STORE_BUILD.md` and the in-app “Publish to Google Play Store” section so URLs, paths, and asset filenames match the repo (manifest URL, assetlinks URL, icons, feature graphic path).
- Harden `frontend/scripts/twa/bubblewrap-release.sh` so it reliably outputs a signed APK (testing) and an AAB (Play Console), and prints actionable next steps including the computed SHA-256 fingerprint and the exact `assetlinks.json` placeholders to replace.
- Add a Play Store pre-submission checklist (in docs and/or the in-app publishing section) covering: manifest URL, assetlinks URL, privacy policy URL, and required Play Store visual assets/screenshots.

**User-visible outcome:** The app exposes stable URLs needed for Play Store submission (privacy policy, manifest, asset links), and the repo provides clear, consistent documentation and scripts to generate TWA release artifacts and complete a pre-submission checklist.
