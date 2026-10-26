import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CheckIcon,
  DotsThreeIcon,
  FileTextIcon,
  GithubLogoIcon,
  LinkSimpleIcon,
  MapPinIcon,
  PaperPlaneTiltIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";
import useCopy from "../../hooks/useCopy";
import useDismiss from "../../hooks/useDismiss";
import { certifications } from "../../data/certifications";
import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { rise, snappy, stagger } from "../../lib/motion";
import { button, iconButton, popover } from "../../lib/ui";
import Magnetic from "../ui/Magnetic";
import ContactInfoModal from "./ContactInfoModal";
import CoverTerminal from "./CoverTerminal";

const MoreMenu = () => {
  const [open, setOpen] = useState(false);
  const [copied, copy] = useCopy();
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  const itemClass =
    "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-zinc-100";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="More actions"
        className={`${iconButton} size-[34px] ring-1 ring-inset ring-white/15`}
      >
        <DotsThreeIcon size={18} weight="bold" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={snappy}
            className={`absolute right-0 top-[calc(100%+8px)] z-20 w-56 origin-top-right overflow-hidden rounded-xl py-1.5 sm:left-0 sm:right-auto sm:origin-top-left ${popover}`}
          >
            <button type="button" onClick={() => copy(profile.site, "link")} className={itemClass}>
              {copied === "link" ? <CheckIcon size={17} className="text-accent" /> : <LinkSimpleIcon size={17} />}
              {copied === "link" ? "Link copied" : "Copy link to profile"}
            </button>
            <a href={profile.cv} target="_blank" rel="noopener noreferrer" className={itemClass}>
              <FileTextIcon size={17} /> View CV
            </a>
            <a href={profile.socials[0].url} target="_blank" rel="noopener noreferrer" className={itemClass}>
              <GithubLogoIcon size={17} /> Visit GitHub
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProfileHeader = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const school = profile.education[0];

  return (
    <section className="relative pb-8 sm:pb-10">
      <div className="relative -mx-4 h-40 overflow-hidden bg-ink-900 sm:mx-0 sm:h-52 sm:rounded-2xl">
        <div className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black_10%,transparent_75%)]" />
        <div className="absolute -right-20 -top-40 size-[420px] rounded-full bg-accent/[0.09] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-950 to-transparent" />
        <p className="absolute left-4 top-4 font-mono text-[11px] tracking-wide text-zinc-500 sm:left-6 sm:top-5">
          backend <span className="text-zinc-600">/</span> devops <span className="text-zinc-600">/</span> networking{" "}
          <span className="text-zinc-600">/</span> security
        </p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...snappy, delay: 0.2 }}
          className="absolute right-6 top-6 hidden md:block"
        >
          <CoverTerminal />
        </motion.div>
      </div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="relative sm:px-6">
        <motion.div variants={rise} className="-mt-[68px] sm:-mt-[84px]">
          <div className="size-[132px] shrink-0 rounded-full bg-ink-950 p-1 sm:size-[156px]">
            <img src={profile.photo} alt={profile.name} className="size-full rounded-full object-cover" />
          </div>
        </motion.div>

        <div className="mt-4 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10">
          <div className="min-w-0">
            <motion.div variants={rise} className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[32px]">
                {profile.name}
              </h1>
              <SealCheckIcon size={22} weight="fill" className="text-accent" aria-label="Verified student" />
              <span className="text-sm text-zinc-500">{profile.pronouns}</span>
            </motion.div>
            <motion.p variants={rise} className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-zinc-300">
              {profile.headline}
            </motion.p>
            <motion.p variants={rise} className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
              <span className="inline-flex items-center gap-1">
                <MapPinIcon size={15} /> {profile.location}
              </span>
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="text-zinc-300 underline decoration-zinc-500 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Contact info
              </button>
            </motion.p>
            <motion.div variants={rise} className="mt-4 flex gap-6 text-sm">
              <Link to="/projects" className="group">
                <span className="font-mono text-base font-medium text-zinc-100 group-hover:text-accent">
                  {projects.length}
                </span>{" "}
                <span className="text-zinc-500">projects</span>
              </Link>
              <Link to="/certification" className="group">
                <span className="font-mono text-base font-medium text-zinc-100 group-hover:text-accent">
                  {certifications.length}
                </span>{" "}
                <span className="text-zinc-500">certifications</span>
              </Link>
            </motion.div>

            <motion.div variants={rise} className="mt-6 flex flex-wrap items-center gap-2">
              <Magnetic>
                <Link to="/contact" className={button("primary", "py-2")}>
                  <PaperPlaneTiltIcon size={16} weight="fill" /> Message
                </Link>
              </Magnetic>
              <a href={profile.cv} target="_blank" rel="noopener noreferrer" className={button("outline", "py-2")}>
                View CV
              </a>
              <MoreMenu />
            </motion.div>
          </div>

          <motion.ul variants={rise} className="space-y-3 self-start border-l border-line pl-5 md:mt-1">
            <li>
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Studying at</p>
              <p className="mt-0.5 max-w-[22ch] text-sm leading-snug text-zinc-200">{school.school}</p>
            </li>
            <li>
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Code at</p>
              <a
                href={profile.socials[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-zinc-200 transition-colors hover:text-accent"
              >
                <GithubLogoIcon size={15} /> github.com/{profile.handle}
              </a>
            </li>
            <li>
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Status</p>
              <Link
                to="/contact"
                className="group mt-1 inline-flex items-center gap-2 text-sm text-zinc-200 transition-colors hover:text-accent"
              >
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-breathe rounded-full bg-accent" />
                  <span className="relative size-2 rounded-full bg-accent" />
                </span>
                {profile.openTo.title}
              </Link>
              <p className="mt-0.5 max-w-[30ch] text-xs leading-relaxed text-zinc-500">{profile.openTo.roles}</p>
            </li>
          </motion.ul>
        </div>
      </motion.div>

      <ContactInfoModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
};

export default ProfileHeader;
