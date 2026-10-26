import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { spring } from "../../lib/motion";

const SubPageHeader = ({ eyebrow, title, back = "/", backLabel = "Back to profile", children }) => (
  <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={spring} className="pb-10 pt-7 sm:pb-12 sm:pt-5">
    <Link
      to={back}
      className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-100"
    >
      <ArrowLeftIcon size={15} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
      {backLabel}
    </Link>
    <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="mt-2 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">{title}</h1>
        </div>
      {children}
    </div>
  </motion.header>
);

export default SubPageHeader;
