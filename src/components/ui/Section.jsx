import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { enter, reveal } from "../../lib/motion";

export const SectionFooterLink = ({ to, onClick, children }) => {
  const className =
    "group -mb-2 mt-4 inline-flex items-center gap-1.5 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100";
  const content = (
    <>
      {children}
      <ArrowRightIcon size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </>
  );

  return to ? (
    <Link to={to} className={className}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
};

/* Lets the divider run edge to edge on mobile; equal padding on both sides from sm up. */
export const bleed = "-mx-4 px-4 sm:mx-0 sm:px-6";

/* Mobile: full-bleed in the card colour, split by a thick band in the desktop column background.
   From md up: a card. */
const sectionSurface =
  "-mx-4 border-t-8 border-ink-950 bg-[var(--card)] px-4 py-7 sm:-mx-6 sm:px-6 md:mx-0 md:rounded-2xl md:border-t-0 md:p-8 md:card-surface";

/* The single card that holds a sub page's main content (header + list) from md up. */
export const pageCard = `${bleed} md:rounded-2xl md:px-8 md:card-surface md:pb-8 md:pt-3`;

const Section = ({ id, title, subtitle, action, footer, children, className = "", immediate = false }) => (
  <motion.section
    {...(immediate ? enter : reveal)}
    id={id}
    className={`scroll-mt-20 ${sectionSurface} ${className}`}
  >
    {title && (
      <header className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-serif text-2xl font-bold leading-tight tracking-tight text-zinc-50 md:text-[1.875rem]">{title}</h2>
          {subtitle && <p className="mt-1.5 text-sm text-zinc-500">{subtitle}</p>}
        </div>
        {action}
      </header>
    )}
    <div className={title ? "mt-6 md:mt-8" : ""}>{children}</div>
    {footer}
  </motion.section>
);

export default Section;
