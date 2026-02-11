import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export function IBNHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/generated/ibn-logo.dim_512x512.png" 
            alt="IBN Logo" 
            className="h-10 w-10 object-contain"
          />
          <span className="text-2xl font-bold tracking-tight">IBN</span>
        </div>
        
        <Button 
          asChild
          variant="default"
          size="sm"
          className="gap-2"
        >
          <a 
            href={getWhatsAppUrl()} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Contact Us</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
