interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className, variant = "default", iconOnly = false, size = "md" }: LogoProps) {
  const iconPx = size === "sm" ? 44 : size === "lg" ? 64 : 52;
  const logoWidth = size === "sm" ? 72 : size === "lg" ? 140 : 104;
  const titleSize = size === "sm" ? "1.02rem" : size === "lg" ? "1.38rem" : "1.14rem";
  void variant;

  if (iconOnly) {
    return (
      <img
        src="/Logo.png"
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
        src="/Logo.png"
        alt="Nurture Next logo"
        className="shrink-0 object-contain"
        style={{
          width: logoWidth,
          height: "auto",
        }}
      />
      <span
        style={{
          fontFamily: "'Sora', 'Manrope', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: titleSize,
          letterSpacing: "0.03em",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "#FFFFFF", textShadow: "0 0 2px rgba(0,0,0,0.45)" }}>Nurture</span>{" "}
        <span style={{ color: "#FFFFFF" }}>Next</span>
      </span>
    </span>
  );
}
