import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Smartphone, Key, FileCheck, Upload, Info, CheckCircle2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PlayStorePublishingSection() {
  const origin = window.location.origin;
  const manifestUrl = `${origin}/manifest.webmanifest`;
  const assetLinksUrl = `${origin}/.well-known/assetlinks.json`;
  const privacyPolicyUrl = `${origin}/#privacy-policy`;
  const featureGraphicPath = 'frontend/public/assets/generated/ibn-feature-graphic.dim_1024x500.png';
  const screenshot1Path = 'frontend/public/assets/generated/playstore-screenshot-1.dim_1080x1920.png';
  const screenshot2Path = 'frontend/public/assets/generated/playstore-screenshot-2.dim_1080x1920.png';
  const appIcon192Path = 'frontend/public/assets/generated/ibn-app-icon.dim_192x192.png';
  const appIcon512Path = 'frontend/public/assets/generated/ibn-app-icon.dim_512x512.png';

  return (
    <section id="play-store-publishing" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold mb-4">
              Version 14
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Publish to Google Play Store
            </h2>
            <p className="text-lg text-muted-foreground">
              Turn this web app into an Android app and publish it on the Google Play Store
            </p>
          </div>

          <Alert className="mb-8">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Publishing to the Play Store is not automatic. You'll need to package the app yourself and submit it through Google Play Console. This guide walks you through the process.
            </AlertDescription>
          </Alert>

          <div className="mb-8">
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="/play-store-build-guide.html" target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4 mr-2" />
                View Complete Build Guide
              </a>
            </Button>
          </div>

          {/* Pre-Submission Checklist */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Pre-Submission Checklist</CardTitle>
              <CardDescription>Verify these items before uploading to Play Console</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">Manifest URL (accessible):</p>
                  <code className="block bg-muted p-2 rounded text-xs overflow-x-auto mt-1 break-all">
                    {manifestUrl}
                  </code>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">Digital Asset Links URL (accessible):</p>
                  <code className="block bg-muted p-2 rounded text-xs overflow-x-auto mt-1 break-all">
                    {assetLinksUrl}
                  </code>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">Privacy Policy URL (accessible):</p>
                  <code className="block bg-muted p-2 rounded text-xs overflow-x-auto mt-1 break-all">
                    {privacyPolicyUrl}
                  </code>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">Visual assets prepared:</p>
                  <ul className="list-disc list-inside mt-1 text-muted-foreground space-y-1">
                    <li>App icons: {appIcon192Path}, {appIcon512Path}</li>
                    <li>Feature graphic: {featureGraphicPath}</li>
                    <li>Screenshots: {screenshot1Path}, {screenshot2Path}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Package Your App */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
                <CardTitle>Package Your App as a TWA</CardTitle>
              </div>
              <CardDescription>Choose a packaging tool to create your Android app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Option A: Bubblewrap (Recommended)</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use our helper script for automated TWA packaging:
                </p>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-xs block">cd frontend/scripts/twa</code>
                  <code className="text-xs block">./bubblewrap-release.sh</code>
                </div>
                <p className="text-xs text-muted-foreground">
                  Script location: <code>frontend/scripts/twa/bubblewrap-release.sh</code>
                </p>
                <p className="text-xs text-muted-foreground">
                  The script will prompt for your deployed URL and package name, then build signed AAB and APK files.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Option B: PWABuilder (Easiest)</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Web-based tool with visual interface:
                </p>
                <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                  <li>Visit <a href="https://www.pwabuilder.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">pwabuilder.com</a></li>
                  <li>Enter manifest URL: <code className="text-xs bg-muted px-1 py-0.5 rounded">{manifestUrl}</code></li>
                  <li>Click "Package for Stores" → "Android"</li>
                  <li>Download the generated AAB file</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Configure Digital Asset Links */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </div>
                <CardTitle>Configure Digital Asset Links</CardTitle>
              </div>
              <CardDescription>Critical step for TWA verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Key className="h-4 w-4" />
                <AlertDescription>
                  You must update <code>frontend/public/.well-known/assetlinks.json</code> with your actual package name and SHA-256 fingerprint before deploying.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Two Placeholders to Replace:</h4>
                <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-2">
                  <li>
                    <strong>REPLACE_WITH_YOUR_PACKAGE_NAME</strong>
                    <p className="ml-5 text-xs">Your Android package name (e.g., <code>com.yourcompany.ibn</code>)</p>
                  </li>
                  <li>
                    <strong>REPLACE_WITH_YOUR_SHA256_FINGERPRINT</strong>
                    <p className="ml-5 text-xs">SHA-256 fingerprint from your signing key (printed by Bubblewrap script)</p>
                  </li>
                </ol>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">After Updating:</h4>
                <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                  <li>Redeploy your frontend</li>
                  <li>Verify file is accessible at: <code className="text-xs bg-muted px-1 py-0.5 rounded break-all">{assetLinksUrl}</code></li>
                  <li>Test with <a href="https://developers.google.com/digital-asset-links/tools/generator" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's tester tool</a></li>
                </ol>
              </div>

              <p className="text-xs text-muted-foreground">
                Detailed setup guide: <code>frontend/public/.well-known/ASSETLINKS_SETUP.md</code>
              </p>
            </CardContent>
          </Card>

          {/* Step 3: Upload to Play Console */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  3
                </div>
                <CardTitle>Upload to Google Play Console</CardTitle>
              </div>
              <CardDescription>Submit your app for review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Upload Process:</h4>
                </div>
                <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                  <li>Go to <a href="https://play.google.com/console" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Play Console</a></li>
                  <li>Create new app or select existing</li>
                  <li>Navigate to Release → Production → Create new release</li>
                  <li>Upload your AAB file</li>
                  <li>Complete store listing with app description, screenshots, and feature graphic</li>
                  <li>Set Privacy Policy URL: <code className="text-xs bg-muted px-1 py-0.5 rounded break-all">{privacyPolicyUrl}</code></li>
                  <li>Submit for review</li>
                </ol>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Required Assets:</h4>
                </div>
                <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                  <li>Feature graphic (1024x500): {featureGraphicPath}</li>
                  <li>Screenshots (1080x1920): {screenshot1Path}, {screenshot2Path}</li>
                  <li>App icons (192x192, 512x512): {appIcon192Path}, {appIcon512Path}</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>Detailed documentation and tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Complete guide:</span>
                <code className="text-xs">frontend/PLAY_STORE_BUILD.md</code>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">TWA helper docs:</span>
                <code className="text-xs">frontend/scripts/twa/README.md</code>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Asset Links setup:</span>
                <code className="text-xs">frontend/public/.well-known/ASSETLINKS_SETUP.md</code>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <a href="https://github.com/GoogleChromeLabs/bubblewrap" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Bubblewrap Documentation
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <a href="https://www.pwabuilder.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  PWABuilder
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <a href="https://developers.google.com/digital-asset-links/tools/generator" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Digital Asset Links Tester
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
