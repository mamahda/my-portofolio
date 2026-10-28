const EntityMark = ({ label, className = "size-12 text-sm" }) => (
  <div
    aria-hidden="true"
    className={`flex shrink-0 items-center justify-center rounded-lg bg-ink-800 font-medium tracking-tight text-zinc-200 ring-1 ring-inset ring-white/[0.08] ${className}`}
  >
    {label}
  </div>
);

export default EntityMark;
