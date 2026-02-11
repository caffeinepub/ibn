import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface DataPlan {
  id: string;
  name: string;
  data: string;
  price: string;
  validity: string;
  features: string[];
  popular?: boolean;
}

const dataPlans: DataPlan[] = [
  {
    id: 'starter',
    name: 'Starter Plan',
    data: '2GB',
    price: '₦500',
    validity: '7 Days',
    features: [
      'Perfect for light browsing',
      'Social media access',
      'Email & messaging',
      'Instant activation'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    data: '5GB',
    price: '₦1,200',
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
    id: 'premium',
    name: 'Premium Plan',
    data: '10GB',
    price: '₦2,000',
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
    id: 'unlimited',
    name: 'Business Plan',
    data: '20GB',
    price: '₦3,500',
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

export function DataPlansSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Our Data Plans
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include instant activation and reliable connectivity.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dataPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.validity} validity</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{plan.data}</div>
                  <div className="text-2xl font-semibold mt-2">{plan.price}</div>
                </div>
                
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  asChild
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  <a 
                    href={getWhatsAppUrl(`I want to purchase the ${plan.name} - ${plan.data} for ${plan.price}`)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Order Now
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
