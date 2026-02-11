import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
  bankAccounts: BankDetails[] | null;
  planSummary?: PlanSummary | null;
}

export function BankTransferDetailsDialog({ open, onOpenChange, bankAccounts, planSummary }: BankTransferDetailsDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);

  const selectedAccount = bankAccounts && bankAccounts.length > 0 ? bankAccounts[selectedAccountIndex] : null;

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
    if (!selectedAccount) return;
    
    let allDetails = `Bank Name: ${selectedAccount.bankName}\nAccount Name: ${selectedAccount.accountName}\nAccount Number: ${selectedAccount.accountNumber}`;
    
    if (selectedAccount.iban) {
      allDetails += `\nIBAN: ${selectedAccount.iban}`;
    }
    
    if (selectedAccount.bic) {
      allDetails += `\nBIC/SWIFT: ${selectedAccount.bic}`;
    }
    
    try {
      await navigator.clipboard.writeText(allDetails);
      setCopiedField('all');
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!bankAccounts || bankAccounts.length === 0) {
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

  const hasMultipleAccounts = bankAccounts.length > 1;

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

          {/* Bank Account Selection (if multiple accounts) */}
          {hasMultipleAccounts && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Select Bank Account</Label>
              <Tabs 
                value={selectedAccountIndex.toString()} 
                onValueChange={(value) => setSelectedAccountIndex(parseInt(value))}
                className="w-full"
              >
                <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${bankAccounts.length}, 1fr)` }}>
                  {bankAccounts.map((account, index) => (
                    <TabsTrigger key={index} value={index.toString()}>
                      {account.bankName}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
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

          {selectedAccount && (
            <>
              {/* Bank Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Bank Name</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm select-all">
                    {selectedAccount.bankName}
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(selectedAccount.bankName, 'bankName')}
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
                    {selectedAccount.accountName}
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(selectedAccount.accountName, 'accountName')}
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
                    {selectedAccount.accountNumber}
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(selectedAccount.accountNumber, 'accountNumber')}
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
              {selectedAccount.iban && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">IBAN</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm select-all">
                      {selectedAccount.iban}
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => copyToClipboard(selectedAccount.iban!, 'iban')}
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
              {selectedAccount.bic && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">BIC/SWIFT Code</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm select-all">
                      {selectedAccount.bic}
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => copyToClipboard(selectedAccount.bic!, 'bic')}
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
              {selectedAccount.note && (
                <Alert>
                  <AlertDescription className="text-sm">
                    <strong>Note:</strong> {selectedAccount.note}
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}

          {/* Payment Instructions */}
          <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
            <h3 className="font-semibold text-sm">Payment Instructions</h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-semibold text-foreground">1.</span>
                <span>Transfer the exact amount to the account details above</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-foreground">2.</span>
                <span>Take a screenshot or save your payment receipt</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-foreground">3.</span>
                <span>Click the button below to confirm your payment via WhatsApp</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-foreground">4.</span>
                <span>Send your payment proof and we'll activate your data plan</span>
              </li>
            </ol>
          </div>

          {/* WhatsApp Confirmation Button */}
          {planSummary && selectedAccount && (
            <Button 
              asChild
              className="w-full gap-2"
              size="lg"
            >
              <a 
                href={getWhatsAppBankTransferConfirmationUrl(planSummary, selectedAccount.bankName)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Confirm Payment via WhatsApp
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for Label (since it's not imported)
function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={className} {...props}>
      {children}
    </label>
  );
}
