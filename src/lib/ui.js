const variants = {
  primary: "bg-accent text-ink-950 hover:bg-accent-hover",
  outline: "bg-tint/[0.06] text-zinc-100 hover:bg-tint/[0.1]",
  ghost: "text-zinc-400 hover:bg-tint/[0.06] hover:text-zinc-100",
};

export const button = (variant = "primary", extra = "") =>
  `inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${extra}`;

export const iconButton =
  "flex size-8 shrink-0 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-tint/[0.06] hover:text-zinc-100 active:scale-95";

export const link =
  "text-zinc-100 underline decoration-zinc-500 decoration-1 underline-offset-4 transition-colors hover:decoration-accent";

/* Navbar buttons that open a popup (Search, View CV): a round icon on phones, a tab from md up. */
export const navAction =
  "flex size-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-zinc-100 active:scale-95 md:h-full md:w-[68px] md:flex-col md:gap-1 md:rounded-none md:text-zinc-500 md:hover:text-zinc-200 lg:w-[78px]";

export const popover ="bg-ink-900 light:bg-white ring-1 ring-tint/10 shadow-float";

/* Props for the element a <Tabs> row controls; pass the same `id` to both. */
export const tabPanelProps = (id, tabs, value) => ({
  role: "tabpanel",
  id: `${id}-panel`,
  "aria-labelledby": `${id}-tab-${tabs.indexOf(value)}`,
});

export const hostOf =(url = "") => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
