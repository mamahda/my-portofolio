import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, skills } from "../../data/profile";
import { projects } from "../../data/projects";
import { snappy } from "../../lib/motion";
import Section, { SectionFooterLink } from "../ui/Section";

const groups = ["All", ...new Set(skills.map((skill) => skill.group))];
const PREVIEW = 8;

const projectsUsing = (skill) => projects.filter((project) => project.tech.some((tech) => skill.uses.includes(tech)));

export const Tabs = ({ tabs, value, onChange, layoutId }) => (
  <div
    role="tablist"
    className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0"
  >
    {tabs.map((tab) => (
      <button
        key={tab}
        type="button"
        role="tab"
        aria-selected={value === tab}
        onClick={() => onChange(tab)}
        className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
          value === tab ? "text-ink-950" : "text-zinc-500 hover:text-zinc-200"
        }`}
      >
        {value === tab && (
          <motion.span layoutId={layoutId} transition={snappy} className="absolute inset-0 rounded-full bg-zinc-100" />
        )}
        <span className="relative">{tab}</span>
      </button>
    ))}
  </div>
);

const SkillsSection = () => {
  const [group, setGroup] = useState("All");
  const [expanded, setExpanded] = useState(false);

  const filtered = group === "All" ? skills : skills.filter((skill) => skill.group === group);
  const visible = expanded ? filtered : filtered.slice(0, PREVIEW);

  return (
    <Section
      id="skills"
      title="Skills"
      subtitle={`${skills.length} skills across ${groups.length - 1} areas`}
      footer={
        filtered.length > PREVIEW && (
          <SectionFooterLink onClick={() => setExpanded((value) => !value)}>
            {expanded ? "Show less" : `Show all ${filtered.length} skills`}
          </SectionFooterLink>
        )
      }
    >
      <Tabs
        tabs={groups}
        value={group}
        onChange={(next) => {
          setGroup(next);
          setExpanded(false);
        }}
        layoutId="skills-tab"
      />

      <motion.ul layout className="mt-4 grid gap-x-10 sm:grid-cols-2">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((skill) => {
            const used = projectsUsing(skill);
            const top = profile.topSkills.some((name) => skill.name.startsWith(name));
            return (
              <motion.li
                layout
                key={skill.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={snappy}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-[15px] text-zinc-100">
                    {skill.name}
                    {top && <span className="size-1.5 rounded-full bg-accent" title="Top skill" />}
                  </p>
                  {used.length > 0 && (
                    <p className="mt-0.5 truncate text-xs text-zinc-500">
                      {used.map((project) => project.title).join(", ")}
                    </p>
                  )}
                </div>
                <span className="shrink-0 font-mono text-[11px] text-zinc-500">{skill.group}</span>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
};

export default SkillsSection;
