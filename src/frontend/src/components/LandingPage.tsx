import { DataPlansSection } from './DataPlansSection';
import { WhatsAppCTA } from './WhatsAppCTA';
import { HowItWorksSection } from './LandingPageSections/HowItWorksSection';
import { TestimonialsSection } from './LandingPageSections/TestimonialsSection';
import { FaqSection } from './LandingPageSections/FaqSection';
import { PlayStorePublishingSection } from './LandingPageSections/PlayStorePublishingSection';
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
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-background/50 to-background" />
        
        <div className="container relative z-10 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 backdrop-blur-sm px-4 py-2 text-sm">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-medium">Fast, Reliable, Affordable</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
              Get Instant Mobile Data
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Buy data for all Nigerian networks at unbeatable prices. Instant delivery, 24/7 support, and guaranteed satisfaction.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <WhatsAppCTA 
                size="lg"
                message="Hi! I want to buy data"
                className="shadow-lg"
              />
              <button 
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                View Plans
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {[
                { icon: Wifi, label: 'All Networks', value: '4+' },
                { icon: Zap, label: 'Instant Delivery', value: '< 5min' },
                { icon: Shield, label: 'Secure Payment', value: '100%' },
                { icon: TrendingUp, label: 'Happy Customers', value: '1000+' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/80 backdrop-blur-sm border">
                  <stat.icon className="h-6 w-6 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorksSection />

      {/* Data Plans */}
      <DataPlansSection />

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 border-b">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose IBN?
            </h2>
            <p className="text-lg text-muted-foreground">
              We're committed to providing the best mobile data experience in Nigeria. Our platform combines cutting-edge technology with exceptional customer service to ensure you stay connected when it matters most.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              {[
                { title: 'Instant Delivery', desc: 'Data delivered to your phone within minutes of payment' },
                { title: 'Best Prices', desc: 'Competitive rates across all networks and data plans' },
                { title: '24/7 Support', desc: 'Our team is always ready to help via WhatsApp' },
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-lg border bg-card">
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FaqSection />

      {/* Play Store Publishing Guide */}
      <PlayStorePublishingSection />

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied customers enjoying fast, reliable mobile data.
            </p>
            <WhatsAppCTA 
              size="lg"
              message="Hi! I'm ready to buy data"
              className="shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
