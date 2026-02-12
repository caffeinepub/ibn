# Specification

## Summary
**Goal:** Prepare the IBN PWA for Google Play Store packaging readiness via Trusted Web Activity (TWA) by adding Digital Asset Links support, improving the in-app publishing checklist, and ensuring required Play Store assets are correctly referenced and cached.

**Planned changes:**
- Add and serve a static Digital Asset Links file at `/.well-known/assetlinks.json` with placeholder values/instructions for `package_name` and `sha256_cert_fingerprints`.
- Update the in-app “Publish to Google Play Store” section with a concrete Bubblewrap/PWABuilder checklist, explicitly referencing `/.well-known/assetlinks.json` and `{window.location.origin}/manifest.webmanifest`.
- Ensure Play Store listing assets exist under `frontend/public/assets/generated/`, keep the manifest referencing the 192x192 and 512x512 icons, and reference the feature graphic path in the guide.
- Update `frontend/public/sw.js` precache list to include `/assets/generated/ibn-feature-graphic.dim_1024x500.png` while keeping the existing caching behavior and offline fallback.

**User-visible outcome:** Users can follow an updated in-app Play Store publishing checklist, and the app serves the required TWA verification file and Play Store assets (including offline availability of the feature graphic) needed for Bubblewrap/PWABuilder packaging.
