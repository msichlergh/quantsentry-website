import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * Our design system adds custom `text-*` font-size tokens (text-body, text-caption,
 * text-display-lg …). tailwind-merge cannot tell those apart from `text-*` COLOUR
 * utilities, so by default it treats e.g. `text-caption` as a colour and silently drops
 * an earlier `text-primary-foreground` from the same className. That produced invisible
 * white-on-white buttons. Registering the scale explicitly fixes the classification.
 */
const FONT_SIZES = [
  "display-xl",
  "display-lg",
  "display-md",
  "heading-lg",
  "heading-md",
  "heading-sm",
  "body",
  "body-sm",
  "caption",
  "label",
] as const

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...FONT_SIZES] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
