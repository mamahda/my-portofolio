import SiteFooter from "./SiteFooter";

const PageShell = ({ children, aside }) => (
  <div className="relative mx-auto min-h-[100dvh] max-w-[1128px] bg-ink-950">
    <div className="grid grid-cols-1 pb-28 pt-14 sm:px-6 sm:pt-[72px] md:grid-cols-[232px_minmax(0,1fr)] md:gap-6 md:pb-16 lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-6">
      <div className="min-w-0 px-4 sm:px-0 md:order-2">{children}</div>
      <aside className="mt-6 px-4 sm:px-0 md:sticky md:top-[72px] md:order-1 md:mt-0 md:self-start md:pr-6 lg:pr-8">
        {aside}
        <SiteFooter />
      </aside>
    </div>
  </div>
);

export default PageShell;
