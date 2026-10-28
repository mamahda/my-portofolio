import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { XIcon } from "@phosphor-icons/react";
import PageShell from "../components/layout/PageShell";
import { AsideBlock, FacetList, StatGrid, TagCloud } from "../components/layout/SidebarCards";
import SubPageHeader from "../components/layout/SubPageHeader";
import ProjectItem from "../components/profile/ProjectItem";
import { Tabs } from "../components/profile/SkillsSection";
import { bleed } from "../components/ui/Section";
import { projects } from "../data/projects";
import { snappy } from "../lib/motion";
import { button } from "../lib/ui";

const countBy = (values) => {
  const counts = new Map();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return [...counts].map(([value, count]) => ({ value, label: value, count }));
};

const categories = countBy(projects.map((project) => project.category));
const techs = countBy(projects.flatMap((project) => project.tech)).sort(
  (a, b) => b.count - a.count || a.value.localeCompare(b.value),
);

const stats = [
  { label: "Projects", value: projects.length },
  { label: "Live", value: projects.filter((project) => project.status === "live").length },
  { label: "In progress", value: projects.filter((project) => project.status === "in-progress").length },
  { label: "Technologies", value: techs.length },
];

const ProjectsPage = () => {
  const [category, setCategory] = useState(null);
  const [tech, setTech] = useState(null);
  const { hash } = useLocation();
  const target = hash.slice(1);
  const [openIds, setOpenIds] = useState(() => new Set(target ? [target] : []));
  const [lastTarget, setLastTarget] = useState(target);

  if (target !== lastTarget) {
    setLastTarget(target);
    if (target) setOpenIds((current) => new Set(current).add(target));
  }

  const toggle = (id) =>
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const list = useMemo(
    () =>
      projects.filter(
        (project) => (!category || project.category === category) && (!tech || project.tech.includes(tech)),
      ),
    [category, tech],
  );

  const filtered = category || tech;
  const clear = () => {
    setCategory(null);
    setTech(null);
  };

  return (
    <PageShell
      aside={
        <>
          <AsideBlock title="Overview" first>
            <StatGrid stats={stats} />
          </AsideBlock>
          <AsideBlock title="Category" className="hidden md:block">
            <FacetList items={categories} active={category} onSelect={setCategory} allLabel="All projects" />
          </AsideBlock>
          <AsideBlock title="Tech stack">
            <TagCloud items={techs} active={tech} onSelect={setTech} />
          </AsideBlock>
        </>
      }
    >
      <div className={bleed}>
        <SubPageHeader eyebrow={`${projects.length} entries`} title="Projects" />

        <div className="mb-4 md:hidden">
          <Tabs
            tabs={["All", ...categories.map((item) => item.value)]}
            value={category ?? "All"}
            onChange={(next) => setCategory(next === "All" ? null : next)}
            layoutId="project-filter-mobile"
          />
        </div>

        {filtered && (
          <div className="flex min-h-[37px] flex-wrap items-center justify-end gap-3 border-b border-line pb-4">
            <button type="button" onClick={clear} className={button("ghost", "-my-1 px-3 py-1 text-xs")}>
              <XIcon size={12} weight="bold" /> Clear filters
            </button>
          </div>
        )}

        <motion.ul layout className={filtered ? "" : "border-t border-line"}>
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((project, index) => (
              <motion.li
                layout
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { ...snappy, delay: index * 0.05 } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className={`border-b border-line py-7 ${target === project.id ? "animate-flash" : ""}`}
              >
                <ProjectItem project={project} open={openIds.has(project.id)} onToggle={() => toggle(project.id)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {list.length === 0 && (
          <div className="py-14 text-center">
            <p className="font-medium">No project matches these filters</p>
            <p className="mt-1 text-sm text-zinc-500">Try a different category or technology.</p>
            <button type="button" onClick={clear} className={button("outline", "mt-4")}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
};

export default ProjectsPage;
