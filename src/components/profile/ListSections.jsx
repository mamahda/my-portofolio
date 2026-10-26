import { certifications } from "../../data/certifications";
import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { formatRange, groupTenure, tenure } from "../../lib/dates";
import Section, { SectionFooterLink } from "../ui/Section";
import TagList from "../ui/Tag";
import CertificationItem from "./CertificationItem";
import ProjectItem from "./ProjectItem";

const PREVIEW = 3;

export const ProjectsSection = () => (
  <Section
    id="projects"
    title="Projects"
    footer={
      projects.length > PREVIEW && (
        <SectionFooterLink to="/projects">Show all {projects.length} projects</SectionFooterLink>
      )
    }
  >
    <ul className="space-y-7">
      {projects.slice(0, PREVIEW).map((project) => (
        <li key={project.id}>
          <ProjectItem project={project} to={`/projects#${project.id}`} />
        </li>
      ))}
    </ul>
  </Section>
);

const RoleDates = ({ role }) => (
  <p className="mt-1 text-xs tabular-nums text-zinc-500">
    {formatRange(role.start, role.end)}
    <span className="px-1.5 text-zinc-600">·</span>
    {tenure(role.start, role.end)}
  </p>
);

const RoleDetails = ({ role }) => (
  <>
    {role.points?.length > 0 && (
      <ul className="mt-3 max-w-[65ch] space-y-1.5">
        {role.points.map((point) => (
          <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-zinc-300">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 shrink-0 bg-zinc-600" />
            {point}
          </li>
        ))}
      </ul>
    )}
    {role.skills?.length > 0 && <TagList items={role.skills} className="mt-3" />}
  </>
);

/* One stop on the rail. The connector runs from this node down to the next one,
   so the last row simply omits it. */
const TimelineRow = ({ node = "major", current, last, className = "", children }) => (
  <li className={`relative pl-8 ${className}`}>
    {!last && <span aria-hidden="true" className="absolute -bottom-[5px] left-[7px] top-[5px] w-px bg-line-strong" />}
    {node === "major" ? (
      <span
        aria-hidden="true"
        className={`absolute left-0 top-[5px] flex size-[15px] items-center justify-center rounded-full border-2 bg-ink-950 ${
          current ? "border-accent" : "border-zinc-600"
        }`}
      >
        {current && <span className="size-[5px] rounded-full bg-accent" />}
      </span>
    ) : (
      <span
        aria-hidden="true"
        className={`absolute left-[3px] top-[6px] size-[9px] rounded-full ring-4 ring-ink-950 ${
          current ? "bg-accent" : "bg-zinc-600"
        }`}
      />
    )}
    {children}
  </li>
);

/* Ongoing roles first, then the most recently ended, so the rail always reads newest to oldest. */
const recency = (role) => `${role.end ?? "9999-99"}|${role.start}`;
const newestFirst = (a, b) => recency(b).localeCompare(recency(a));

const toRows = (entries) =>
  entries
    .map((entry) => ({ ...entry, roles: [...entry.roles].sort(newestFirst) }))
    .sort((a, b) => newestFirst(a.roles[0], b.roles[0]))
    .flatMap((entry) => {
      if (entry.roles.length === 1) return [{ kind: "single", entry, role: entry.roles[0] }];
      return [
        { kind: "group", entry },
        ...entry.roles.map((role, index) => ({ kind: "sub", entry, role, closesGroup: index === entry.roles.length - 1 })),
      ];
    });

const RoleSection = ({ id, title, items }) => {
  const rows = toRows(items);

  return (
    <Section id={id} title={title}>
      <ol>
        {rows.map((row, index) => {
          const last = index === rows.length - 1;
          const key = `${row.entry.org}-${row.role?.title ?? "group"}-${row.role?.start ?? ""}`;

          if (row.kind === "group") {
            return (
              <TimelineRow key={key} current={row.entry.roles.some((role) => !role.end)} last={last} className="pb-5">
                <h3 className="font-serif text-base font-bold leading-snug text-zinc-100">{row.entry.org}</h3>
                <p className="mt-1 text-xs tabular-nums text-zinc-500">{groupTenure(row.entry.roles)}</p>
                {row.entry.location && <p className="mt-0.5 text-sm text-zinc-500">{row.entry.location}</p>}
              </TimelineRow>
            );
          }

          if (row.kind === "sub") {
            return (
              <TimelineRow
                key={key}
                node="minor"
                current={!row.role.end}
                last={last}
                className={last ? "" : row.closesGroup ? "pb-9" : "pb-6"}
              >
                <p className="text-[15px] font-medium leading-snug text-zinc-100">{row.role.title}</p>
                {row.role.type && <p className="mt-0.5 text-sm text-zinc-400">{row.role.type}</p>}
                <RoleDates role={row.role} />
                <RoleDetails role={row.role} />
              </TimelineRow>
            );
          }

          return (
            <TimelineRow key={key} current={!row.role.end} last={last} className={last ? "" : "pb-9"}>
              <h3 className="font-serif text-base font-bold leading-snug text-zinc-100">{row.role.title}</h3>
              <p className="mt-0.5 text-sm text-zinc-400">
                {row.entry.org}
                {row.role.type && <span className="text-zinc-500"> · {row.role.type}</span>}
              </p>
              <RoleDates role={row.role} />
              {row.entry.location && <p className="mt-0.5 text-sm text-zinc-500">{row.entry.location}</p>}
              <RoleDetails role={row.role} />
            </TimelineRow>
          );
        })}
      </ol>
    </Section>
  );
};

export const ExperienceSection = () => <RoleSection id="experience" title="Experience" items={profile.experience} />;

export const VolunteeringSection = () => (
  <RoleSection id="volunteering" title="Volunteering" items={profile.volunteering} />
);

export const EducationSection = () => (
  <Section id="education" title="Education">
    <ul className="space-y-6">
      {profile.education.map((item) => (
        <li key={item.school}>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-serif text-base font-bold leading-snug text-zinc-100">{item.school}</h3>
              <span className="text-xs tabular-nums text-zinc-500">{item.period}</span>
            </div>
            <p className="mt-0.5 text-sm text-zinc-400">{item.degree}</p>
            <p className="text-sm text-zinc-500">{item.location}</p>
          </div>
        </li>
      ))}
    </ul>
  </Section>
);

export const CertificationsSection = () => (
  <Section
    id="certifications"
    title="Certifications"
    footer={
      certifications.length > 2 && (
        <SectionFooterLink to="/certification">Show all {certifications.length} certifications</SectionFooterLink>
      )
    }
  >
    {certifications.length === 0 ? (
      <p className="text-sm text-zinc-500">
        Certifications will appear here once they are added to <span className="font-mono">certifications.js</span>.
      </p>
    ) : (
      <ul className="space-y-6">
        {certifications.slice(0, 2).map((certification) => (
          <li key={certification.id}>
            <CertificationItem certification={certification} showLogo={false} />
          </li>
        ))}
      </ul>
    )}
  </Section>
);
