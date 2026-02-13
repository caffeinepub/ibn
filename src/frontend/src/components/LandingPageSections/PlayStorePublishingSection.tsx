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

  return (
    <section id="play-store-publishing" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
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
              <a href="/PLAY_STORE_BUILD.md" target="_blank" rel="noopener noreferrer">
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
                  <p className="font-medium">Privacy Policy URL (required by Google):</p>
                  <code className="block bg-muted p-2 rounded text-xs overflow-x-auto mt-1 break-all">
                    {privacyPolicyUrl}
                  </code>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">Required Visual Assets:</p>
                  <ul className="text-xs text-muted-foreground mt-1 ml-4 space-y-1">
                    <li>• Feature graphic (1024x500): <code className="bg-muted px-1 rounded">{featureGraphicPath}</code></li>
                    <li>• Screenshot 1 (1080x1920): <code className="bg-muted px-1 rounded">{screenshot1Path}</code></li>
                    <li>• Screenshot 2 (1080x1920): <code className="bg-muted px-1 rounded">{screenshot2Path}</code></li>
                    <li>• App icons: <code className="bg-muted px-1 rounded">frontend/public/assets/generated/ibn-app-icon.dim_192x192.png</code> & <code className="bg-muted px-1 rounded">ibn-app-icon.dim_512x512.png</code></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Step 1: Prerequisites */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    1
                  </div>
                  <div>
                    <CardTitle>Prerequisites</CardTitle>
                    <CardDescription>What you'll need before starting</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <p><strong>Google Play Console Account:</strong> Sign up at <a href="https://play.google.com/console" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">play.google.com/console</a> (one-time $25 registration fee)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <p><strong>Required Assets:</strong> All visual assets are ready in the repository</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <p><strong>Privacy Policy URL:</strong> Available at <code className="bg-muted px-1 rounded text-xs">{privacyPolicyUrl}</code></p>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Choose Your Tool */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    2
                  </div>
                  <div>
                    <CardTitle>Package as Trusted Web Activity (TWA)</CardTitle>
                    <CardDescription>Convert your PWA into an Android app</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  A Trusted Web Activity (TWA) wraps your web app in a native Android container. Choose one of these tools:
                </p>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Bubblewrap</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Google's official CLI tool for creating TWAs. Requires Node.js and Android SDK.
                    </p>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href="https://github.com/GoogleChromeLabs/bubblewrap" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Bubblewrap Docs
                      </a>
                    </Button>
                  </div>

                  <div className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">PWABuilder</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Web-based tool with a visual interface. Easiest option for beginners.
                    </p>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href="https://www.pwabuilder.com/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        PWABuilder
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4 space-y-3 text-sm">
                  <p className="font-medium">Bubblewrap Quick Start:</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">1.</span>
                      <div>
                        <p className="font-medium">Initialize with your manifest URL:</p>
                        <code className="block bg-background p-2 rounded text-xs overflow-x-auto mt-1">
                          npx @bubblewrap/cli init --manifest {manifestUrl}
                        </code>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">2.</span>
                      <div>
                        <p className="font-medium">Choose a package name (e.g., <code className="bg-background px-1 rounded">com.yourcompany.ibn</code>)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">3.</span>
                      <div>
                        <p className="font-medium">Build the Android app:</p>
                        <code className="block bg-background p-2 rounded text-xs overflow-x-auto mt-1">
                          npx @bubblewrap/cli build
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4 space-y-3 text-sm">
                  <p className="font-medium">PWABuilder Quick Start:</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">1.</span>
                      <div>
                        <p>Visit <a href="https://www.pwabuilder.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">pwabuilder.com</a></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">2.</span>
                      <div>
                        <p>Enter your manifest URL:</p>
                        <code className="block bg-background p-2 rounded text-xs overflow-x-auto mt-1 break-all">
                          {manifestUrl}
                        </code>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">3.</span>
                      <div>
                        <p>Click "Package for Stores" and select "Android"</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">4.</span>
                      <div>
                        <p>Download the generated APK or AAB file</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Digital Asset Links & Signing */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    3
                  </div>
                  <div>
                    <CardTitle>Configure Digital Asset Links & Signing</CardTitle>
                    <CardDescription>Verify domain ownership and sign your app</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <FileCheck className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium mb-2">Digital Asset Links Configuration</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        This file verifies that you own both the domain and the Android app. It must be updated with your actual package name and signing key fingerprint.
                      </p>
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">File location:</p>
                        <code className="block bg-background p-2 rounded text-xs">
                          frontend/public/.well-known/assetlinks.json
                        </code>
                        <p className="font-medium mt-3">Deployed URL:</p>
                        <code className="block bg-background p-2 rounded text-xs break-all">
                          {assetLinksUrl}
                        </code>
                        <p className="font-medium mt-3">Required placeholders to replace:</p>
                        <ul className="text-xs text-muted-foreground ml-4 space-y-1">
                          <li>• <code className="bg-background px-1 rounded">REPLACE_WITH_YOUR_PACKAGE_NAME</code></li>
                          <li>• <code className="bg-background px-1 rounded">REPLACE_WITH_YOUR_SHA256_FINGERPRINT</code></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4 space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Key className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium mb-2">Extract SHA-256 Fingerprint</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        After building your app with Bubblewrap or PWABuilder, extract the SHA-256 fingerprint from your signing key:
                      </p>
                      <code className="block bg-background p-2 rounded text-xs overflow-x-auto">
                        keytool -list -v -keystore your-keystore.keystore -alias your-key-alias
                      </code>
                      <p className="text-xs text-muted-foreground mt-2">
                        Look for the "SHA256:" line in the output and copy the fingerprint (format: XX:XX:XX:...).
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>Important:</strong> After updating <code className="bg-muted px-1 rounded">assetlinks.json</code> with your actual values, you must rebuild and redeploy your frontend so the file is accessible at <code className="bg-muted px-1 rounded">{assetLinksUrl}</code>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Step 4: Upload to Play Console */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    4
                  </div>
                  <div>
                    <CardTitle>Upload to Google Play Console</CardTitle>
                    <CardDescription>Submit your app for review</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Upload className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <ol className="space-y-2 text-muted-foreground">
                      <li>1. Go to <a href="https://play.google.com/console" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Play Console</a></li>
                      <li>2. Create a new app or select an existing one</li>
                      <li>3. Navigate to "Release" → "Production" → "Create new release"</li>
                      <li>4. Upload your AAB file (Android App Bundle)</li>
                      <li>5. Complete the store listing with:
                        <ul className="ml-4 mt-1 space-y-1 text-xs">
                          <li>• App description and screenshots</li>
                          <li>• Feature graphic from: <code className="bg-muted px-1 rounded">{featureGraphicPath}</code></li>
                          <li>• Privacy Policy URL: <code className="bg-muted px-1 rounded">{privacyPolicyUrl}</code></li>
                          <li>• Content rating questionnaire</li>
                        </ul>
                      </li>
                      <li>6. Submit for review</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              For detailed step-by-step instructions, troubleshooting, and best practices:
            </p>
            <Button asChild size="lg">
              <a href="/PLAY_STORE_BUILD.md" target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4 mr-2" />
                Read Complete Build Guide
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
