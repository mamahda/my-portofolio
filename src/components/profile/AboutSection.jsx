import { profile } from "../../data/profile";
import Section from "../ui/Section";

const AboutSection = () => {
  return (
    <Section id="about" title="About" immediate>
      <div className="max-w-[47.5em] space-y-3 text-[15px] leading-[1.6] text-pretty md:text-base md:leading-[1.75] text-zinc-300">
        {profile.about.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
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
