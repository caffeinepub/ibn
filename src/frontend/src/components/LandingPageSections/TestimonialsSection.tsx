import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Chioma Okafor',
      initials: 'CO',
      role: 'Small Business Owner',
      content: 'IBN has been a lifesaver for my business. The data plans are affordable and the service is incredibly reliable. I can now stay connected with my customers without worrying about running out of data.',
      rating: 5
    },
    {
      name: 'Tunde Adeyemi',
      initials: 'TA',
      role: 'Student',
      content: 'As a student, I need affordable data for my online classes and research. IBN offers the best rates and the instant delivery means I never miss a class. Highly recommended!',
      rating: 5
    },
    {
      name: 'Amina Bello',
      initials: 'AB',
      role: 'Freelancer',
      content: 'Working remotely requires stable internet. IBN\'s premium plans keep me connected for video calls and file uploads. The customer service via WhatsApp is also very responsive.',
      rating: 5
    }
  ];

  return (
    <section className="py-16 md:py-20 border-b">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust IBN for their data needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
