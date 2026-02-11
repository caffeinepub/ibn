import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle } from 'lucide-react';
import { useSaveBankDetails, useGetBankDetails } from '@/hooks/useQueries';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { BankDetails } from '@/backend';

interface BankTransferAdminSetupProps {
  onComplete?: () => void;
}

export function BankTransferAdminSetup({ onComplete }: BankTransferAdminSetupProps) {
  const { data: existingDetails, isLoading: loadingDetails } = useGetBankDetails();
  const saveBankDetails = useSaveBankDetails();

  const [bankName, setBankName] = useState(existingDetails?.bankName || '');
  const [accountName, setAccountName] = useState(existingDetails?.accountName || '');
  const [accountNumber, setAccountNumber] = useState(existingDetails?.accountNumber || '');
  const [note, setNote] = useState(existingDetails?.note || '');
  const [iban, setIban] = useState(existingDetails?.iban || '');
  const [bic, setBic] = useState(existingDetails?.bic || '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Update form when existing details load
  if (existingDetails && !bankName && !loadingDetails) {
    setBankName(existingDetails.bankName);
    setAccountName(existingDetails.accountName);
    setAccountNumber(existingDetails.accountNumber);
    setNote(existingDetails.note || '');
    setIban(existingDetails.iban || '');
    setBic(existingDetails.bic || '');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validate required fields
    if (!bankName.trim()) {
      setError('Please enter the bank name');
      return;
    }

    if (!accountName.trim()) {
      setError('Please enter the account name');
      return;
    }

    if (!accountNumber.trim()) {
      setError('Please enter the account number');
      return;
    }

    try {
      const details: BankDetails = {
        bankName: bankName.trim(),
        accountName: accountName.trim(),
        accountNumber: accountNumber.trim(),
        note: note.trim() || undefined,
        iban: iban.trim() || undefined,
        bic: bic.trim() || undefined,
      };

      await saveBankDetails.mutateAsync(details);
      
      setSuccess(true);
      
      setTimeout(() => {
        onComplete?.();
      }, 2000);
    } catch (err: any) {
      console.error('Bank details save error:', err);
      setError(err.message || 'Failed to save bank details. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>Configure Bank Transfer Details</DialogTitle>
        <DialogDescription>
          Set up your bank account details for customers who want to pay via bank transfer.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name *</Label>
          <Input
            id="bankName"
            type="text"
            placeholder="e.g., First Bank of Nigeria"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            disabled={saveBankDetails.isPending || loadingDetails}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountName">Account Name *</Label>
          <Input
            id="accountName"
            type="text"
            placeholder="e.g., IBN Data Services"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            disabled={saveBankDetails.isPending || loadingDetails}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number *</Label>
          <Input
            id="accountNumber"
            type="text"
            placeholder="e.g., 1234567890"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            disabled={saveBankDetails.isPending || loadingDetails}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="iban">IBAN (Optional)</Label>
          <Input
            id="iban"
            type="text"
            placeholder="e.g., GB29 NWBK 6016 1331 9268 19"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            disabled={saveBankDetails.isPending || loadingDetails}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bic">BIC/SWIFT Code (Optional)</Label>
          <Input
            id="bic"
            type="text"
            placeholder="e.g., NWBKGB2L"
            value={bic}
            onChange={(e) => setBic(e.target.value)}
            disabled={saveBankDetails.isPending || loadingDetails}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Additional Instructions (Optional)</Label>
          <Textarea
            id="note"
            placeholder="e.g., Please include your phone number in the transfer description"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={saveBankDetails.isPending || loadingDetails}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Any special instructions for customers making bank transfers
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-primary bg-primary/10">
            <CheckCircle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary">
              Bank transfer details saved successfully!
            </AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          disabled={saveBankDetails.isPending || success || loadingDetails}
          className="w-full"
        >
          {saveBankDetails.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Saving...
            </>
          ) : success ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Saved
            </>
          ) : (
            'Save Bank Details'
          )}
        </Button>
      </form>
    </div>
  );
}
