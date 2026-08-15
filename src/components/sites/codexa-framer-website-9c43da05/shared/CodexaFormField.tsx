import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

import styles from "./CodexaFormField.module.css";

type InputFieldProps = {
  label: string;
  multiline?: false;
  compactMobile?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

type TextareaFieldProps = {
  label: string;
  multiline: true;
  large?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function CodexaFormField(props: InputFieldProps | TextareaFieldProps) {
  if (props.multiline) {
    const {
      label,
      multiline: _multiline,
      large = false,
      ...textareaProps
    } = props;
    void _multiline;

    return (
      <label className={styles.field}>
        <span className={styles.label}>{label}</span>
        <textarea
          {...textareaProps}
          className={`${styles.control} ${styles.textarea} ${
            large ? styles.textareaLarge : ""
          }`}
        />
      </label>
    );
  }

  const {
    label,
    multiline: _multiline,
    compactMobile = false,
    ...inputProps
  } = props;
  void _multiline;

  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input
        {...inputProps}
        className={`${styles.control} ${styles.input} ${
          compactMobile ? styles.compactMobile : ""
        }`}
      />
    </label>
  );
}
