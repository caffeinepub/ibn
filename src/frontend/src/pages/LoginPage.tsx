import { useEffect } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, LogIn } from 'lucide-react';
import { navigateToHash } from '@/utils/hashRoute';

export function LoginPage() {
  const { login, loginStatus, identity, isLoginError } = useInternetIdentity();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigateToHash('dashboard');
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Sign in with Internet Identity to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoginError && (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to sign in. Please try again.
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full"
            size="lg"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign in with Internet Identity
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={() => navigateToHash('register')}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Register here
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
