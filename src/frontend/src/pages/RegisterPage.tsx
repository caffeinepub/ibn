import { useState } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useRegisterAsUser } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, UserPlus, LogIn } from 'lucide-react';
import { navigateToHash } from '@/utils/hashRoute';

export function RegisterPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const registerMutation = useRegisterAsUser();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  const isRegistering = registerMutation.isPending;

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      return;
    }

    if (!name.trim()) {
      return;
    }

    try {
      await registerMutation.mutateAsync({
        name: name.trim(),
        phone: phone.trim() || undefined,
      });
      navigateToHash('dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Register</CardTitle>
            <CardDescription>
              You need to sign in before registering
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                Please sign in with Internet Identity to continue with registration.
              </AlertDescription>
            </Alert>

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
              Already have an account?{' '}
              <button
                onClick={() => navigateToHash('login')}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in here
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Complete your registration to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {registerMutation.isError && (
              <Alert variant="destructive">
                <AlertDescription>
                  {registerMutation.error instanceof Error
                    ? registerMutation.error.message
                    : 'Failed to register. Please try again.'}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isRegistering}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isRegistering}
              />
            </div>

            <Button
              type="submit"
              disabled={isRegistering || !name.trim()}
              className="w-full"
              size="lg"
            >
              {isRegistering ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigateToHash('login')}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in here
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
