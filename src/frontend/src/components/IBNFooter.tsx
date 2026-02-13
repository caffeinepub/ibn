import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { SiFacebook, SiX, SiInstagram } from 'react-icons/si';
import { getWhatsAppUrl, WHATSAPP_NUMBER } from '@/lib/whatsapp';
import { navigateToHash } from '@/utils/hashRoute';

export function IBNFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'ibn-data';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/assets/generated/ibn-logo.dim_512x512.png" 
                alt="IBN Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold">IBN</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for affordable and reliable mobile data services. Stay connected, stay productive.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => scrollToSection('plans')} 
                  className="hover:text-foreground transition-colors"
                >
                  Data Plans
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-foreground transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('play-store-publishing')} 
                  className="hover:text-foreground transition-colors"
                >
                  Publish to Play Store
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToHash('privacy-policy')} 
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <a href={getWhatsAppUrl('I need help with my order')} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MessageCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a 
                  href={getWhatsAppUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {WHATSAPP_NUMBER}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>support@ibn-data.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Follow Us</h3>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background hover:bg-accent transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background hover:bg-accent transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} IBN. All rights reserved.</p>
          <p>
            Built with ❤️ using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
