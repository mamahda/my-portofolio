import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRightIcon, HashIcon, MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { search, searchGroups, suggestions } from "../../lib/search";
import { snappy } from "../../lib/motion";
import { popover } from "../../lib/ui";

const ResultThumb = ({ entry }) =>
  entry.image ? (
    <img
      src={entry.image}
      alt=""
      className={`size-9 shrink-0 rounded-md bg-ink-800 ring-1 ring-inset ring-white/[0.08] ${
        entry.type === "Projects" ? "object-cover object-left-top" : "object-contain p-0.5"
      }`}
    />
  ) : (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-ink-800 text-zinc-500 ring-1 ring-inset ring-white/[0.08]">
      <HashIcon size={16} />
    </span>
  );

/* A navbar icon that opens a search pop-up: full width on phones, a centred panel from md up. */
const SearchBox = ({ className = "" }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const listId = useId();

  const results = useMemo(() => search(query), [query]);
  const hasQuery = query.trim().length > 0;

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  const openSearch = () => {
    // Render the field before focusing, inside the tap, so phones open the keyboard.
    flushSync(() => setOpen(true));
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      // Keep Tab focus inside the pop-up instead of escaping to the page behind it.
      const focusable = panelRef.current.querySelectorAll("button:not([tabindex='-1']), input");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const go = (entry) => {
    navigate(entry.to);
    close();
  };

  const handleKeyDown = (event) => {
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[active]);
    }
  };

  return (
    <div className={className}>
      <button
        ref={triggerRef}
        type="button"
        onClick={openSearch}
        aria-label="Search the portfolio"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex size-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-zinc-100 active:scale-95 md:h-full md:w-[68px] md:flex-col md:gap-1 md:rounded-none md:text-zinc-500 md:hover:text-zinc-200 lg:w-[78px]"
      >
        <MagnifyingGlassIcon size={22} />
        <span className="hidden text-[11px] md:block">Search</span>
      </button>

      {/* Portalled: the navbar's backdrop-filter would otherwise trap these fixed layers inside it. */}
      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            key="search"
            className="fixed inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="Close search"
              onClick={close}
              className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Search the portfolio"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={snappy}
              className={`absolute inset-x-0 top-0 overflow-hidden md:top-[12vh] md:mx-auto md:w-[560px] md:rounded-xl ${popover}`}
            >
              <div className="flex h-14 items-center gap-3 border-b border-line-strong px-4">
                <MagnifyingGlassIcon size={18} className="shrink-0 text-zinc-500" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActive(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search projects, certifications, skills"
                  aria-label="Search the portfolio"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={listId}
                  aria-autocomplete="list"
                  className="h-full min-w-0 flex-1 bg-transparent text-base text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                {hasQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="flex size-6 shrink-0 items-center justify-center rounded-full text-zinc-500 hover:bg-white/10 hover:text-zinc-100"
                  >
                    <XIcon size={13} weight="bold" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 text-sm text-zinc-400 hover:text-zinc-100 md:rounded-md md:bg-white/[0.06] md:px-2 md:py-1 md:text-xs"
                >
                  <span className="md:hidden">Cancel</span>
                  <span className="hidden md:inline">Esc</span>
                </button>
              </div>

              <div
                id={listId}
                role="listbox"
                className="max-h-[calc(100dvh-56px)] overflow-y-auto overscroll-contain md:max-h-[60vh]"
              >
                {!hasQuery && (
                  <div className="p-4">
                    <p className="text-sm text-zinc-500">Try searching for</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {suggestions.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => {
                            setQuery(term);
                            setActive(0);
                            inputRef.current?.focus();
                          }}
                          className="rounded-md bg-white/[0.05] px-3 py-1 text-sm text-zinc-300 transition-colors hover:bg-white/[0.1] hover:text-zinc-100 active:scale-[0.98]"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {hasQuery && results.length === 0 && (
                  <div className="px-4 py-8 text-center">
                    <p className="font-medium">No results for &ldquo;{query.trim()}&rdquo;</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Try a technology like Go or React, or an issuer like HackerRank.
                    </p>
                  </div>
                )}

                {results.length > 0 &&
                  searchGroups.map((group) => {
                    const items = results.filter((entry) => entry.type === group);
                    if (!items.length) return null;
                    return (
                      <div key={group} className="py-2">
                        <p className="px-4 pb-1 pt-1.5 text-sm text-zinc-500">{group}</p>
                        {items.map((entry) => {
                          const index = results.indexOf(entry);
                          return (
                            <button
                              key={`${entry.type}-${entry.title}`}
                              type="button"
                              role="option"
                              aria-selected={index === active}
                              onMouseEnter={() => setActive(index)}
                              onClick={() => go(entry)}
                              className={`flex w-full items-center gap-5 px-4 py-2 text-left transition-colors ${
                                index === active ? "bg-white/[0.05]" : ""
                              }`}
                            >
                              <ResultThumb entry={entry} />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium text-zinc-100">{entry.title}</span>
                                <span className="block truncate text-xs text-zinc-500">{entry.meta}</span>
                              </span>
                              {index === active && <ArrowUpRightIcon size={15} className="shrink-0 text-accent" />}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </div>
  );
};

export default SearchBox;
