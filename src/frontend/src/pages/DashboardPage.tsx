import { useEffect } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, LogOut, User, Phone, UserPlus } from 'lucide-react';
import { navigateToHash, navigateHome } from '@/utils/hashRoute';

export function DashboardPage() {
  const { clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile, isLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigateToHash('login');
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigateToHash('login');
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (isFetched && !userProfile) {
    return (
      <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome!</CardTitle>
            <CardDescription>
              Complete your profile to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                You haven't completed your registration yet. Please create your profile to continue.
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => navigateToHash('register')}
              className="w-full"
              size="lg"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Complete Registration
            </Button>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              Your account information and details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="text-base">{userProfile?.name || 'Not set'}</p>
              </div>
            </div>

            {userProfile?.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="text-base">{userProfile.phone}</p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <Button
                onClick={() => navigateHome()}
                variant="default"
                className="w-full"
              >
                Browse Data Plans
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
