import type { Metadata } from "next";

import {
  CodexaLegalPage,
  type CodexaLegalSection,
} from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaLegalPage";
import { CodexaSiteFrame } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaSiteFrame";

export const metadata: Metadata = {
  title: "Codexa – Privacy Policy",
};

const sections: CodexaLegalSection[] = [
  {
    title: "1. Introduction",
    content: (
      <>
        <p>1.1 This Privacy Policy applies to all visitors, users, and customers of the Codexa platform.</p>
        <p>1.2 Codexa is responsible for the collection and processing of personal data in accordance with applicable data protection laws.</p>
      </>
    ),
  },
  {
    title: "2. Information We Collect",
    content: (
      <>
        <h3>2.1 Account Information</h3>
        <p>Information such as your name, email address, and other details you provide when creating an account or making a purchase.</p>
        <h3>2.2 Usage Information</h3>
        <p>Data related to how you interact with the website, including page visits, browser type, and device information.</p>
        <h3>2.3 Payment Information</h3>
        <p>Payments are processed securely by third-party payment providers. Codexa does not store full credit card details.</p>
        <h3>2.4 Communications</h3>
        <p>Information you share when contacting us for support, feedback, or general inquiries.</p>
      </>
    ),
  },
  {
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>We use personal data to:</p>
        <ul>
          <li>Operate, maintain, and improve the Codexa platform</li>
          <li>Process purchases and provide access to content</li>
          <li>Respond to support requests and inquiries</li>
          <li>Send important service updates or optional communications</li>
          <li>Maintain platform security and comply with legal obligations</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Sharing of Data",
    content: (
      <>
        <p>4.1 Codexa does not sell personal data.</p>
        <p>4.2 Data may be shared with trusted service providers (such as hosting, analytics, and payment processors) solely to support our operations.</p>
        <p>4.3 Information may be disclosed if required by law or to protect Codexa’s legal rights.</p>
      </>
    ),
  },
  {
    title: "5. Data Retention",
    content: (
      <>
        <p>5.1 Personal data is retained only for as long as necessary to provide our services or comply with legal requirements.</p>
        <p>5.2 You may request deletion of your personal data by contacting us directly.</p>
      </>
    ),
  },
  {
    title: "6. Security",
    content: (
      <>
        <p>6.1 Codexa applies appropriate technical and organizational measures to protect personal information from unauthorized access, loss, or misuse.</p>
        <p>6.2 While we take reasonable steps to protect your data, no system can be guaranteed to be fully secure. You are responsible for keeping your account credentials confidential.</p>
      </>
    ),
  },
  {
    title: "7. Your Rights",
    content: (
      <>
        <p>7.1 Depending on your location, you may have the right to access, correct, or delete your personal information.</p>
        <p>
          7.2 To exercise these rights, please contact us at<br />
          <a href="mailto:privacy@codexa.dev">privacy@codexa.dev</a>
        </p>
      </>
    ),
  },
  {
    title: "8. Updates to This Policy",
    content: <p>This Privacy Policy may be updated from time to time. Any changes will be posted on this page.</p>,
  },
];

export default function CodexaPrivacyPage() {
  return (
    <CodexaSiteFrame>
      <CodexaLegalPage
        title="Privacy Policy"
        intro={
          <p>Codexa respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services.</p>
        }
        sections={sections}
        variant="privacy"
      />
    </CodexaSiteFrame>
  );
}
