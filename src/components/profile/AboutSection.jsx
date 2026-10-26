import { useLayoutEffect, useRef, useState } from "react";
import { profile } from "../../data/profile";
import Section from "../ui/Section";

const AboutSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const node = textRef.current;
    if (!node || expanded) return undefined;
    const measure = () => setClamped(node.scrollHeight - node.clientHeight > 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <Section id="about" title="About">
      <div className="relative max-w-[65ch]">
        <div
          ref={textRef}
          className={`space-y-3 text-[15px] leading-[1.75] text-pretty text-zinc-300 ${expanded ? "" : "line-clamp-4"}`}
        >
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        {clamped && !expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="absolute bottom-0 right-0 bg-ink-950 pl-1 text-[15px] leading-relaxed text-zinc-500 transition-colors before:pointer-events-none before:absolute before:inset-y-0 before:right-full before:w-12 before:bg-gradient-to-r before:from-transparent before:to-ink-950 hover:text-accent"
          >
            <span className="text-zinc-300">...</span> see more
          </button>
        )}
      </div>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <p className="text-sm font-medium text-zinc-400">Top skills</p>
        <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-zinc-200">
          {profile.topSkills.map((skill, index) => (
            <li key={skill} className="flex items-center gap-3">
              {index > 0 && <span className="size-1 rounded-full bg-zinc-600" />}
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default AboutSection;
