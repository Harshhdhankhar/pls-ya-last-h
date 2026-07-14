export function AuthDivider({ label = "or" }: { label?: string }) {
  return (
    <div className="my-7 flex items-center gap-4">
      <span className="h-px flex-1 bg-line" />
      <span className="text-[11px] uppercase tracking-widest text-ink-faint">{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
