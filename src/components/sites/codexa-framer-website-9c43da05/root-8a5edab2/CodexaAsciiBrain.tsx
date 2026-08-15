"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./CodexaBenefits.module.css";

const characterWeights = [
  [36, 22321], [64, 4601], [66, 1573], [46, 1239], [37, 962], [39, 848],
  [56, 829], [87, 820], [38, 741], [42, 735], [77, 724], [35, 673],
  [113, 659], [104, 588], [98, 575], [119, 575], [111, 542], [97, 532],
  [100, 521], [107, 500], [90, 485], [112, 479], [79, 412], [76, 407],
  [94, 390], [109, 378], [85, 367], [96, 341], [48, 338], [89, 338],
  [122, 323], [88, 305], [93, 302], [45, 298], [74, 285], [105, 277],
  [81, 275], [67, 268], [43, 266], [63, 261], [99, 251], [73, 246],
  [58, 244], [62, 242], [110, 240], [33, 227], [124, 223], [118, 221],
  [34, 220], [108, 209], [95, 199], [106, 198], [116, 194], [126, 194],
  [44, 193], [117, 192], [41, 188], [59, 186], [60, 183], [91, 166],
  [114, 159], [40, 154], [120, 147], [102, 147], [49, 136], [92, 133],
  [47, 131], [123, 129], [125, 115],
] as const;

const characterPool = characterWeights.flatMap(([code, weight]) =>
  Array.from({ length: Math.max(1, Math.round(weight / 100)) }, () => code),
);

function createFrame(seed: number) {
  let state = seed >>> 0;
  let frame = "";

  for (let row = 0; row < 55; row += 1) {
    for (let column = 0; column < 80; column += 1) {
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      frame += String.fromCharCode(characterPool[state % characterPool.length]);
    }
    frame += "\n";
  }

  return frame;
}

export function CodexaAsciiBrain() {
  const [frame, setFrame] = useState(() => createFrame(1));
  const [isVisible, setIsVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const seedRef = useRef(1);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const fallbackId = globalThis.setTimeout(() => setIsVisible(true), 0);
      return () => globalThis.clearTimeout(fallbackId);
    }

    const observer = new IntersectionObserver((entries) => {
      setIsVisible(entries.some((entry) => entry.isIntersecting));
    });

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      !isVisible ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      seedRef.current += 1;
      setFrame(createFrame(seedRef.current));
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [isVisible]);

  return (
    <div className={styles.brainVisual} ref={rootRef}>
      <pre className={`${styles.brainAscii} ${styles.brainGlow}`}>{frame}</pre>
      <pre className={styles.brainAscii}>{frame}</pre>
    </div>
  );
}
