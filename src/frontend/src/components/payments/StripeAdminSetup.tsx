import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle } from 'lucide-react';
import { useSetStripeConfiguration, useIsStripeConfigured } from '@/hooks/useQueries';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface StripeAdminSetupProps {
  onComplete?: () => void;
}

export function StripeAdminSetup({ onComplete }: StripeAdminSetupProps) {
  const [secretKey, setSecretKey] = useState('');
  const [countries, setCountries] = useState('NG,US,GB,CA');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const setConfig = useSetStripeConfiguration();
  const { data: isConfigured, refetch } = useIsStripeConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!secretKey.trim()) {
      setError('Please enter your Stripe secret key');
      return;
    }

    const countryList = countries
      .split(',')
      .map(c => c.trim().toUpperCase())
      .filter(c => c.length === 2);

    if (countryList.length === 0) {
      setError('Please enter at least one valid country code (e.g., NG, US, GB)');
      return;
    }

    try {
      await setConfig.mutateAsync({
        secretKey: secretKey.trim(),
        allowedCountries: countryList
      });
      
      setSuccess(true);
      await refetch();
      
      setTimeout(() => {
        onComplete?.();
      }, 2000);
    } catch (err: any) {
      console.error('Stripe configuration error:', err);
      setError(err.message || 'Failed to configure Stripe. Please check your credentials.');
    }
  };

  if (isConfigured) {
    return (
      <div className="space-y-4">
        <DialogHeader>
          <DialogTitle>Stripe Configuration</DialogTitle>
          <DialogDescription>
            Stripe payment processing is already configured and active.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 text-primary">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Payment system is active</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>Configure Stripe Payments</DialogTitle>
        <DialogDescription>
          Set up your Stripe account to accept payments. You'll need your Stripe secret key.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="secretKey">Stripe Secret Key</Label>
          <Input
            id="secretKey"
            type="password"
            placeholder="sk_test_..."
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            disabled={setConfig.isPending}
          />
          <p className="text-xs text-muted-foreground">
            Find this in your Stripe Dashboard under Developers → API keys
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="countries">Allowed Countries (comma-separated)</Label>
          <Input
            id="countries"
            type="text"
            placeholder="NG,US,GB,CA"
            value={countries}
            onChange={(e) => setCountries(e.target.value)}
            disabled={setConfig.isPending}
          />
          <p className="text-xs text-muted-foreground">
            Use 2-letter country codes (ISO 3166-1 alpha-2)
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
              Stripe configured successfully! Payment processing is now active.
            </AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          disabled={setConfig.isPending || success}
          className="w-full"
        >
          {setConfig.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Configuring...
            </>
          ) : success ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Configured
            </>
          ) : (
            'Save Configuration'
          )}
        </Button>
      </form>
    </div>
  );
}
