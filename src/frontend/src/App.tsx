import { LandingPage } from './components/LandingPage';
import { IBNHeader } from './components/IBNHeader';
import { IBNFooter } from './components/IBNFooter';
import { PaymentSuccess } from './components/payments/PaymentSuccess';
import { PaymentFailure } from './components/payments/PaymentFailure';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  // Simple path-based routing for payment pages
  const path = window.location.pathname;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        {path !== '/payment-success' && path !== '/payment-failure' && <IBNHeader />}
        <main className="flex-1">
          {path === '/payment-success' ? (
            <PaymentSuccess />
          ) : path === '/payment-failure' ? (
            <PaymentFailure />
          ) : (
            <LandingPage />
          )}
        </main>
        {path !== '/payment-success' && path !== '/payment-failure' && <IBNFooter />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
