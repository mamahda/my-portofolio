import { BriefcaseIcon, CertificateIcon, ChatCircleDotsIcon, HouseIcon } from "@phosphor-icons/react";

export const navItems = [
  { key: "home", label: "Home", to: "/", icon: HouseIcon },
  { key: "projects", label: "Projects", to: "/projects", icon: BriefcaseIcon },
  { key: "certification", label: "Certifications", short: "Certs", to: "/certification", icon: CertificateIcon },
  { key: "contact", label: "Messaging", to: "/contact", icon: ChatCircleDotsIcon },
];

export const profileSections = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Licenses & certifications" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "volunteering", label: "Volunteering" },
  { id: "interests", label: "Interests" },
];

export const profileSectionIds = profileSections.map((section) => section.id);

export const isNavActive = (item, { pathname }) =>
  item.key === "home" ? pathname === "/" : pathname.startsWith(item.to);
