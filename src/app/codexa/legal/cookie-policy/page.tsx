import type { Metadata } from "next";

import {
  CodexaLegalPage,
  type CodexaLegalSection,
} from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaLegalPage";
import { CodexaSiteFrame } from "@/components/sites/codexa-framer-website-9c43da05/shared/CodexaSiteFrame";

export const metadata: Metadata = {
  title: "Codexa – Cookie Policy",
};

const sections: CodexaLegalSection[] = [
  {
    title: "1. What Are Cookies?",
    content: <p>Cookies are small text files stored on your device by your web browser. They help ensure the website functions correctly, improve performance, and provide a consistent user experience.</p>,
  },
  {
    title: "2. Types of Cookies We Use",
    content: (
      <>
        <h3>2.1 Essential Cookies</h3>
        <p>These cookies are required for core functionality, such as secure access, form submissions, and basic navigation. The website cannot function properly without them.</p>
        <h3>2.2 Analytics Cookies</h3>
        <p>These cookies help us understand how visitors use the website, allowing us to improve performance, usability, and overall experience.</p>
        <h3>2.3 Preference Cookies</h3>
        <p>Used to remember your preferences, such as language or layout settings, to provide a more consistent experience.</p>
        <h3>2.4 Marketing Cookies (if applicable)</h3>
        <p>Used only when enabled to evaluate campaign effectiveness or display relevant content.</p>
      </>
    ),
  },
  {
    title: "3. How We Use Cookies",
    content: (
      <>
        <p>We use cookies to:</p>
        <ul>
          <li>Ensure the website operates securely and reliably</li>
          <li>Analyze usage patterns to improve the platform</li>
          <li>Remember user preferences and settings</li>
          <li>Detect and resolve technical issues</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Managing Cookies",
    content: (
      <>
        <p>You can manage or disable cookies through your browser settings at any time.</p>
        <p>Please note that disabling essential cookies may limit functionality or prevent parts of the website from working correctly.</p>
      </>
    ),
  },
  {
    title: "5. Updates to This Policy",
    content: <p>This Cookie Policy may be updated from time to time. Any changes will be published on this page.</p>,
  },
  {
    title: "6. Contact",
    content: (
      <p>
        If you have any questions about this Cookie Policy, please contact us at<br />
        <a href="mailto:privacy@codexa.dev">privacy@codexa.dev</a>
      </p>
    ),
  },
];

export default function CodexaCookiesPage() {
  return (
    <CodexaSiteFrame>
      <CodexaLegalPage
        title="Cookie Policy"
        intro={
          <p>This Cookie Policy explains how <strong>Codexa</strong> uses cookies and similar technologies when you visit our website or interact with our platform.</p>
        }
        sections={sections}
        variant="cookies"
      />
    </CodexaSiteFrame>
  );
}
