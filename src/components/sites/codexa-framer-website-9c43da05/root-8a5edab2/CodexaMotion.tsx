"use client";

import { useLayoutEffect, useRef } from "react";

export function CodexaMotion() {
  const markerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = markerRef.current?.closest<HTMLElement>(".codexa-page");

    if (!root) {
      return;
    }

    const reveals = Array.from(
      root.querySelectorAll<HTMLElement>(".codexa-reveal"),
    );
    const marquees = Array.from(
      root.querySelectorAll<HTMLElement>("[data-codexa-marquee]"),
    );
    const automatedCards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-codexa-auto-motion]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    root.classList.add("codexa-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.08,
      },
    );

    reveals.forEach((element) => observer.observe(element));

    const marqueeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-running", entry.isIntersecting);
      });
    });

    marquees.forEach((element) => marqueeObserver.observe(element));

    let automatedState = false;
    let automatedTimer: number | undefined;

    if (window.matchMedia("(max-width: 900px)").matches && automatedCards.length) {
      automatedTimer = window.setInterval(() => {
        automatedState = !automatedState;
        automatedCards.forEach((card) => {
          card.classList.toggle("is-automated", automatedState);
        });
      }, 1800);
    }

    return () => {
      observer.disconnect();
      marqueeObserver.disconnect();
      if (automatedTimer) {
        window.clearInterval(automatedTimer);
      }
      automatedCards.forEach((card) => card.classList.remove("is-automated"));
      root.classList.remove("codexa-motion-ready");
    };
  }, []);

  return <span ref={markerRef} className="codexa-motion-anchor" aria-hidden="true" />;
}
