import { LandingPage } from './components/LandingPage';
import { IBNHeader } from './components/IBNHeader';
import { IBNFooter } from './components/IBNFooter';
import { PaymentSuccess } from './components/payments/PaymentSuccess';
import { PaymentFailure } from './components/payments/PaymentFailure';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  // Hash-based routing for payment pages (TWA-compatible)
  const hash = window.location.hash;
  const route = hash.startsWith('#/') ? hash.substring(2) : '';

  // Determine which page to show based on hash route
  const isPaymentSuccess = route === 'payment-success';
  const isPaymentFailure = route === 'payment-failure';
  const showHeaderFooter = !isPaymentSuccess && !isPaymentFailure;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        {showHeaderFooter && <IBNHeader />}
        <main className="flex-1">
          {isPaymentSuccess ? (
            <PaymentSuccess />
          ) : isPaymentFailure ? (
            <PaymentFailure />
          ) : (
            <LandingPage />
          )}
        </main>
        {showHeaderFooter && <IBNFooter />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
