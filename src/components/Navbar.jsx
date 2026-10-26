import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChatCircleDotsIcon, FileTextIcon } from "@phosphor-icons/react";
import { profile } from "../data/profile";
import { isNavActive, navItems } from "../lib/navigation";
import { snappy } from "../lib/motion";
import SearchBox from "./layout/SearchBox";

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-backdrop/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-14 max-w-[1128px] items-center gap-3 bg-ink-950/70 px-4 sm:px-6">
          <Link
            to="/"
            aria-label="mamahda home"
            className="shrink-0 font-serif text-lg font-bold tracking-tighter text-zinc-100 transition-opacity hover:opacity-80 active:scale-[0.98]"
          >
            Gilbran<span className="text-accent"> Mahda</span>
          </Link>

          <SearchBox className="min-w-0 flex-1 md:max-w-[260px]" />

          <nav aria-label="Primary" className="ml-auto hidden h-full items-stretch md:flex">
            {navItems.map((item) => {
              const active = isNavActive(item, location);
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex w-[68px] flex-col items-center justify-center gap-1 transition-colors lg:w-[78px] ${
                    active ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  <Icon size={22} weight={active ? "fill" : "regular"} />
                  <span className="text-[11px]">{item.label}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      transition={snappy}
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden h-7 w-px bg-line-strong lg:block" />
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden flex-col items-center justify-center gap-1 text-zinc-500 transition-colors hover:text-accent lg:flex"
          >
            <FileTextIcon size={22} />
            <span className="text-[11px]">View CV</span>
          </a>

          <Link
            to="/contact"
            aria-label="Messaging"
            className={`flex size-9 shrink-0 items-center justify-center rounded-full md:hidden ${
              location.pathname === "/contact" ? "text-accent" : "text-zinc-400"
            }`}
          >
            <ChatCircleDotsIcon size={22} weight={location.pathname === "/contact" ? "fill" : "regular"} />
          </Link>
        </div>
      </header>

      <nav
        aria-label="Primary mobile"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink-950/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
      >
        <div className="grid h-14 grid-cols-4">
          {navItems.map((item) => {
            const active = isNavActive(item, location);
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={`relative flex flex-col items-center justify-center gap-0.5 transition-colors active:scale-95 ${
                  active ? "text-zinc-100" : "text-zinc-500"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="tab-indicator"
                    transition={snappy}
                    className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-accent"
                  />
                )}
                <Icon size={21} weight={active ? "fill" : "regular"} />
                <span className="text-[10px]">{item.short ?? item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
