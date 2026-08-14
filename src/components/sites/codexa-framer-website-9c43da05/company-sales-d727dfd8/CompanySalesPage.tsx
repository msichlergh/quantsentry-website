"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import type { FormEvent } from "react";

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
  function preventDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className={styles.contactSection} aria-labelledby="sales-title">
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
            <Link href="/codexa/company/support">Contact support</Link>
          </div>
        </div>

        <form className={styles.form} onSubmit={preventDemoSubmit}>
          <div className={styles.twoFields}>
            <label className={styles.field}>
              <span>First name</span>
              <input name="firstName" placeholder="Jane" type="text" />
            </label>
            <label className={styles.field}>
              <span>Last name</span>
              <input name="lastName" placeholder="Smith" type="text" />
            </label>
          </div>

          <label className={styles.field}>
            <span>Work email</span>
            <input name="email" placeholder="jane@framer.com" type="email" />
          </label>

          <label className={styles.field}>
            <span>Phone number</span>
            <input name="phone" placeholder="Your phone number" type="tel" />
          </label>

          <div className={styles.twoFields}>
            <label className={styles.field}>
              <span>Company name</span>
              <input name="company" placeholder="Your company name" type="text" />
            </label>
            <label className={styles.field}>
              <span>Role</span>
              <input
                name="role"
                placeholder="What’s your role in the team?"
                type="text"
              />
            </label>
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

          <label className={styles.field}>
            <span>Message</span>
            <textarea
              name="message"
              placeholder="How can we help? Share details about your current setup."
            />
          </label>

          <label className={styles.consent}>
            <input name="privacy" type="checkbox" />
            <span>
              I agree the <Link href="/codexa/legal/privacy-policy">privacy policy</Link>.
            </span>
          </label>

          <button type="submit">Submit</button>
          <p className={styles.demoNote}>Demo only — submissions are not sent.</p>
        </form>
      </div>
    </section>
  );
}
