import { PROJECT_STATUS } from "../lib/projectStatus";

/* Every project comes out with the same shape. Optional fields are null instead of missing
   or holding placeholder text, so components can simply check `project.image` / `project.live`.

   - image:       path under /public, or null when there is no screenshot yet
   - live:        public URL, or null
   - repo:        public repository URL, or null
   - privateRepo: true when the code exists but can't be shared
   - tech:        use the same names as `skills` in profile.js so the Skills section links them */
const defineProject = ({ image = null, live = null, repo = null, privateRepo = false, tech = [], ...rest }) => {
  const project = { ...rest, tech, image, live, repo: privateRepo ? null : repo, privateRepo };

  if (import.meta.env.DEV) {
    if (image && !image.startsWith("/")) console.warn(`[projects] ${project.id}: image must be a path or null`);
    if (!PROJECT_STATUS[project.status]) console.warn(`[projects] ${project.id}: unknown status "${project.status}"`);
  }

  return project;
};

export const projects = [
  {
    id: "iox-adventure-club",
    title: "IOX Adventure Club",
    category: "Backend Development",
    tech: ["Java", "Spring Boot", "PostgreSQL", "REST APIs"],
    desc: "Building the Spring Boot backend for a 4WD adventure club's off-road event app: the REST API for live GPS tracking and photo-verified checkpoints, an admin monitoring console, and its integration with the Android app.",
    privateRepo: true,
    status: "in-progress",
    image: "/images/project/iox.webp"
  },
  {
    id: "advise-dast",
    title: "Advise DAST",
    category: "Fullstack Development",
    tech: ["Laravel", "PHP", "React", "TypeScript", "Inertia.js", "Tailwind CSS", "MySQL"],
    desc: "Building the web control plane of ADVISE, a Dynamic Application Security Testing (DAST) platform: scan targets and scope, scan setup and monitoring, and a review flow for detected vulnerabilities, with Laravel, Inertia and React.",
    privateRepo: true,
    status: "in-progress",
    image: "/images/project/advise.webp"
  },
  {
    id: "jcc",
    title: "Jatim Cyber Security Competition 2026",
    category: "Infrastructure Engineering",
    tech: ["Kubernetes", "Docker", "GZCTF", "GitHub Actions"],
    desc: "Deployed the GZCTF competition platform for JCC 2026, East Java's CTF competition, and ran the challenge instancer that spins up an isolated container per team for dynamic jeopardy and attack-defense challenges.",
    repo: "https://github.com/arsitektur-jaringan-komputer/jcc-2026",
    status: "not-deployed",
    image: "/images/project/JCC.webp",
  },
  {
    id: "gerigi-x-ukm-expo",
    title: "Gerigi X UKM Expo ITS",
    category: "Fullstack Development",
    tech: ["TypeScript", "React", "Tailwind CSS", "Convex"],
    desc: "Built GEREX 2026, the official portal for new ITS students, with the Survival Kit guide, Maba 101, a campus map, and a directory of student clubs (UKM), handling the traffic of the university's orientation period.",
    privateRepo: true,
    status: "live",
    live: "https://gerigixukmexpoits.id",
    image: "/images/project/gerex.webp",
  },
  {
    id: "victoria-property",
    title: "Victoria Property",
    category: "Backend Development",
    tech: ["Go (Golang)", "REST APIs", "JWT Authentication"],
    desc: "Building the Go REST API for a property listing platform, including JWT-based authentication and the database layer for property data.",
    privateRepo: true,
    status: "in-progress",
    image: "/images/project/vp.webp",
  },
  {
    id: "tcanteen",
    title: "TCanteen",
    category: "Backend Development",
    tech: ["Laravel", "PHP", "MySQL", "REST APIs"],
    desc: "Built the REST API for a campus canteen ordering system with Laravel 12 and Sanctum: menu management, cart, orders, and role-based access for admins and customers. Web Programming class project.",
    repo: "https://github.com/mamahda/tcanteen-backend",
    status: "not-deployed",
    image: "/images/project/tcanteen.webp",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "Frontend Development",
    tech: ["JavaScript", "React", "Vite", "Tailwind CSS", "Framer Motion"],
    desc: "Designed and built this LinkedIn-style portfolio with React and Vite, featuring search across projects, certifications and skills, spring-based animations, and a contact form powered by EmailJS.",
    repo: "https://github.com/mamahda/my-portofolio",
    status: "live",
    live: "https://mamahda.vercel.app/",
    image: "/images/project/portofolio.webp",
  },
].map(defineProject);
