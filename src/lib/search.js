import { certifications } from "../data/certifications";
import { projects } from "../data/projects";
import { skills } from "../data/profile";

const index = [
  ...projects.map((project) => ({
    type: "Projects",
    title: project.title,
    meta: project.category,
    to: `/projects#${project.id}`,
    image: project.image,
    keywords: [project.title, project.category, ...project.tech].join(" ").toLowerCase(),
  })),
  ...certifications.map((certification) => ({
    type: "Certifications",
    title: certification.title,
    meta: `${certification.issuer} · ${certification.year}`,
    to: `/certification/${certification.id}`,
    image: certification.logoLabel,
    keywords: [certification.title, certification.issuer, certification.field, ...(certification.skills ?? [])]
      .join(" ")
      .toLowerCase(),
  })),
  ...skills.map((skill) => ({
    type: "Skills",
    title: skill.name,
    meta: skill.group,
    to: "/#skills",
    keywords: [skill.name, skill.group, ...skill.uses].join(" ").toLowerCase(),
  })),
];

export const searchGroups = ["Projects", "Certifications", "Skills"];

export const suggestions = ["Go", "Laravel", "React", "Docker", "HackerRank"];

export const search = (query) => {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return index.filter((entry) => terms.every((term) => entry.keywords.includes(term))).slice(0, 9);
};
