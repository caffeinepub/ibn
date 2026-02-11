export type MobileNetwork = 'MTN' | 'GLO' | 'AIRTEL' | '9MOBILE';

export interface NetworkPlan {
  id: string;
  network: MobileNetwork;
  title: string;
  data: string;
  price: string;
  priceInCents: number;
  validity: string;
  features: string[];
  popular?: boolean;
}

export const MOBILE_NETWORKS: MobileNetwork[] = ['MTN', 'GLO', 'AIRTEL', '9MOBILE'];

export const networkPlans: NetworkPlan[] = [
  // MTN Plans
  {
    id: 'mtn-starter',
    network: 'MTN',
    title: 'MTN Starter',
    data: '2GB',
    price: '₦500',
    priceInCents: 50000,
    validity: '7 Days',
    features: [
      'Perfect for light browsing',
      'Social media access',
      'Email & messaging',
      'Instant activation'
    ]
  },
  {
    id: 'mtn-standard',
    network: 'MTN',
    title: 'MTN Standard',
    data: '5GB',
    price: '₦1,200',
    priceInCents: 120000,
    validity: '30 Days',
    features: [
      'Great for daily use',
      'HD video streaming',
      'Social media & browsing',
      'Work from home ready',
      'Priority support'
    ],
    popular: true
  },
  {
    id: 'mtn-premium',
    network: 'MTN',
    title: 'MTN Premium',
    data: '10GB',
    price: '₦2,000',
    priceInCents: 200000,
    validity: '30 Days',
    features: [
      'Heavy usage coverage',
      '4K video streaming',
      'Gaming & downloads',
      'Multiple devices',
      'VIP support'
    ]
  },
  {
    id: 'mtn-business',
    network: 'MTN',
    title: 'MTN Business',
    data: '20GB',
    price: '₦3,500',
    priceInCents: 350000,
    validity: '30 Days',
    features: [
      'Business-grade data',
      'Unlimited streaming',
      'Video conferencing',
      'Cloud services',
      'Dedicated support'
    ]
  },

  // GLO Plans
  {
    id: 'glo-starter',
    network: 'GLO',
    title: 'GLO Starter',
    data: '2GB',
    price: '₦450',
    priceInCents: 45000,
    validity: '7 Days',
    features: [
      'Perfect for light browsing',
      'Social media access',
      'Email & messaging',
      'Instant activation'
    ]
  },
  {
    id: 'glo-standard',
    network: 'GLO',
    title: 'GLO Standard',
    data: '5GB',
    price: '₦1,100',
    priceInCents: 110000,
    validity: '30 Days',
    features: [
      'Great for daily use',
      'HD video streaming',
      'Social media & browsing',
      'Work from home ready',
      'Priority support'
    ],
    popular: true
  },
  {
    id: 'glo-premium',
    network: 'GLO',
    title: 'GLO Premium',
    data: '10GB',
    price: '₦1,900',
    priceInCents: 190000,
    validity: '30 Days',
    features: [
      'Heavy usage coverage',
      '4K video streaming',
      'Gaming & downloads',
      'Multiple devices',
      'VIP support'
    ]
  },
  {
    id: 'glo-business',
    network: 'GLO',
    title: 'GLO Business',
    data: '20GB',
    price: '₦3,300',
    priceInCents: 330000,
    validity: '30 Days',
    features: [
      'Business-grade data',
      'Unlimited streaming',
      'Video conferencing',
      'Cloud services',
      'Dedicated support'
    ]
  },

  // AIRTEL Plans
  {
    id: 'airtel-starter',
    network: 'AIRTEL',
    title: 'AIRTEL Starter',
    data: '2GB',
    price: '₦480',
    priceInCents: 48000,
    validity: '7 Days',
    features: [
      'Perfect for light browsing',
      'Social media access',
      'Email & messaging',
      'Instant activation'
    ]
  },
  {
    id: 'airtel-standard',
    network: 'AIRTEL',
    title: 'AIRTEL Standard',
    data: '5GB',
    price: '₦1,150',
    priceInCents: 115000,
    validity: '30 Days',
    features: [
      'Great for daily use',
      'HD video streaming',
      'Social media & browsing',
      'Work from home ready',
      'Priority support'
    ],
    popular: true
  },
  {
    id: 'airtel-premium',
    network: 'AIRTEL',
    title: 'AIRTEL Premium',
    data: '10GB',
    price: '₦1,950',
    priceInCents: 195000,
    validity: '30 Days',
    features: [
      'Heavy usage coverage',
      '4K video streaming',
      'Gaming & downloads',
      'Multiple devices',
      'VIP support'
    ]
  },
  {
    id: 'airtel-business',
    network: 'AIRTEL',
    title: 'AIRTEL Business',
    data: '20GB',
    price: '₦3,400',
    priceInCents: 340000,
    validity: '30 Days',
    features: [
      'Business-grade data',
      'Unlimited streaming',
      'Video conferencing',
      'Cloud services',
      'Dedicated support'
    ]
  },

  // 9MOBILE Plans
  {
    id: '9mobile-starter',
    network: '9MOBILE',
    title: '9MOBILE Starter',
    data: '2GB',
    price: '₦470',
    priceInCents: 47000,
    validity: '7 Days',
    features: [
      'Perfect for light browsing',
      'Social media access',
      'Email & messaging',
      'Instant activation'
    ]
  },
  {
    id: '9mobile-standard',
    network: '9MOBILE',
    title: '9MOBILE Standard',
    data: '5GB',
    price: '₦1,180',
    priceInCents: 118000,
    validity: '30 Days',
    features: [
      'Great for daily use',
      'HD video streaming',
      'Social media & browsing',
      'Work from home ready',
      'Priority support'
    ],
    popular: true
  },
  {
    id: '9mobile-premium',
    network: '9MOBILE',
    title: '9MOBILE Premium',
    data: '10GB',
    price: '₦1,980',
    priceInCents: 198000,
    validity: '30 Days',
    features: [
      'Heavy usage coverage',
      '4K video streaming',
      'Gaming & downloads',
      'Multiple devices',
      'VIP support'
    ]
  },
  {
    id: '9mobile-business',
    network: '9MOBILE',
    title: '9MOBILE Business',
    data: '20GB',
    price: '₦3,450',
    priceInCents: 345000,
    validity: '30 Days',
    features: [
      'Business-grade data',
      'Unlimited streaming',
      'Video conferencing',
      'Cloud services',
      'Dedicated support'
    ]
  }
];

export function getPlansByNetwork(network: MobileNetwork): NetworkPlan[] {
  return networkPlans.filter(plan => plan.network === network);
}
