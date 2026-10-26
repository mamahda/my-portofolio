import SiteFooter from "./SiteFooter";

const PageShell = ({ children, aside }) => (
  <div className="relative mx-auto min-h-[100dvh] max-w-[1128px] bg-ink-950 sm:border-x sm:border-line">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 hidden w-px bg-line md:right-[324px] md:block lg:right-[332px]"
    />
    <div className="grid grid-cols-1 pb-24 pt-14 sm:px-6 sm:pt-[72px] md:grid-cols-[minmax(0,1fr)_280px] md:gap-10 md:pb-16 lg:gap-14">
      <div className="section-counter min-w-0 px-4 sm:px-0">{children}</div>
      <aside className="border-t border-line px-4 sm:px-0 md:sticky md:top-[72px] md:self-start md:border-t-0">
        {aside}
        <SiteFooter />
      </aside>
    </div>
  </div>
);

export default PageShell;
