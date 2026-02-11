import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { useSaveBankAccounts, useGetBankAccounts } from '@/hooks/useQueries';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { BankDetails } from '@/backend';

interface BankTransferAdminSetupProps {
  onComplete?: () => void;
}

export function BankTransferAdminSetup({ onComplete }: BankTransferAdminSetupProps) {
  const { data: existingAccounts, isLoading: loadingAccounts } = useGetBankAccounts();
  const saveBankAccounts = useSaveBankAccounts();

  const [accounts, setAccounts] = useState<BankDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Initialize accounts when data loads
  useEffect(() => {
    if (existingAccounts && existingAccounts.length > 0) {
      setAccounts(existingAccounts);
    } else if (existingAccounts && existingAccounts.length === 0) {
      // Start with one empty account if none exist
      setAccounts([{
        bankName: '',
        accountName: '',
        accountNumber: '',
        note: undefined,
        iban: undefined,
        bic: undefined,
      }]);
    }
  }, [existingAccounts]);

  const addAccount = () => {
    setAccounts([...accounts, {
      bankName: '',
      accountName: '',
      accountNumber: '',
      note: undefined,
      iban: undefined,
      bic: undefined,
    }]);
  };

  const removeAccount = (index: number) => {
    if (accounts.length === 1) {
      setError('You must have at least one bank account');
      return;
    }
    setAccounts(accounts.filter((_, i) => i !== index));
  };

  const updateAccount = (index: number, field: keyof BankDetails, value: string) => {
    const updated = [...accounts];
    updated[index] = {
      ...updated[index],
      [field]: value.trim() || undefined,
    };
    setAccounts(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validate all accounts
    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];
      
      if (!account.bankName?.trim()) {
        setError(`Account ${i + 1}: Please enter the bank name`);
        return;
      }

      if (!account.accountName?.trim()) {
        setError(`Account ${i + 1}: Please enter the account name`);
        return;
      }

      if (!account.accountNumber?.trim()) {
        setError(`Account ${i + 1}: Please enter the account number`);
        return;
      }
    }

    try {
      // Clean up accounts before saving
      const cleanedAccounts = accounts.map(account => ({
        bankName: account.bankName.trim(),
        accountName: account.accountName.trim(),
        accountNumber: account.accountNumber.trim(),
        note: account.note?.trim() || undefined,
        iban: account.iban?.trim() || undefined,
        bic: account.bic?.trim() || undefined,
      }));

      await saveBankAccounts.mutateAsync(cleanedAccounts);
      
      setSuccess(true);
      
      setTimeout(() => {
        onComplete?.();
      }, 2000);
    } catch (err: any) {
      console.error('Bank accounts save error:', err);
      setError(err.message || 'Failed to save bank accounts. Please try again.');
    }
  };

  if (loadingAccounts) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>Configure Bank Transfer Details</DialogTitle>
        <DialogDescription>
          Set up your bank account details for customers who want to pay via bank transfer. You can add multiple accounts.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        {accounts.map((account, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">Account {index + 1}</h3>
              {accounts.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAccount(index)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`bankName-${index}`}>Bank Name *</Label>
              <Input
                id={`bankName-${index}`}
                type="text"
                placeholder="e.g., OPAY"
                value={account.bankName || ''}
                onChange={(e) => updateAccount(index, 'bankName', e.target.value)}
                disabled={saveBankAccounts.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`accountName-${index}`}>Account Name *</Label>
              <Input
                id={`accountName-${index}`}
                type="text"
                placeholder="e.g., USMAN UMAR"
                value={account.accountName || ''}
                onChange={(e) => updateAccount(index, 'accountName', e.target.value)}
                disabled={saveBankAccounts.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`accountNumber-${index}`}>Account Number *</Label>
              <Input
                id={`accountNumber-${index}`}
                type="text"
                placeholder="e.g., 9033449260"
                value={account.accountNumber || ''}
                onChange={(e) => updateAccount(index, 'accountNumber', e.target.value)}
                disabled={saveBankAccounts.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`iban-${index}`}>IBAN (Optional)</Label>
              <Input
                id={`iban-${index}`}
                type="text"
                placeholder="e.g., GB29 NWBK 6016 1331 9268 19"
                value={account.iban || ''}
                onChange={(e) => updateAccount(index, 'iban', e.target.value)}
                disabled={saveBankAccounts.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`bic-${index}`}>BIC/SWIFT Code (Optional)</Label>
              <Input
                id={`bic-${index}`}
                type="text"
                placeholder="e.g., NWBKGB2L"
                value={account.bic || ''}
                onChange={(e) => updateAccount(index, 'bic', e.target.value)}
                disabled={saveBankAccounts.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`note-${index}`}>Additional Instructions (Optional)</Label>
              <Textarea
                id={`note-${index}`}
                placeholder="e.g., Please include your phone number in the transfer description"
                value={account.note || ''}
                onChange={(e) => updateAccount(index, 'note', e.target.value)}
                disabled={saveBankAccounts.isPending}
                rows={2}
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addAccount}
          disabled={saveBankAccounts.isPending}
          className="w-full gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Another Account
        </Button>

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
          disabled={saveBankAccounts.isPending || success}
          className="w-full"
        >
          {saveBankAccounts.isPending ? (
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
            'Save Bank Accounts'
          )}
        </Button>
      </form>
    </div>
  );
}
