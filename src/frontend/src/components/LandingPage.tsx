import { DataPlansSection } from './DataPlansSection';
import { WhatsAppCTA } from './WhatsAppCTA';
import { Wifi, Zap, Shield, TrendingUp } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div 
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: 'url(/assets/generated/ibn-hero-bg.dim_1600x900.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        <div className="container relative z-10 flex flex-col items-center gap-8 py-20 text-center md:py-28">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Premium Data Plans
              <span className="block text-primary mt-2">For Everyone</span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-2xl mx-auto">
              Get affordable, reliable mobile data bundles delivered instantly. Stay connected with IBN's fast and secure data services.
            </p>
          </div>
          
          <WhatsAppCTA size="lg" />
          
          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm border">
              <Zap className="h-4 w-4 text-primary" />
              <span>Instant Delivery</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm border">
              <Shield className="h-4 w-4 text-primary" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm border">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Best Rates</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="border-b bg-muted/30">
        <div className="container py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-6">
              <Wifi className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Why Choose IBN?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              IBN provides premium mobile data services at competitive prices. Whether you need data for browsing, streaming, or business, we've got you covered with flexible plans that suit your needs. Our instant delivery system ensures you're connected within minutes of purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Data Plans Section */}
      <DataPlansSection />

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Contact us on WhatsApp now to purchase your data plan. Our team is ready to assist you 24/7.
            </p>
            <div className="flex justify-center">
              <WhatsAppCTA size="lg" showNumber />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
