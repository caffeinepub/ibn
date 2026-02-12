import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl, WHATSAPP_NUMBER } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

interface WhatsAppCTAProps {
  size?: 'default' | 'sm' | 'lg';
  showNumber?: boolean;
  message?: string;
  className?: string;
}

export function WhatsAppCTA({ size = 'default', showNumber = false, message, className }: WhatsAppCTAProps) {
  return (
    <Button 
      asChild
      size={size}
      className={cn("gap-2 font-semibold", className)}
    >
      <a 
        href={getWhatsAppUrl(message)} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <MessageCircle className="h-5 w-5" />
        <span>
          {showNumber ? `WhatsApp: ${WHATSAPP_NUMBER}` : 'Chat on WhatsApp'}
        </span>
      </a>
    </Button>
  );
}
