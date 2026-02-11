import { MessageCircle, Settings, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useIsStripeConfigured, useIsCallerAdmin } from '@/hooks/useQueries';
import { useState } from 'react';
import { StripeAdminSetup } from './payments/StripeAdminSetup';
import { BankTransferAdminSetup } from './payments/BankTransferAdminSetup';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function IBNHeader() {
  const { identity } = useInternetIdentity();
  const { data: isStripeConfigured, isLoading: stripeLoading } = useIsStripeConfigured();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const [stripeSetupOpen, setStripeSetupOpen] = useState(false);
  const [bankSetupOpen, setBankSetupOpen] = useState(false);

  // Show admin setup button only if logged in and is admin
  const showAdminSetup = identity && !adminLoading && isAdmin === true;
  const showStripeSetup = showAdminSetup && !stripeLoading && isStripeConfigured === false;

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
        
        <div className="flex items-center gap-2">
          {showAdminSetup && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStripeSetupOpen(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  {isStripeConfigured ? 'Stripe Settings' : 'Setup Stripe'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setBankSetupOpen(true)}>
                  <Building2 className="h-4 w-4 mr-2" />
                  Bank Transfer Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Stripe Setup Dialog */}
          <Dialog open={stripeSetupOpen} onOpenChange={setStripeSetupOpen}>
            <DialogContent>
              <StripeAdminSetup onComplete={() => setStripeSetupOpen(false)} />
            </DialogContent>
          </Dialog>

          {/* Bank Transfer Setup Dialog */}
          <Dialog open={bankSetupOpen} onOpenChange={setBankSetupOpen}>
            <DialogContent>
              <BankTransferAdminSetup onComplete={() => setBankSetupOpen(false)} />
            </DialogContent>
          </Dialog>
          
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
      </div>
    </header>
  );
}
