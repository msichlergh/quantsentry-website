"use client";

import { useEffect, useState } from "react";

import PixelBlast from "./PixelBlast";

/**
 * The animated field needs WebGL and is, by definition, motion. Fall back to a
 * static pattern when the browser can't (hardware acceleration / WebGL turned
 * off) or shouldn't (visitor prefers reduced motion) render it — otherwise the
 * `THREE.WebGLRenderer` constructor throws in PixelBlast's effect and the area
 * renders blank.
 */
// Probe once and share it — the homepage mounts this pattern many times over.
let webglSupported: boolean | undefined;
function hasWebGL(): boolean {
  if (webglSupported === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webglSupported = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      webglSupported = false;
    }
  }
  return webglSupported;
}

function animatedFieldSupported(): boolean {
  // Reduced-motion is read live so it responds if the visitor changes it.
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  return hasWebGL();
}

export function HomeDataPattern({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  // "pending" on the server and first client paint (keeps hydration matched);
  // the effect then decides animated vs. static without ever mounting the
  // WebGL canvas when it isn't supported.
  const [mode, setMode] = useState<"pending" | "animated" | "static">("pending");

  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      setMode(animatedFieldSupported() ? "animated" : "static"),
    );
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`home-data-pattern${dark ? " is-dark" : ""}${mode === "static" ? " is-static" : ""}`}
      aria-hidden="true"
    >
      {mode === "animated" ? (
        <PixelBlast
          antialias={false}
          color={dark ? "#153332" : "#d2e4e1"}
          edgeFade={0.22}
          enableRipples={false}
          liquid={false}
          patternDensity={dark ? 0.62 : 0.7}
          patternScale={4.2}
          pixelSize={3}
          pixelSizeJitter={0.08}
          speed={0.14}
          transparent
          variant="square"
        />
      ) : null}
    </div>
  );
}
