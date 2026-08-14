import Image from "next/image";

const mark = "/sites/codexa-framer-website-9c43da05/root-8a5edab2/images/codexa-mark.png";

export function CodexaLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="codexa-logo" aria-label="Codexa">
      <Image src={mark} alt="" width={compact ? 24 : 26} height={compact ? 24 : 26} />
      {!compact && <span>Codexa</span>}
    </span>
  );
}

