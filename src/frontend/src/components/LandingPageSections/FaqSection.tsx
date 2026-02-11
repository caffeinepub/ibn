import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FaqSection() {
  const faqs = [
    {
      question: 'How quickly will I receive my data after payment?',
      answer: 'Data is delivered instantly after successful payment. You should receive your data within 1-5 minutes. If you experience any delays, please contact us via WhatsApp.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept secure online payments via credit/debit cards through our payment gateway. You can also order via WhatsApp and we\'ll guide you through alternative payment options.'
    },
    {
      question: 'Can I use the data on multiple devices?',
      answer: 'Yes! Once the data is added to your mobile number, you can share it across multiple devices using your phone\'s hotspot feature or by inserting your SIM into different devices.'
    },
    {
      question: 'What happens if my data expires?',
      answer: 'Each plan has a validity period (7 or 30 days). After expiration, any unused data will be lost. We recommend choosing a plan that matches your usage pattern to avoid waste.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Due to the instant nature of data delivery, we generally cannot offer refunds once data has been delivered. However, if you experience technical issues, please contact us immediately and we\'ll work to resolve the problem.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can reach us anytime via WhatsApp at 09033449260. Our support team is available 24/7 to assist with any questions or issues you may have.'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our data plans and services.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
