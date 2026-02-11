import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, Building2 } from 'lucide-react';
import { useState } from 'react';
import type { BankDetails } from '@/backend';

interface BankTransferDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bankDetails: BankDetails | null;
}

export function BankTransferDetailsDialog({ open, onOpenChange, bankDetails }: BankTransferDetailsDialogProps) {
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Bank Transfer Details
          </DialogTitle>
          <DialogDescription>
            Transfer the exact amount to the account below and contact us with your payment confirmation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
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
            <AlertDescription className="text-sm">
              After making the transfer, please contact us via WhatsApp with your payment confirmation and phone number for activation.
            </AlertDescription>
          </Alert>

          <Button onClick={() => onOpenChange(false)} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
