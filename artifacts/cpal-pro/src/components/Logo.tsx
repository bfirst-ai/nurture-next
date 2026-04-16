interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className, variant = "default", iconOnly = false, size = "md" }: LogoProps) {
  const iconPx = size === "sm" ? 44 : size === "lg" ? 64 : 52;
  const titleSize = size === "sm" ? "0.95rem" : size === "lg" ? "1.3rem" : "1.08rem";
  void variant;

  if (iconOnly) {
    return (
      <img
        src="/Nurture-logo.png"
        alt="Nurture Next logo"
        width={iconPx}
        height={iconPx}
        className="shrink-0 object-contain"
        style={{
          width: iconPx,
          height: iconPx,
        }}
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 select-none leading-none ${className ?? ""}`}>
      <img
        src="/Nurture-logo.png"
        alt="Nurture Next logo"
        width={iconPx}
        height={iconPx}
        className="shrink-0 object-contain"
        style={{
          width: iconPx,
          height: iconPx,
        }}
      />
      <span
        style={{
          fontFamily: "'Sora', 'Manrope', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: titleSize,
          letterSpacing: "0.04em",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "#ffffff" }}>Nurture</span>{" "}
        <span style={{ color: "hsl(41, 59%, 59%)" }}>Next</span>
      </span>
    </span>
  );
}

