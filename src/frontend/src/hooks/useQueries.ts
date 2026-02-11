import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { StripeConfiguration, ShoppingItem, BankDetails } from '../backend';

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

// Bank transfer queries
export function useGetBankDetails() {
  const { actor, isFetching } = useActor();

  return useQuery<BankDetails | null>({
    queryKey: ['bankDetails'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBankRequirements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveBankDetails() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (details: BankDetails) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveBankDetails(details);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankDetails'] });
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
