import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { interests } from "../../data/interests";
import { profile } from "../../data/profile";
import { snappy } from "../../lib/motion";
import Section from "../ui/Section";
import { Tabs } from "./SkillsSection";

const tabs = ["Fields", "Toolkit"];

const InterestsSection = () => {
  const [tab, setTab] = useState(tabs[0]);

  return (
    <Section id="interests" title="Interests">
      <Tabs tabs={tabs} value={tab} onChange={setTab} layoutId="interests-tab" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={snappy}
        >
          {tab === "Fields" && (
            <ul className="mt-5 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {interests.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex gap-3.5">
                  <Icon size={22} className="mt-0.5 shrink-0 text-accent" />
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium leading-snug text-zinc-100">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {tab === "Toolkit" && (
            <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
              {profile.toolkit.map((tool) => (
                <li key={tool.name} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <p className="text-[15px] text-zinc-100">{tool.name}</p>
                  <p className="truncate text-right text-xs text-zinc-500">{tool.note}</p>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default InterestsSection;
