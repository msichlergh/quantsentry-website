"use client";

import type { ComponentPropsWithoutRef } from "react";

export function CodexaDemoForm({
  children,
  ...props
}: ComponentPropsWithoutRef<"form">) {
  return (
    <form
      {...props}
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit?.(event);
      }}
    >
      {children}
    </form>
  );
}
