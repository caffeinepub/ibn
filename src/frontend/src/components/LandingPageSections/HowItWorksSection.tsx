import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, CreditCard, Zap } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: ShoppingCart,
      title: 'Choose Your Plan',
      description: 'Browse our data plans and select the one that fits your needs and budget.'
    },
    {
      icon: CreditCard,
      title: 'Make Payment',
      description: 'Pay securely online or contact us via WhatsApp to complete your order.'
    },
    {
      icon: Zap,
      title: 'Get Connected',
      description: 'Receive your data instantly and start browsing, streaming, and staying connected.'
    }
  ];

  return (
    <section className="py-16 md:py-20 border-b bg-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting your data plan is quick and easy. Follow these simple steps to stay connected.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-2">
              <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                {index + 1}
              </div>
              <CardHeader className="pt-8">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 w-fit">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
