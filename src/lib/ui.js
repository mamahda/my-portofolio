const variants = {
  primary: "bg-accent text-ink-950 hover:bg-accent-hover",
  outline: "bg-white/[0.06] text-zinc-100 hover:bg-white/[0.1]",
  ghost: "text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-100",
};

export const button = (variant = "primary", extra = "") =>
  `inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${extra}`;

export const iconButton =
  "flex size-8 shrink-0 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-zinc-100 active:scale-95";

export const link =
  "text-zinc-100 underline decoration-zinc-500 decoration-1 underline-offset-4 transition-colors hover:decoration-accent";

export const popover = "bg-ink-900 ring-1 ring-white/10 shadow-float";

export const hostOf = (url = "") => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
