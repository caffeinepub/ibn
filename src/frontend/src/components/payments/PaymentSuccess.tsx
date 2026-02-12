import { useEffect, useState } from 'react';
import { CheckCircle, Loader2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetStripeSessionStatus } from '@/hooks/useQueries';
import { getUrlParameter } from '@/utils/urlParams';

export function PaymentSuccess() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Support both regular query params and hash-based query params
    const id = getUrlParameter('session_id');
    setSessionId(id);
  }, []);

  const { data: sessionStatus, isLoading, error } = useGetStripeSessionStatus(sessionId);

  const handleGoHome = () => {
    window.location.hash = '';
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Verifying your payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !sessionStatus) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Verification Failed</CardTitle>
            <CardDescription>
              We couldn't verify your payment. Please contact support.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGoHome} className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (sessionStatus.__kind__ === 'failed') {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Payment Failed</CardTitle>
            <CardDescription>
              {sessionStatus.failed.error || 'Your payment could not be processed.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGoHome} className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-md border-primary shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Your data plan has been activated and is ready to use.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transaction ID:</span>
              <span className="font-mono text-xs">{sessionId?.slice(0, 20)}...</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-semibold text-primary">Completed</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✓ Your data has been delivered to your account</p>
            <p>✓ You can start using it immediately</p>
            <p>✓ Check your phone for confirmation</p>
          </div>

          <Button onClick={handleGoHome} className="w-full" size="lg">
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
