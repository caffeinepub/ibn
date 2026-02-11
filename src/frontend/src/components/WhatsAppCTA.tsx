import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl, WHATSAPP_NUMBER } from '@/lib/whatsapp';

interface WhatsAppCTAProps {
  size?: 'default' | 'sm' | 'lg';
  showNumber?: boolean;
  message?: string;
}

export function WhatsAppCTA({ size = 'default', showNumber = false, message }: WhatsAppCTAProps) {
  return (
    <Button 
      asChild
      size={size}
      className="gap-2 font-semibold"
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
