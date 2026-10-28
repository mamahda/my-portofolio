import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { reveal } from "../../lib/motion";

export const SectionFooterLink = ({ to, onClick, children }) => {
  const className =
    "group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100";
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

const Section = ({ id, title, subtitle, action, footer, children, className = "" }) => (
  <motion.section
    {...reveal}
    id={id}
    className={`scroll-mt-20 border-t border-line py-10 sm:py-12 ${bleed} ${className}`}
  >
    {title && (
      <header className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-serif text-[25px] font-bold leading-tight tracking-tight text-zinc-50 sm:text-[30px]">{title}</h2>
          {subtitle && <p className="mt-1.5 text-sm text-zinc-500">{subtitle}</p>}
        </div>
        {action}
      </header>
    )}
    <div className={title ? "mt-4 sm:mt-5" : ""}>{children}</div>
    {footer}
  </motion.section>
);

export default Section;
