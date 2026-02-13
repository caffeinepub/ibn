# Specification

## Summary
**Goal:** Prepare Version 14 guidance and tooling for Google Play Store (TWA) submission, ensuring in-app build guide links and origin-derived URLs are correct.

**Planned changes:**
- Update all Play Store packaging/release documentation and in-app guidance to reference Version 14 (replacing Version 13) while keeping existing URLs, paths, and filenames unchanged unless inaccurate.
- Ensure the in-app “View Complete Build Guide” action in the Play Store publishing section opens the static `/play-store-build-guide.html` in production and that the guide renders origin-derived URLs for the manifest, assetlinks, and privacy policy at runtime.
- Harden `frontend/scripts/twa/bubblewrap-release.sh` so it reliably outputs a signed AAB (and APK when available), prints absolute output paths, and includes explicit next steps for updating `frontend/public/.well-known/assetlinks.json` placeholders and redeploying the frontend.

**User-visible outcome:** Users preparing the Play Store release can open the complete build guide from within the app, see correct origin-based URLs, and run an improved Bubblewrap release script to generate submission artifacts and follow clear next steps for asset links and redeployment.
