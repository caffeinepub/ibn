import { useEffect, useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { IBNHeader } from './components/IBNHeader';
import { IBNFooter } from './components/IBNFooter';
import { PaymentSuccess } from './components/payments/PaymentSuccess';
import { PaymentFailure } from './components/payments/PaymentFailure';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { getHashRoute } from './utils/hashRoute';

function App() {
  const [route, setRoute] = useState(getHashRoute());

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getHashRoute());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Determine which page to show based on hash route
  const isPaymentSuccess = route === 'payment-success';
  const isPaymentFailure = route === 'payment-failure';
  const isLogin = route === 'login';
  const isRegister = route === 'register';
  const isDashboard = route === 'dashboard';
  const isPrivacyPolicy = route === 'privacy-policy';
  
  const showHeaderFooter = !isPaymentSuccess && !isPaymentFailure;

  return (
    <div className="flex min-h-screen flex-col">
      {showHeaderFooter && <IBNHeader />}
      <main className="flex-1">
        {isPaymentSuccess ? (
          <PaymentSuccess />
        ) : isPaymentFailure ? (
          <PaymentFailure />
        ) : isLogin ? (
          <LoginPage />
        ) : isRegister ? (
          <RegisterPage />
        ) : isDashboard ? (
          <DashboardPage />
        ) : isPrivacyPolicy ? (
          <PrivacyPolicyPage />
        ) : (
          <LandingPage />
        )}
      </main>
      {showHeaderFooter && <IBNFooter />}
    </div>
  );
}

export default App;
