import type { Metadata } from "next";

import {
  CodexaLegalPage,
  type CodexaLegalSection,
} from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaLegalPage";

export const metadata: Metadata = {
  title: "Codexa – Terms and Conditions",
};

const sections: CodexaLegalSection[] = [
  {
    title: "1. Acceptance of Terms",
    content: (
      <>
        <p>1.1 These Terms apply to all visitors, users, and customers of the Codexa platform.</p>
        <p>1.2 By accessing or using Codexa, you agree to be bound by these Terms, our Privacy Policy, and our Cookie Policy.</p>
        <p>1.3 If you do not agree with these Terms, you may not use the platform.</p>
      </>
    ),
  },
  {
    title: "2. Use of the Platform",
    content: (
      <>
        <p>2.1 Codexa provides digital templates, components, and related resources for product development and web design.</p>
        <p>2.2 You agree to use the platform only for lawful purposes and in accordance with these Terms.</p>
        <p>2.3 You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
      </>
    ),
  },
  {
    title: "3. Accounts and Access",
    content: (
      <>
        <p>3.1 Certain features or content may require account creation or purchase.</p>
        <p>3.2 You agree to provide accurate and complete information when registering or making a purchase.</p>
        <p>3.3 Access to purchased content is granted according to the terms stated at the time of purchase.</p>
      </>
    ),
  },
  {
    title: "4. Intellectual Property",
    content: (
      <>
        <p>4.1 All content, designs, components, layouts, and materials available on Codexa are the intellectual property of Codexa or its licensors.</p>
        <p>4.2 You may not copy, modify, distribute, sublicense, or resell any part of the platform or its content without prior written permission, unless explicitly permitted.</p>
      </>
    ),
  },
  {
    title: "5. Payments and Billing",
    content: (
      <>
        <p>5.1 Payments, where applicable, are processed securely through trusted third-party payment providers.</p>
        <p>5.2 By completing a purchase, you authorize Codexa to charge the applicable fees according to the selected product or plan.</p>
        <p>5.3 All sales are final unless otherwise stated.</p>
      </>
    ),
  },
  {
    title: "6. Limitation of Liability",
    content: (
      <>
        <p>6.1 Codexa is provided on an “as is” and “as available” basis. We do not guarantee uninterrupted or error-free operation.</p>
        <p>6.2 To the maximum extent permitted by law, Codexa shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the platform.</p>
      </>
    ),
  },
  {
    title: "7. Termination",
    content: (
      <>
        <p>7.1 We reserve the right to suspend or terminate access to the platform if these Terms are violated or if the platform is misused.</p>
        <p>7.2 You may stop using Codexa at any time.</p>
      </>
    ),
  },
  {
    title: "8. Changes to These Terms",
    content: (
      <>
        <p>8.1 We may update these Terms from time to time to reflect changes in our services or legal requirements.</p>
        <p>8.2 The latest version will always be available on this page. Continued use of the platform constitutes acceptance of the updated Terms.</p>
      </>
    ),
  },
  {
    title: "9. Contact",
    content: (
      <p>
        If you have any questions about these Terms and Conditions, please contact us at<br />
        <a href="mailto:support@codexa.dev">support@codexa.dev</a>
      </p>
    ),
  },
];

export default function CodexaTermsPage() {
  return (
    <CodexaLegalPage
      title="Terms and Conditions"
      intro={
        <p>
          By accessing or using the <strong>Codexa</strong> website and services, you agree to these Terms and Conditions. Please read them carefully before using the platform.
        </p>
      }
      sections={sections}
      variant="terms"
    />
  );
}
