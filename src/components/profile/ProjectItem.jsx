import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRightIcon, CaretDownIcon, GithubLogoIcon, LockSimpleIcon } from "@phosphor-icons/react";
import { snappy } from "../../lib/motion";
import { button, hostOf } from "../../lib/ui";
import { projectStatus } from "../../lib/projectStatus";
import Img from "../ui/Img";
import TagList from "../ui/Tag";

export const ProjectStatus = ({ project }) => {
  const { label, dot } = projectStatus(project);

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
      <span className={`size-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
};

const Summary = ({ project, trailing }) => (
  <>
    <div className="min-w-0 flex-1">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="font-serif text-base font-bold leading-snug text-zinc-100 transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <ProjectStatus project={project} />
      </div>
      <p className="mt-0.5 text-sm text-zinc-500">
        {project.category}
        {project.live && (
          <>
            {" "}
            <span className="px-0.5 text-zinc-600">/</span> {hostOf(project.live)}
          </>
        )}
      </p>
      <TagList items={project.tech} className="mt-2.5" />
    </div>
    {trailing}
  </>
);

const Details = ({ project }) => (
  <div className="pt-4">
    <p className="max-w-[65ch] text-sm leading-relaxed text-zinc-300">{project.desc}</p>

    <a
      href={project.live || project.repo || project.image}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-5 block max-w-xl"
    >
      <Img
        src={project.image}
        alt={`${project.title} preview`}
        className="aspect-[16/9] w-full rounded-xl ring-1 ring-inset ring-white/[0.06]"
        imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      />
    </a>

    <div className="mt-4 flex flex-wrap gap-2">
      {project.live && project.status === "live" && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className={button("primary")}>
          Visit site <ArrowUpRightIcon size={15} weight="bold" />
        </a>
      )}
      {project.privateRepo ? (
        <span className={button("ghost", "pointer-events-none text-zinc-500")} aria-disabled="true">
          <LockSimpleIcon size={15} /> Private repository
        </span>
      ) : (
        project.repo && (
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className={button("outline")}>
            <GithubLogoIcon size={15} /> Repository
          </a>
        )
      )}
    </div>
  </div>
);

/* On the profile the row links to the full projects page; there it expands in place. */
const ProjectItem = ({ project, to, open = false, onToggle }) => {
  if (to) {
    return (
      <article id={project.id} className="scroll-mt-24">
        <Link to={to} className="group flex gap-4">
          <Summary
            project={project}
            trailing={
              <ArrowUpRightIcon
                size={15}
                className="mt-1 shrink-0 text-zinc-600 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            }
          />
        </Link>
      </article>
    );
  }

  const panelId = `${project.id}-details`;

  return (
    <article id={project.id} className="scroll-mt-24">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full gap-4 text-left"
      >
        <Summary
          project={project}
          trailing={
            <CaretDownIcon
              size={16}
              className={`mt-1 shrink-0 text-zinc-500 transition-transform duration-300 group-hover:text-zinc-100 ${
                open ? "rotate-180" : ""
              }`}
            />
          }
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={snappy}
            className="overflow-hidden"
          >
            <Details project={project} />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default ProjectItem;
