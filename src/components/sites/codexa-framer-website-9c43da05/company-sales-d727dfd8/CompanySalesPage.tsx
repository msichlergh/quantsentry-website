import { Check } from "lucide-react";
import Link from "next/link";

import { CodexaDemoForm } from "../shared/CodexaDemoForm";
import { CodexaFormField } from "../shared/CodexaFormField";
import { CODEXA_ROUTES } from "../shared/codexaSiteConfig";

import styles from "./CompanySalesPage.module.css";

const benefits = [
  "Request a live demo",
  "Get tailored pricing advice",
  "Discuss security & deployment options",
] as const;

const improvements = [
  "Automating repetitive tasks",
  "Reducing operations",
  "Improving deployment speed",
  "Scaling infrastructure",
  "Evaluating new tools",
  "Better visibility & monitoring",
] as const;

export function CompanySalesPage() {
  return (
    <section
      className={styles.contactSection}
      id="sales"
      aria-labelledby="sales-title"
    >
      <div className={styles.shell}>
        <div className={styles.intro}>
          <div>
            <h1 id="sales-title">Contact sales</h1>
            <p>We’ll help you choose the right solution for your team.</p>
          </div>

          <ul>
            {benefits.map((benefit) => (
              <li key={benefit}>
                <span>
                  <Check aria-hidden="true" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className={styles.alternate}>
            <p>
              Need help with onboarding, product questions, or technical issues?
            </p>
            <Link href={CODEXA_ROUTES.support}>Contact support</Link>
          </div>
        </div>

        <CodexaDemoForm className={styles.form}>
          <div className={styles.twoFields}>
            <CodexaFormField label="First name" name="firstName" placeholder="Jane" type="text" />
            <CodexaFormField label="Last name" name="lastName" placeholder="Smith" type="text" />
          </div>

          <CodexaFormField label="Work email" name="email" placeholder="jane@framer.com" type="email" />

          <CodexaFormField label="Phone number" name="phone" placeholder="Your phone number" type="tel" />

          <div className={styles.twoFields}>
            <CodexaFormField label="Company name" name="company" placeholder="Your company name" type="text" />
            <CodexaFormField label="Role" name="role" placeholder="What’s your role in the team?" type="text" />
          </div>

          <fieldset className={styles.improvements}>
            <legend>What are you looking to improve</legend>
            <div>
              {improvements.map((improvement) => (
                <label key={improvement}>
                  <input name="improvements" type="checkbox" value={improvement} />
                  <span>{improvement}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <CodexaFormField
            label="Message"
            multiline
            name="message"
            placeholder="How can we help? Share details about your current setup."
          />

          <label className={styles.consent}>
            <input name="privacy" type="checkbox" />
            <span>
              I agree the <Link href={CODEXA_ROUTES.privacy}>privacy policy</Link>.
            </span>
          </label>

          <button type="submit">Submit</button>
          <p className={styles.demoNote}>Demo only — submissions are not sent.</p>
        </CodexaDemoForm>
      </div>
    </section>
  );
}
