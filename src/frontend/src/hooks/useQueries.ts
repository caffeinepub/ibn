import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { StripeConfiguration, ShoppingItem, BankDetails, UserProfile } from '../backend';

// Stripe configuration queries
export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['stripeConfigured'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: StripeConfiguration) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setStripeConfiguration(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stripeConfigured'] });
    },
  });
}

// Checkout session queries
export function useCreateCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ 
      items, 
      successUrl, 
      cancelUrl 
    }: { 
      items: ShoppingItem[]; 
      successUrl: string; 
      cancelUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createCheckoutSession(items, successUrl, cancelUrl);
    },
  });
}

export function useGetStripeSessionStatus(sessionId: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['stripeSessionStatus', sessionId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      if (!sessionId) throw new Error('Session ID is required');
      return actor.getStripeSessionStatus(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
    retry: 1,
  });
}

// Bank transfer queries - updated to support multiple accounts
export function useGetBankAccounts() {
  const { actor, isFetching } = useActor();

  return useQuery<BankDetails[]>({
    queryKey: ['bankAccounts'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBankAccounts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveBankAccounts() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accounts: BankDetails[]) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveBankAccounts(accounts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    },
  });
}

// Admin check query
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// User registration and profile queries
export function useIsRegisteredAsUser() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['isRegisteredAsUser'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isRegisteredAsUser();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterAsUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.registerAsUser(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isRegisteredAsUser'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.invalidateQueries({ queryKey: ['isCallerAdmin'] });
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.getCallerUserProfile();
      } catch (error: any) {
        // If unauthorized, return null instead of throwing
        if (error.message?.includes('Unauthorized')) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}
