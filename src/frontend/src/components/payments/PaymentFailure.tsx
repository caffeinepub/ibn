import { XCircle, Home, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export function PaymentFailure() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="container flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-md border-destructive">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
          <CardDescription>
            Your payment was not completed. No charges were made to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 space-y-2 text-sm text-muted-foreground">
            <p>Your payment session was cancelled or interrupted.</p>
            <p>You can try again or contact us for assistance.</p>
          </div>

          <div className="space-y-2">
            <Button onClick={handleGoHome} className="w-full" size="lg">
              <Home className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              className="w-full"
            >
              <a 
                href={getWhatsAppUrl('I need help with my payment')} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
