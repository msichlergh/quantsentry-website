import Link from "next/link";

import { CodexaDemoForm } from "../shared/CodexaDemoForm";
import { CodexaFormField } from "../shared/CodexaFormField";
import { CODEXA_ROUTES } from "../shared/codexaSiteConfig";

import styles from "./CompanySupportPage.module.css";

export function CompanySupportPage() {
  return (
    <section
      className={styles.contactSection}
      id="support"
      aria-labelledby="support-title"
    >
      <div className={styles.shell}>
        <div className={styles.intro}>
          <div>
            <h1 id="support-title">Contact support</h1>
            <p>
              Need help with your setup, workflows, or integrations
              <br />
              Our team is here to assist with product questions, onboarding, or
              technical issues.
            </p>
          </div>
          <div className={styles.alternate}>
            <p>
              Looking to see Codexa in action?
              <br />
              You can ask for a demo directly.
            </p>
            <Link href={CODEXA_ROUTES.sales}>Contact sales</Link>
          </div>
        </div>

        <CodexaDemoForm className={styles.form}>
          <CodexaFormField
            compactMobile
            label="Full name"
            name="fullName"
            placeholder="Jane Smith"
            required
            type="text"
          />
          <CodexaFormField
            compactMobile
            label="Email"
            name="email"
            placeholder="jane@framer.com"
            required
            type="email"
          />
          <CodexaFormField
            compactMobile
            label="Phone number"
            name="phone"
            placeholder="Your phone number"
            required
            type="tel"
          />
          <CodexaFormField
            compactMobile
            label="Reason for contact"
            name="reason"
            placeholder="Please specify"
            required
            type="text"
          />
          <CodexaFormField
            label="How can we help you?"
            large
            multiline
            name="message"
            placeholder="Write your message here"
            required
          />
          <label className={styles.consent}>
            <input name="privacy" type="checkbox" />
            <span>
              I agree the <Link href={CODEXA_ROUTES.privacy}>privacy policy</Link>.
            </span>
          </label>
          <button type="submit">Get in touch</button>
          <p className={styles.demoNote}>Demo only — submissions are not sent.</p>
        </CodexaDemoForm>
      </div>
    </section>
  );
}
