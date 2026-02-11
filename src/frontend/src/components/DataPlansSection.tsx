import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Building2 } from 'lucide-react';
import { getWhatsAppOrderUrl } from '@/lib/whatsapp';
import { PayNowButton } from './payments/PayNowButton';
import { BankTransferDetailsDialog } from './payments/BankTransferDetailsDialog';
import { useGetBankDetails } from '@/hooks/useQueries';
import { MOBILE_NETWORKS, getPlansByNetwork, type MobileNetwork } from '@/data/mobileNetworkPlans';

export function DataPlansSection() {
  const [selectedNetwork, setSelectedNetwork] = useState<MobileNetwork>('MTN');
  const [bankTransferOpen, setBankTransferOpen] = useState(false);
  const { data: bankDetails, isLoading: bankDetailsLoading } = useGetBankDetails();
  const plans = getPlansByNetwork(selectedNetwork);

  const isBankTransferAvailable = !bankDetailsLoading && bankDetails !== null && bankDetails !== undefined;

  return (
    <section id="plans" className="py-16 md:py-20 scroll-mt-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Our Data Plans
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include instant activation and reliable connectivity.
          </p>
        </div>

        {/* Network Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-border bg-background p-1 gap-1">
            {MOBILE_NETWORKS.map((network) => (
              <Button
                key={network}
                variant={selectedNetwork === network ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedNetwork(network)}
                className="min-w-[90px]"
              >
                {network}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
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
                <CardTitle className="text-xl">{plan.title}</CardTitle>
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
              
              <CardFooter className="flex flex-col gap-2">
                <PayNowButton 
                  networkName={plan.network}
                  planName={plan.title}
                  planData={plan.data}
                  priceInCents={plan.priceInCents}
                  variant={plan.popular ? 'default' : 'outline'}
                />
                
                {isBankTransferAvailable && (
                  <Button 
                    onClick={() => setBankTransferOpen(true)}
                    className="w-full gap-2"
                    variant="secondary"
                    size="sm"
                  >
                    <Building2 className="h-4 w-4" />
                    Pay via Bank Transfer
                  </Button>
                )}

                {!isBankTransferAvailable && bankDetailsLoading && (
                  <Button 
                    disabled
                    className="w-full gap-2"
                    variant="secondary"
                    size="sm"
                  >
                    <Building2 className="h-4 w-4" />
                    Loading...
                  </Button>
                )}
                
                <Button 
                  asChild
                  className="w-full"
                  variant="ghost"
                  size="sm"
                >
                  <a 
                    href={getWhatsAppOrderUrl({
                      network: plan.network,
                      planName: plan.title,
                      data: plan.data,
                      price: plan.price
                    })} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Order via WhatsApp
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Bank Transfer Details Dialog */}
      <BankTransferDetailsDialog 
        open={bankTransferOpen}
        onOpenChange={setBankTransferOpen}
        bankDetails={bankDetails ?? null}
      />
    </section>
  );
}
