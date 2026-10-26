const EntityMark = ({ label, className = "size-12 text-sm" }) => (
  <div
    aria-hidden="true"
    className={`flex shrink-0 items-center justify-center rounded-lg bg-ink-800 font-mono font-medium tracking-tight text-zinc-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-inset ring-white/[0.08] ${className}`}
  >
    {label}
  </div>
);

export default EntityMark;
