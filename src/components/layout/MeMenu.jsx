import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CaretDownIcon, CheckIcon, FileTextIcon, LinkSimpleIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react";
import useCopy from "../../hooks/useCopy";
import useDismiss from "../../hooks/useDismiss";
import { profile } from "../../data/profile";
import { snappy } from "../../lib/motion";
import { button, popover } from "../../lib/ui";

const itemClass =
  "flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-zinc-100";

const MeMenu = () => {
  const [open, setOpen] = useState(false);
  const [copied, copy] = useCopy();
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  return (
    <div ref={ref} className="relative hidden h-full md:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex h-full w-[68px] flex-col items-center justify-center gap-1 text-zinc-500 transition-colors hover:text-zinc-100"
      >
        <img src={profile.photo} alt="" className="size-[22px] rounded-full object-cover ring-1 ring-white/10" />
        <span className="flex items-center gap-0.5 text-[11px]">
          Me <CaretDownIcon size={10} weight="fill" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={snappy}
            className={`absolute right-0 top-[calc(100%+6px)] w-72 origin-top-right overflow-hidden rounded-xl py-2 ${popover}`}
          >
            <div className="flex gap-3 px-4 pb-3 pt-1">
              <img src={profile.photo} alt="" className="size-12 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="font-medium">{profile.name}</p>
                <p className="line-clamp-2 text-xs leading-snug text-zinc-500">{profile.headline}</p>
              </div>
            </div>
            <div className="px-4 pb-3">
              <Link to="/" onClick={close} className={button("outline", "w-full")}>
                View profile
              </Link>
            </div>
            <div className="border-t border-line pt-2">
              <a href={profile.cv} target="_blank" rel="noopener noreferrer" className={itemClass}>
                <FileTextIcon size={17} /> View CV
              </a>
              <button type="button" onClick={() => copy(profile.site, "profile")} className={itemClass}>
                {copied === "profile" ? <CheckIcon size={17} className="text-accent" /> : <LinkSimpleIcon size={17} />}
                {copied === "profile" ? "Link copied" : "Copy profile link"}
              </button>
              <Link to="/contact" onClick={close} className={itemClass}>
                <PaperPlaneTiltIcon size={17} /> Send a message
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MeMenu;
