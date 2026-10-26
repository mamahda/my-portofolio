import { useCallback, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRightIcon, HashIcon, MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import useDismiss from "../../hooks/useDismiss";
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

const SearchBox = ({ className = "" }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const listId = useId();

  const results = useMemo(() => search(query), [query]);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(containerRef, open, close);

  const go = (entry) => {
    navigate(entry.to);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
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

  const hasQuery = query.trim().length > 0;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <label className="flex h-9 items-center gap-2 rounded-full bg-white/[0.05] px-3.5 text-sm ring-1 ring-inset ring-white/[0.06] transition-[box-shadow,background-color] focus-within:bg-white/[0.07] focus-within:ring-white/20">
        <MagnifyingGlassIcon size={16} className="shrink-0 text-zinc-500" />
        <span className="sr-only">Search the portfolio</span>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search projects, skills"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          className="min-w-0 flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {hasQuery && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="flex size-5 items-center justify-center rounded-full text-zinc-500 hover:bg-white/10 hover:text-zinc-100"
          >
            <XIcon size={12} weight="bold" />
          </button>
        )}
      </label>

      <AnimatePresence>
        {open && (
          <motion.div
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={snappy}
            className={`fixed inset-x-0 top-14 z-50 max-h-[70dvh] overflow-y-auto md:absolute md:left-0 md:right-auto md:top-12 md:w-[420px] md:rounded-xl ${popover}`}
          >
            {!hasQuery && (
              <div className="p-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Try searching for</p>
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
                      className="rounded-full px-3 py-1 text-sm text-zinc-300 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.06] hover:text-zinc-100 active:scale-[0.98]"
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
                  <div key={group} className="border-b border-line py-2 last:border-0">
                    <p className="px-4 pb-1 pt-1.5 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                      {group}
                    </p>
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
                          className={`flex w-full items-center gap-3 px-4 py-2 text-left transition-colors ${
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBox;
