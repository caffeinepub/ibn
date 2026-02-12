import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Smartphone, Key, FileCheck, Upload, Info, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PlayStorePublishingSection() {
  const manifestUrl = `${window.location.origin}/manifest.webmanifest`;
  const assetLinksUrl = `${window.location.origin}/.well-known/assetlinks.json`;
  const featureGraphicPath = '/assets/generated/ibn-feature-graphic.dim_1024x500.png';

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
                    <p><strong>App Assets Ready:</strong> Feature graphic (1024x500px), app icon, screenshots, and store listing text</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Feature graphic is available at: <code className="bg-muted px-1 rounded">{featureGraphicPath}</code>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <p><strong>Privacy Policy URL:</strong> Required by Google for all apps</p>
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
                  <p className="font-medium">Bubblewrap Setup Checklist:</p>
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
                  <p className="font-medium">PWABuilder Setup Checklist:</p>
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
                      <p className="font-medium mb-2">Digital Asset Links File</p>
                      <p className="text-xs text-muted-foreground mb-3">
                        This file verifies that your Android app is authorized to open your website URLs. It's already hosted at:
                      </p>
                      <code className="block bg-background p-2 rounded text-xs overflow-x-auto break-all mb-3">
                        {assetLinksUrl}
                      </code>
                      <Alert className="mb-3">
                        <Info className="h-3 w-3" />
                        <AlertDescription className="text-xs">
                          <strong>Action Required:</strong> After choosing your package name and generating your signing key, you must update the <code className="bg-muted px-1 rounded">assetlinks.json</code> file with your actual <code className="bg-muted px-1 rounded">package_name</code> and <code className="bg-muted px-1 rounded">sha256_cert_fingerprints</code> values.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-2 text-xs">
                        <p className="font-medium">How to get your SHA-256 fingerprint:</p>
                        <code className="block bg-background p-2 rounded overflow-x-auto">
                          keytool -list -v -keystore your-keystore.jks -alias your-key-alias
                        </code>
                        <p className="text-muted-foreground">
                          Copy the SHA-256 value and replace <code className="bg-muted px-1 rounded">REPLACE_WITH_YOUR_SHA256_FINGERPRINT</code> in the assetlinks.json file.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <Key className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Generate a Signing Key</p>
                    <p className="text-muted-foreground text-xs mb-2">
                      Use Android Studio or keytool to create a signing key. Keep this file secure—you'll need it for all future updates.
                    </p>
                    <code className="block bg-muted p-2 rounded text-xs overflow-x-auto">
                      keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Upload */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    4
                  </div>
                  <div>
                    <CardTitle>Upload to Play Console</CardTitle>
                    <CardDescription>Submit your app for review</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Upload className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Create a New App</p>
                    <p className="text-muted-foreground text-xs">
                      In Play Console, create a new app and upload your signed APK or AAB file.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Complete the store listing with your app description, screenshots, and feature graphic</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Feature graphic (1024x500px) location: <code className="bg-muted px-1 rounded">{featureGraphicPath}</code>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <p className="text-muted-foreground">Set content rating, pricing, and distribution countries</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <p className="text-muted-foreground">Add your privacy policy URL</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <p className="text-muted-foreground">Submit for review (typically takes 1-3 days)</p>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Helpful Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <a 
                  href="https://developer.chrome.com/docs/android/trusted-web-activity/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Chrome TWA Documentation
                </a>
                <a 
                  href="https://developer.android.com/studio/publish/app-signing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Android App Signing Guide
                </a>
                <a 
                  href="https://developers.google.com/digital-asset-links/v1/getting-started" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Digital Asset Links Documentation
                </a>
                <a 
                  href="https://support.google.com/googleplay/android-developer/answer/9859152" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Play Console Help Center
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
