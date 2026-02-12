import { Button } from '@/components/ui/button';
import { CreditCard, Loader2 } from 'lucide-react';
import { useCreateCheckoutSession } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PayNowButtonProps {
  networkName: string;
  planName: string;
  planData: string;
  priceInCents: number;
  variant?: 'default' | 'outline';
}

export function PayNowButton({ networkName, planName, planData, priceInCents, variant = 'default' }: PayNowButtonProps) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const createCheckout = useCreateCheckoutSession();
  const [error, setError] = useState<string | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handlePayNow = async () => {
    setError(null);

    // Check if user is logged in
    if (!identity) {
      setShowLoginDialog(true);
      return;
    }

    try {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      // Use hash-based routes for TWA compatibility
      const successUrl = `${baseUrl}/#/payment-success`;
      const cancelUrl = `${baseUrl}/#/payment-failure`;

      const items = [{
        productName: `${networkName} ${planData} Data Plan`,
        productDescription: `${networkName} - ${planName} (${planData})`,
        priceInCents: BigInt(priceInCents),
        currency: 'NGN',
        quantity: BigInt(1)
      }];

      const sessionJson = await createCheckout.mutateAsync({ items, successUrl, cancelUrl });
      const session = JSON.parse(sessionJson);

      if (!session?.url) {
        throw new Error('Payment session URL is missing');
      }

      // Redirect to Stripe checkout
      window.location.href = session.url;
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Failed to start payment. Please try again.');
    }
  };

  const handleLogin = async () => {
    try {
      await login();
      setShowLoginDialog(false);
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Failed to login. Please try again.');
    }
  };

  const isLoading = createCheckout.isPending || loginStatus === 'logging-in';

  return (
    <>
      <Button
        onClick={handlePayNow}
        disabled={isLoading}
        variant={variant}
        className="w-full gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4" />
            Pay Now
          </>
        )}
      </Button>

      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              Please login to complete your purchase securely.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 pt-4">
            <Button onClick={handleLogin} disabled={loginStatus === 'logging-in'}>
              {loginStatus === 'logging-in' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                'Login with Internet Identity'
              )}
            </Button>
            <Button variant="outline" onClick={() => setShowLoginDialog(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
