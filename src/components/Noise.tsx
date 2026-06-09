/** Subtle animated scanline + grid backdrop used across the simulation OS. */
export function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in oklab, var(--foreground) 8%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, var(--foreground) 2px, var(--foreground) 3px)",
        }}
      />
    </div>
  );
}