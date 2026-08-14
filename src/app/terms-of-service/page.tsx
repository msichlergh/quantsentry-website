import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = {
  title: "Terms of Service — QuantSentry",
  description:
    "The terms governing access to and use of the QuantSentry risk infrastructure platform.",
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    content: (
      <>
        <p>
          These terms of service (&ldquo;Terms&rdquo;) govern access to and
          use of the QuantSentry platform (the &ldquo;Service&rdquo;) by the
          organisation that has signed an order form referencing these
          Terms (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;). By accessing or
          using the Service, you agree to be bound by these Terms on behalf
          of Customer. If you do not have authority to bind Customer, do not
          use the Service.
        </p>
      </>
    ),
  },
  {
    id: "definitions",
    title: "Definitions",
    content: (
      <ul>
        <li><strong>&ldquo;Customer Data&rdquo;</strong> means position, portfolio, and other data Customer or its users submit to the Service.</li>
        <li><strong>&ldquo;Order Form&rdquo;</strong> means a signed document specifying the subscription plan, fees, and term purchased.</li>
        <li><strong>&ldquo;Users&rdquo;</strong> means individuals Customer authorises to access the Service under its account.</li>
        <li><strong>&ldquo;Documentation&rdquo;</strong> means QuantSentry&apos;s published user guides and API references for the Service.</li>
      </ul>
    ),
  },
  {
    id: "the-service",
    title: "The service",
    content: (
      <>
        <p>
          QuantSentry provides a software platform for aggregating position
          data, computing risk metrics, and surfacing exposure and drift
          analysis to systematic trading desks. We may update, add to, or
          deprecate features of the Service from time to time, provided we
          do not materially reduce the core functionality Customer has
          subscribed to during a paid term without reasonable notice.
        </p>
        <p>
          The Service is a decision-support tool. It does not place trades,
          manage funds, or provide investment advice, and Customer remains
          solely responsible for its trading, risk, and compliance
          decisions.
        </p>
      </>
    ),
  },
  {
    id: "accounts-and-access",
    title: "Accounts and access",
    content: (
      <>
        <p>
          Customer is responsible for its Users&apos; compliance with these
          Terms, for the accuracy of information provided to create
          accounts, and for maintaining the confidentiality of
          authentication credentials. Customer must notify us promptly of
          any suspected unauthorised access.
        </p>
        <p>
          We may suspend access to protect the security or integrity of the
          Service, to comply with law, or where Customer materially
          breaches these Terms and fails to cure within a reasonable period
          after notice.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>Customer will not, and will not permit Users to:</p>
        <ul>
          <li>Reverse engineer, decompile, or attempt to extract the source code of the Service, except as permitted by law.</li>
          <li>Use the Service to build a competing product, or resell or sublicense access without our written consent.</li>
          <li>Attempt to probe, scan, or breach the security of the Service or its underlying infrastructure.</li>
          <li>Upload data Customer does not have the right to share, or that infringes a third party&apos;s rights.</li>
          <li>Use the Service in a way that violates applicable law, including securities and market-abuse regulation.</li>
        </ul>
      </>
    ),
  },
  {
    id: "customer-data-and-ownership",
    title: "Customer data and ownership",
    content: (
      <>
        <p>
          As between the parties, Customer owns all Customer Data. Customer
          grants QuantSentry a limited licence to host, process, and display
          Customer Data solely to provide and support the Service. We will
          not use Customer Data to train models or features shared across
          other customers without Customer&apos;s prior written consent.
        </p>
        <p>
          QuantSentry and its licensors own all right, title, and interest
          in the Service itself, including its software, models,
          methodology, and Documentation, excluding Customer Data. No rights
          are granted except those expressly set out in these Terms.
        </p>
        <p>
          Aggregated or de-identified data that cannot reasonably be used to
          identify Customer or any individual may be used by QuantSentry to
          improve the Service, subject to the confidentiality obligations
          below.
        </p>
      </>
    ),
  },
  {
    id: "fees-and-billing",
    title: "Fees and billing",
    content: (
      <>
        <p>
          Fees are set out in the applicable Order Form and are due in
          advance of the billing period unless stated otherwise. Fees are
          exclusive of taxes, which Customer is responsible for except taxes
          on QuantSentry&apos;s net income. Unless the Order Form says
          otherwise, fees are non-refundable and the subscription
          automatically renews for successive terms equal to the initial
          term unless either party gives written notice of non-renewal at
          least 30 days before the renewal date.
        </p>
        <p>
          Late payments may accrue interest at the lesser of 1.5% per month
          or the maximum permitted by law, and we may suspend access for
          undisputed invoices more than 30 days overdue after written
          notice.
        </p>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: (
      <>
        <p>
          Each party may disclose confidential information to the other in
          connection with these Terms. The receiving party will use
          confidential information only to perform its obligations, protect
          it with at least the same care it uses for its own confidential
          information of similar importance (and no less than reasonable
          care), and not disclose it except to personnel, affiliates, and
          professional advisers who need to know it and are bound by
          equivalent confidentiality obligations.
        </p>
        <p>
          These obligations do not apply to information that is or becomes
          public through no fault of the receiving party, was already known
          to the receiving party without confidentiality restriction, or
          must be disclosed by law, provided the disclosing party is given
          notice where legally permitted.
        </p>
      </>
    ),
  },
  {
    id: "warranties-and-disclaimers",
    title: "Warranties and disclaimers",
    content: (
      <>
        <p>
          Each party warrants it has the authority to enter into these
          Terms. QuantSentry warrants it will provide the Service in a
          professional manner consistent with prevailing industry
          standards.
        </p>
        <p>
          Except as expressly stated in these Terms, the Service is provided
          &ldquo;as is&rdquo; and QuantSentry disclaims all other
          warranties, express or implied, including merchantability, fitness
          for a particular purpose, and non-infringement, to the maximum
          extent permitted by law. QuantSentry does not warrant that risk
          outputs are error-free or that they eliminate trading, market, or
          operational risk.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by law, neither party will be
          liable for indirect, incidental, special, consequential, or
          punitive damages, or for lost profits, revenue, or data, arising
          out of or related to these Terms, even if advised of the
          possibility of such damages.
        </p>
        <p>
          Except for breaches of confidentiality, infringement of
          intellectual property rights, or a party&apos;s indemnification
          obligations, each party&apos;s total liability arising out of
          these Terms will not exceed the fees paid or payable by Customer
          under the applicable Order Form in the 12 months preceding the
          claim. Nothing in these Terms limits liability that cannot be
          limited under applicable law, including liability for death,
          personal injury, or fraud.
        </p>
      </>
    ),
  },
  {
    id: "term-and-termination",
    title: "Term and termination",
    content: (
      <>
        <p>
          These Terms remain in effect for as long as an Order Form
          referencing them is active. Either party may terminate for the
          other party&apos;s uncured material breach on 30 days&apos;
          written notice, or immediately if the other party becomes
          insolvent.
        </p>
        <p>
          On termination, Customer&apos;s right to access the Service ends,
          and QuantSentry will make Customer Data available for export for
          30 days, after which it may be deleted in accordance with our
          retention schedule and{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>. Sections
          intended to survive termination, including confidentiality,
          ownership, fees accrued, and limitation of liability, will
          survive.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <>
        <p>
          Where Customer contracts with QuantSentry Ltd, these Terms are
          governed by the laws of England and Wales, and the courts of
          England and Wales have exclusive jurisdiction. Where Customer
          contracts with QuantSentry Inc., these Terms are governed by the
          laws of the State of Delaware, and the state and federal courts
          located in New York, New York have exclusive jurisdiction. The
          contracting entity is specified on Customer&apos;s Order Form.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p>Questions about these Terms can be sent to:</p>
        <ul>
          <li>Email: legal@quantsentry.com</li>
          <li>QuantSentry Ltd — 20 St Thomas Street, London SE1 9RS, United Kingdom</li>
          <li>QuantSentry Inc. — 28 Liberty Street, New York, NY 10005, United States</li>
        </ul>
        <p>
          See our <Link href="/privacy-policy">privacy policy</Link> for how
          we handle personal data, or visit{" "}
          <Link href="/contact-us">contact us</Link> for general enquiries.
        </p>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="14 August 2026"
      summary={
        <>
          These Terms govern the subscription agreement between your
          organisation and QuantSentry for access to our risk infrastructure
          platform. They cover acceptable use, data ownership, fees,
          confidentiality, and liability. Specific commercial terms — plan,
          price, and term length — are set out in your Order Form, which
          takes precedence in the event of a conflict with this document.
        </>
      }
      sections={sections}
    />
  );
}
