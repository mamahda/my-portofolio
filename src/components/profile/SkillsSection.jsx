import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, skills } from "../../data/profile";
import { projects } from "../../data/projects";
import { snappy } from "../../lib/motion";
import { tabPanelProps } from "../../lib/ui";
import Section, { SectionFooterLink } from "../ui/Section";

const groups = ["All", ...new Set(skills.map((skill) => skill.group))];
const PREVIEW = 8;
const PREVIEW_MOBILE = 4;

const projectsUsing = (skill) => projects.filter((project) => project.tech.some((tech) => skill.uses.includes(tech)));

/* WAI-ARIA tabs: arrow keys / Home / End move and select, only the selected tab is a Tab stop. */
export const Tabs = ({ id, label, tabs, value, onChange, layoutId, controlsPanel = false }) => {
  const handleKeyDown = (event, index) => {
    const moves = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = (moves[event.key] + tabs.length) % tabs.length;
    onChange(tabs[next]);
    event.currentTarget.parentElement.children[next].focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0"
    >
      {tabs.map((tab, index) => (
        <button
          key={tab}
          id={`${id}-tab-${index}`}
          type="button"
          role="tab"
          aria-selected={value === tab}
          aria-controls={controlsPanel ? `${id}-panel` : undefined}
          tabIndex={value === tab ? 0 : -1}
          onClick={() => onChange(tab)}
          onKeyDown={(event) => handleKeyDown(event, index)}
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
};

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
        filtered.length > PREVIEW_MOBILE && (
          <div className={filtered.length > PREVIEW ? "" : "md:hidden"}>
            <SectionFooterLink onClick={() => setExpanded((value) => !value)}>
              {expanded ? "Show less" : `Show all ${filtered.length} skills`}
            </SectionFooterLink>
          </div>
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
        id="skill-areas"
        label="Skill areas"
        controlsPanel
      />

      <div {...tabPanelProps("skill-areas", groups, group)}>
      <motion.ul layout className="mt-4 grid gap-x-10 sm:grid-cols-2">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((skill, index) => {
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
                className={`flex items-baseline justify-between gap-4 border-b border-line-strong py-3 ${
                  !expanded && index >= PREVIEW_MOBILE ? "max-md:hidden" : ""
                }`}
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
                <span className="shrink-0 text-xs text-zinc-500">{skill.group}</span>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
      </div>
    </Section>
  );
};

export default SkillsSection;
