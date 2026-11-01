import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRightIcon, GithubLogoIcon, LockSimpleIcon } from "@phosphor-icons/react";
import { hostOf } from "../../lib/ui";
import { projectStatus } from "../../lib/projectStatus";
import Img from "../ui/Img";
import TagList from "../ui/Tag";

export const ProjectStatus = ({ project }) => {
  const { label, dot } = projectStatus(project);

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-zinc-400">
      <span className={`size-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
};

const Heading = ({ project }) => (
  <>
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
  </>
);

const action =
  "inline-flex items-center gap-1.5 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";

const Actions = ({ project }) => {
  const showLive = project.live && project.status === "live";
  if (!showLive && !project.repo && !project.privateRepo) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
      {showLive && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className={`${action} group/live text-accent hover:text-accent-hover`}>
          Visit site
          <ArrowUpRightIcon
            size={13}
            weight="bold"
            className="transition-transform duration-200 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
          />
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className={`${action} text-zinc-300 hover:text-zinc-50`}>
          <GithubLogoIcon size={15} /> Repository
        </a>
      )}
      {project.privateRepo && (
        <span className="inline-flex items-center gap-1.5 text-sm text-zinc-500">
          <LockSimpleIcon size={14} /> Private repository
        </span>
      )}
    </div>
  );
};

/* Full entry on the projects page. The screenshot column only exists when there is a
   screenshot that actually loads, so text-only projects use the full width. */
const ProjectEntry = ({ project }) => {
  const [broken, setBroken] = useState(false);
  const showImage = project.image && !broken;
  const href = project.live || project.repo;

  const preview = (
    <Img
      src={project.image}
      alt={`Screenshot of ${project.title}`}
      onError={() => setBroken(true)}
      className="aspect-[2/1] w-full rounded-lg ring-1 ring-inset ring-tint/[0.06] sm:aspect-[16/10]"
      imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/shot:scale-[1.04]"
    />
  );

  return (
    <article
      id={project.id}
      className={`scroll-mt-24 ${showImage ? "grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_11rem] sm:gap-6 lg:grid-cols-[minmax(0,1fr)_13.5rem]" : ""}`}
    >
      <div className="min-w-0">
        <Heading project={project} />
        <p className="mt-3 max-w-[65ch] text-pretty text-body leading-[1.6] text-zinc-300">{project.desc}</p>
        <TagList items={project.tech} className="mt-3" />
        <Actions project={project} />
      </div>

      {showImage &&
        (href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="group/shot -order-1 block self-start rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:order-none"
          >
            {preview}
          </a>
        ) : (
          <div className="group/shot -order-1 self-start sm:order-none">{preview}</div>
        ))}
    </article>
  );
};

/* On the profile the row is a compact link to the full projects page. */
const ProjectItem = ({ project, to }) => {
  if (!to) return <ProjectEntry project={project} />;

  return (
    <article id={project.id} className="scroll-mt-24">
      <Link to={to} className="group flex gap-4">
        <div className="min-w-0 flex-1">
          <Heading project={project} />
          <TagList items={project.tech} className="mt-2.5" />
        </div>
        <ArrowUpRightIcon
          size={15}
          className="mt-1 shrink-0 text-zinc-600 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </Link>
    </article>
  );
};

export default ProjectItem;
