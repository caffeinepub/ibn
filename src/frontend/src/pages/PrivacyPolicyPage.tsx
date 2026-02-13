export function PrivacyPolicyPage() {
  return (
    <div className="container py-12 md:py-16 max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            IBN ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile data services application.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Information We Collect</h2>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <p className="text-muted-foreground leading-relaxed">
              When you register for our services, we may collect personal information including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Name</li>
              <li>Phone number (optional)</li>
              <li>Internet Identity authentication credentials</li>
              <li>Payment information (processed securely through third-party payment providers)</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Usage Information</h3>
            <p className="text-muted-foreground leading-relaxed">
              We may collect information about how you access and use our services, including device information, browser type, and usage patterns.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Provide, maintain, and improve our mobile data services</li>
            <li>Process your transactions and send you related information</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
            <li>Detect, prevent, and address technical issues and fraudulent activity</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our services may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party services you access.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We use third-party payment processors (such as Stripe) to process payments. These providers have their own privacy policies governing the use of your information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>The right to access and receive a copy of your personal information</li>
            <li>The right to correct or update your personal information</li>
            <li>The right to delete your personal information</li>
            <li>The right to restrict or object to our processing of your personal information</li>
            <li>The right to data portability</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Children's Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Changes to This Privacy Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-none space-y-2 text-muted-foreground ml-4">
            <li>Email: support@ibn-data.com</li>
            <li>WhatsApp: +234 903 344 9260</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
