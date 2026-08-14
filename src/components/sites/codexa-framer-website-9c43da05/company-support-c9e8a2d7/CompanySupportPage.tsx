"use client";

import Link from "next/link";
import type { FormEvent } from "react";

import styles from "./CompanySupportPage.module.css";

export function CompanySupportPage() {
  function preventDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className={styles.contactSection} aria-labelledby="support-title">
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
            <Link href="/codexa/company/sales">Contact sales</Link>
          </div>
        </div>

        <form className={styles.form} onSubmit={preventDemoSubmit}>
          <label className={styles.field}>
            <span>Full name</span>
            <input name="fullName" placeholder="Jane Smith" type="text" />
          </label>
          <label className={styles.field}>
            <span>Email</span>
            <input name="email" placeholder="jane@framer.com" type="email" />
          </label>
          <label className={styles.field}>
            <span>Phone number</span>
            <input name="phone" placeholder="Your phone number" type="tel" />
          </label>
          <label className={styles.field}>
            <span>Reason for contact</span>
            <input name="reason" placeholder="Please specify" type="text" />
          </label>
          <label className={styles.field}>
            <span>How can we help you?</span>
            <textarea name="message" placeholder="Write your message here" />
          </label>
          <label className={styles.consent}>
            <input name="privacy" type="checkbox" />
            <span>
              I agree the <Link href="/codexa/legal/privacy-policy">privacy policy</Link>.
            </span>
          </label>
          <button type="submit">Get in touch</button>
          <p className={styles.demoNote}>Demo only — submissions are not sent.</p>
        </form>
      </div>
    </section>
  );
}
