import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

export const profile = {
  name: "Gilbran Mahda",
  handle: "mamahda",
  pronouns: "He/Him",
  headline:
    "Informatics Engineering Student at ITS | Backend Engineering, DevOps, Networking & Cyber Security",
  location: "Surabaya, East Java, Indonesia",
  coordinates: "-7.2819, 112.7950",
  photo: "/images/myphoto.jpeg",
  email: "gilmavira@gmail.com",
  cv: "https://its.id/m/cvmahda",
  site: "https://mamahda-portofolio.vercel.app",
  openTo: {
    title: "Open to internships",
    roles: "Backend Engineer, DevOps Engineer, Network & Security roles",
  },
  about: [
    "I am an Informatics Engineering student at Institut Teknologi Sepuluh Nopember (ITS) with a strong interest in Backend Engineering, DevOps, Networking, and Cybersecurity. I enjoy building reliable systems, automating workflows, and exploring secure infrastructure technologies.",
    "My workflow revolves around CachyOS and Neovim, allowing me to build robust backend systems and secure networks efficiently.",
  ],
  topSkills: ["Go", "Laravel", "Docker", "Linux", "Networking"],
  education: [
    {
      school: "Institut Teknologi Sepuluh Nopember (ITS)",
      short: "ITS",
      degree: "Bachelor's degree, Informatics Engineering",
      period: "2024 - Present",
      location: "Surabaya, Indonesia",
    },
  ],
  experience: [
    {
      org: "Networking Technology & Intelligent Cybersecurity Laboratory",
      roles: [
        {
          title: "Laboratory Administrator",
          start: "2026-06",
          end: null,
        },
      ],
    },
    {
      org: "Institut Teknologi Sepuluh Nopember (ITS)",
      roles: [
        {
          title: "Teaching Assistant",
          start: "2026-01",
          end: null,
        },
      ],
    },
    {
      org: "Himpunan Mahasiswa Teknik Computer-Informatika ITS",
      location: "Surabaya, East Java, Indonesia",
      roles: [
        {
          title: "Staff of External Affairs",
          type: "Contract",
          start: "2026-03",
          end: null,
        }
      ],
    },
    {
      org: "IRIS ITS",
      location: "Surabaya, East Java, Indonesia",
      roles: [
        {
          title: "Programmer Internship",
          type: "Internship",
          start: "2024-10",
          end: "2024-11",
        },
      ],
    },
  ],
  volunteering: [
    {
      org: "Schematics ITS",
      roles: [
        {
          title: "Deputy Director of Branding and Marketing",
          start: "2026-01",
          end: null,
        },
        {
          title: "Staff of Branding and Marketing",
          start: "2025-03",
          end: "2025-12",
        }
      ],
    },
    {
      org: "INI LHO ITS!",
      roles: [
        { 
          title: "Director of Media Creative at Wengker ITS", 
          start: "2025-10", 
          end: "2026-02" 
        },
        { 
          title: "Staff of Media Creative at Wengker ITS", 
          start: "2024-11", 
          end: "2025-02" 
        },
      ],
    },
  ],
  socials: [
    {
      name: "GitHub",
      handle: "mamahda",
      url: "https://github.com/mamahda",
      action: "Follow",
      icon: GithubLogoIcon,
    },
    {
      name: "LinkedIn",
      handle: "gilbran-mahda",
      url: "https://www.linkedin.com/in/gilbran-mahda/",
      action: "Connect",
      icon: LinkedinLogoIcon,
    },
    {
      name: "Instagram",
      handle: "@gbrn.mhd",
      url: "https://instagram.com/gbrn.mhd",
      action: "Follow",
      icon: InstagramLogoIcon,
    },
  ],
  toolkit: [
    { name: "CachyOS", note: "Daily driver operating system" },
    { name: "Neovim", note: "Primary code editor" },
    { name: "Docker", note: "Containers" },
    { name: "GitHub Actions", note: "CI/CD pipelines" },
    { name: "Microsoft Azure", note: "Cloud platform" },
    { name: "Git", note: "Version control" },
  ],
};

export const skills = [
  { name: "Go (Golang)", group: "Backend", uses: ["Go (Golang)"] },
  { name: "Laravel", group: "Backend", uses: ["Laravel"] },
  { name: "PHP", group: "Backend", uses: ["PHP"] },
  { name: "REST APIs", group: "Backend", uses: ["HTTP", "Laravel", "Go (Golang)"] },
  { name: "MySQL", group: "Backend", uses: ["MySQL"] },
  { name: "JWT Authentication", group: "Backend", uses: ["JWTAuth"] },
  { name: "TypeScript", group: "Frontend", uses: ["TypeScript"] },
  { name: "JavaScript", group: "Frontend", uses: ["Javascript"] },
  { name: "React", group: "Frontend", uses: ["ReactJS"] },
  { name: "Tailwind CSS", group: "Frontend", uses: ["Tailwind"] },
  { name: "Docker", group: "DevOps", uses: [] },
  { name: "GitHub Actions", group: "DevOps", uses: [] },
  { name: "CI/CD Pipelines", group: "DevOps", uses: [] },
  { name: "Linux Administration", group: "DevOps", uses: [] },
  { name: "Microsoft Azure", group: "DevOps", uses: [] },
  { name: "TCP/IP", group: "Networking", uses: [] },
  { name: "DNS & HTTP/HTTPS", group: "Networking", uses: [] },
  { name: "Routing", group: "Networking", uses: [] },
  { name: "Network Security", group: "Security", uses: [] },
  { name: "Linux Hardening", group: "Security", uses: [] },
];
