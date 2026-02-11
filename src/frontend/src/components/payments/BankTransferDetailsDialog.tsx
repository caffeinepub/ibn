import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, Building2, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import type { BankDetails } from '@/backend';
import { getWhatsAppBankTransferConfirmationUrl } from '@/lib/whatsapp';

export interface PlanSummary {
  network: string;
  planName: string;
  data: string;
  price: string;
}

interface BankTransferDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bankDetails: BankDetails | null;
  planSummary?: PlanSummary | null;
}

export function BankTransferDetailsDialog({ open, onOpenChange, bankDetails, planSummary }: BankTransferDetailsDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAllDetails = async () => {
    if (!bankDetails) return;
    
    let allDetails = `Bank Name: ${bankDetails.bankName}\nAccount Name: ${bankDetails.accountName}\nAccount Number: ${bankDetails.accountNumber}`;
    
    if (bankDetails.iban) {
      allDetails += `\nIBAN: ${bankDetails.iban}`;
    }
    
    if (bankDetails.bic) {
      allDetails += `\nBIC/SWIFT: ${bankDetails.bic}`;
    }
    
    try {
      await navigator.clipboard.writeText(allDetails);
      setCopiedField('all');
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!bankDetails) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bank Transfer Payment</DialogTitle>
            <DialogDescription>
              Bank transfer payment option is currently unavailable.
            </DialogDescription>
          </DialogHeader>
          <Alert>
            <AlertDescription>
              Bank transfer is currently unavailable. Please use another payment method or contact support.
            </AlertDescription>
          </Alert>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Bank Transfer Details
          </DialogTitle>
          <DialogDescription>
            Transfer the exact amount to the account below and confirm your payment via WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order Summary */}
          {planSummary && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-2">
              <h3 className="font-semibold text-sm text-primary mb-3">Order Summary</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Network:</div>
                <div className="font-medium">{planSummary.network}</div>
                
                <div className="text-muted-foreground">Plan:</div>
                <div className="font-medium">{planSummary.planName}</div>
                
                <div className="text-muted-foreground">Data:</div>
                <div className="font-medium">{planSummary.data}</div>
                
                <div className="text-muted-foreground">Amount:</div>
                <div className="font-semibold text-primary">{planSummary.price}</div>
              </div>
            </div>
          )}

          {/* Copy All Details Button */}
          <Button 
            onClick={copyAllDetails}
            variant="outline"
            className="w-full gap-2"
          >
            {copiedField === 'all' ? (
              <>
                <CheckCircle className="h-4 w-4 text-primary" />
                Copied All Details!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy All Details
              </>
            )}
          </Button>

          {/* Bank Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Bank Name</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm select-all">
                {bankDetails.bankName}
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(bankDetails.bankName, 'bankName')}
              >
                {copiedField === 'bankName' ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Account Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Account Name</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm select-all">
                {bankDetails.accountName}
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(bankDetails.accountName, 'accountName')}
              >
                {copiedField === 'accountName' ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Account Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Account Number</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm select-all">
                {bankDetails.accountNumber}
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(bankDetails.accountNumber, 'accountNumber')}
              >
                {copiedField === 'accountNumber' ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* IBAN (if provided) */}
          {bankDetails.iban && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">IBAN</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm select-all">
                  {bankDetails.iban}
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(bankDetails.iban!, 'iban')}
                >
                  {copiedField === 'iban' ? (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* BIC (if provided) */}
          {bankDetails.bic && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">BIC/SWIFT Code</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm select-all">
                  {bankDetails.bic}
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(bankDetails.bic!, 'bic')}
                >
                  {copiedField === 'bic' ? (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Additional Note */}
          {bankDetails.note && (
            <Alert>
              <AlertDescription className="text-sm">
                <strong>Important:</strong> {bankDetails.note}
              </AlertDescription>
            </Alert>
          )}

          {/* Instructions */}
          <Alert className="border-primary bg-primary/5">
            <AlertDescription className="text-sm space-y-2">
              <p className="font-semibold mb-2">How to complete your payment:</p>
              <ol className="list-decimal list-inside space-y-1 ml-1">
                <li>Transfer the exact amount shown above</li>
                <li>Keep your payment receipt or proof</li>
                <li>Click the button below to confirm via WhatsApp</li>
              </ol>
            </AlertDescription>
          </Alert>

          {/* WhatsApp Confirmation CTA */}
          {planSummary && (
            <Button 
              asChild
              className="w-full gap-2"
              size="lg"
            >
              <a 
                href={getWhatsAppBankTransferConfirmationUrl(planSummary)} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Confirm Payment via WhatsApp
              </a>
            </Button>
          )}

          <Button onClick={() => onOpenChange(false)} variant="outline" className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
