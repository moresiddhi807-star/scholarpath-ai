/**
 * Ambient floating gradient blobs used behind hero/auth sections for a
 * premium, soft-glow SaaS feel. Purely decorative, pointer-events disabled.
 */
export function FloatingBlobs({ variant = "light" }: { variant?: "light" | "dark" }) {
  const teal = variant === "light" ? "rgba(14,165,160,0.18)" : "rgba(14,165,160,0.25)";
  const amber = variant === "light" ? "rgba(245,166,35,0.14)" : "rgba(245,166,35,0.2)";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      <div
        className="blob-float absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: teal }}
      />
      <div
        className="blob-float-delayed absolute top-1/3 -right-24 h-[24rem] w-[24rem] rounded-full blur-3xl"
        style={{ background: amber }}
      />
      <div
        className="blob-float absolute bottom-0 left-1/3 h-[20rem] w-[20rem] rounded-full blur-3xl opacity-60"
        style={{ background: teal }}
      />
    </div>
  );
}
