"use client";

import { useRef, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/site/primitives";

type Field = "name" | "email" | "company" | "deskSize" | "message";

type FormValues = Record<Field, string>;
type FormErrors = Partial<Record<Field, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  deskSize: "",
  message: "",
};

const fieldOrder: Field[] = ["name", "email", "company", "deskSize", "message"];

const inputClasses =
  "w-full rounded-lg border bg-surface-raised px-3.5 py-2.5 text-body-sm text-foreground placeholder:text-subtle-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const inputBorderDefault = "border-border";
const inputBorderInvalid = "border-destructive";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your work email.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.company.trim()) {
    errors.company = "Enter your company name.";
  }

  if (!values.deskSize) {
    errors.deskSize = "Select a desk size.";
  }

  if (!values.message.trim()) {
    errors.message = "Add a short message so we know how to help.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const deskSizeRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function updateField(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function focusField(field: Field) {
    if (field === "name") {
      nameRef.current?.focus();
    } else if (field === "email") {
      emailRef.current?.focus();
    } else if (field === "company") {
      companyRef.current?.focus();
    } else if (field === "deskSize") {
      deskSizeRef.current?.focus();
    } else {
      messageRef.current?.focus();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalidField = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalidField) {
      focusField(firstInvalidField);
      return;
    }

    // TODO: wire to a real endpoint
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-xl border border-accent/25 bg-accent/10 p-6"
      >
        <p className="text-heading-sm text-foreground">Message received</p>
        <p className="mt-2 text-body-sm text-muted-foreground">
          Someone from the team will reply from an @quantsentry.com address
          within one business day.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-label font-mono uppercase tracking-[0.06em] text-subtle-foreground">
          Full name
        </label>
        <input
          ref={nameRef}
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(
            inputClasses,
            "mt-2",
            !errors.name && inputBorderDefault,
            errors.name && inputBorderInvalid,
          )}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1.5 text-caption text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-label font-mono uppercase tracking-[0.06em] text-subtle-foreground">
          Work email
        </label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(
            inputClasses,
            "mt-2",
            !errors.email && inputBorderDefault,
            errors.email && inputBorderInvalid,
          )}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 text-caption text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="company" className="text-label font-mono uppercase tracking-[0.06em] text-subtle-foreground">
          Company
        </label>
        <input
          ref={companyRef}
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={(event) => updateField("company", event.target.value)}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "company-error" : undefined}
          className={cn(
            inputClasses,
            "mt-2",
            !errors.company && inputBorderDefault,
            errors.company && inputBorderInvalid,
          )}
        />
        {errors.company && (
          <p id="company-error" role="alert" className="mt-1.5 text-caption text-destructive">
            {errors.company}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="deskSize" className="text-label font-mono uppercase tracking-[0.06em] text-subtle-foreground">
          Desk size
        </label>
        <select
          ref={deskSizeRef}
          id="deskSize"
          name="deskSize"
          value={values.deskSize}
          onChange={(event) => updateField("deskSize", event.target.value)}
          aria-invalid={Boolean(errors.deskSize)}
          aria-describedby={errors.deskSize ? "deskSize-error" : undefined}
          className={cn(
            inputClasses,
            "mt-2",
            !errors.deskSize && inputBorderDefault,
            errors.deskSize && inputBorderInvalid,
          )}
        >
          <option value="">Select a range</option>
          <option value="1-5">1–5 traders</option>
          <option value="6-20">6–20 traders</option>
          <option value="21-50">21–50 traders</option>
          <option value="50+">50+ traders</option>
        </select>
        {errors.deskSize && (
          <p id="deskSize-error" role="alert" className="mt-1.5 text-caption text-destructive">
            {errors.deskSize}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-label font-mono uppercase tracking-[0.06em] text-subtle-foreground">
          Message
        </label>
        <textarea
          ref={messageRef}
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            inputClasses,
            "mt-2 resize-none",
            !errors.message && inputBorderDefault,
            errors.message && inputBorderInvalid,
          )}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-caption text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Send message
      </Button>
    </form>
  );
}
