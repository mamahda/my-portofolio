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
    tech: ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "Docker Compose", "Caddy", "GitHub Actions"],
    desc: "Building the Spring Boot backend for a 4WD adventure club's off-road event app, including the REST API for live GPS tracking and photo-verified checkpoints, an admin monitoring console, and its integration with the Android app. Wrote 145 automated tests for it and deployed it to a VPS with Docker Compose behind a Caddy reverse proxy with automatic HTTPS, using images built by GitHub Actions.",
    privateRepo: true,
    status: "in-progress",
    image: "/images/project/iox.webp"
  },
  {
    id: "advise-dast",
    title: "Advise DAST",
    category: "Fullstack Development",
    tech: ["Laravel", "PHP", "React", "TypeScript", "Inertia.js", "Tailwind CSS", "MySQL"],
    desc: "Building the scan module of ADVISE, a team-built Dynamic Application Security Testing (DAST) platform. It covers scan CRUD, a step-by-step create wizard, and scan pages with a dashboard, an endpoints list, start/stop controls and a vulnerability side panel. Also wrote a dummy crawler that simulates scan runs for demo data, and applied the team's design system across the frontend.",
    privateRepo: true,
    status: "in-progress",
    image: "/images/project/advise.webp"
  },
  {
    id: "jcc",
    title: "Jatim Cyber Security Competition 2026",
    category: "Infrastructure Engineering",
    tech: ["Kubernetes", "Docker", "GZCTF", "GitHub Actions"],
    desc: "Deployed the GZCTF competition platform on Kubernetes for JCC 2026, East Java's CTF competition with 400 teams. Ran the challenge instancer that spins up an isolated container per team for dynamic jeopardy and attack-defense challenges.",
    repo: "https://github.com/arsitektur-jaringan-komputer/jcc-2026",
    status: "not-deployed",
    image: "/images/project/JCC.webp",
  },
  {
    id: "quadrathlon-ctf",
    title: "Quadrathlon CTF 2026",
    category: "Infrastructure Engineering",
    tech: ["Docker", "rCTF", "Linux"],
    desc: "Deployed the rCTF competition platform for Quadrathlon CTF 2026 with Docker, then imported and tested all 10 challenges before release. Each team got its own challenge instances on isolated networks with outbound access blocked, each lasting 30 minutes, up to three per team.",
    repo: "https://github.com/mamahda/rctf",
    status: "not-deployed",
    image: "/images/project/quadrathlon.png"
  },
  {
    id: "gerigi-x-ukm-expo",
    title: "Gerigi X UKM Expo ITS",
    category: "Frontend Development",
    tech: ["TypeScript", "React", "Tailwind CSS", "Convex", "Shadcn UI", "Framer Motion", "Vite"],
    desc: "Contributed to GEREX 2026, the official portal for about 7,000 new ITS students, with the Survival Kit guide, Maba 101, a campus map and a directory of student clubs (UKM). Built the site's navbar and footer, and the Gema Karsa announcement page where students search for their result and see an accepted or rejected view.",
    privateRepo: true,
    status: "live",
    live: "https://gerigixukmexpoits.id",
    image: "/images/project/gerex.webp",
  },
  {
    id: "victoria-property",
    title: "Victoria Property",
    category: "Backend Development",
    tech: ["Go (Golang)", "Gin", "MySQL", "JWT Authentication", "REST APIs"],
    desc: "Co-built the Go REST API for a property listing platform with a teammate, using Clean Architecture (handler, service and repository layers). Handled the project setup and database connection, register and login with JWT and bcrypt password hashing, the JWT and admin-only middleware, the user profile endpoint, and a consistent JSON response format.",
    privateRepo: true,
    status: "not-deployed",
    image: "/images/project/vp.webp",
  },
  {
    id: "tcanteen",
    title: "TCanteen",
    category: "Backend Development",
    tech: ["Laravel", "PHP", "MySQL", "REST APIs"],
    desc: "Built the REST API for a campus canteen ordering system with Laravel 12 and Sanctum, covering menu management, cart, orders, and role-based access for admins and customers. This was a project for the Web Programming class.",
    repo: "https://github.com/mamahda/tcanteen-backend",
    status: "not-deployed",
    image: "/images/project/tcanteen.webp",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "Frontend Development",
    tech: ["JavaScript", "React", "Vite", "Tailwind CSS", "Framer Motion"],
    desc: "Designed and built this LinkedIn-style portfolio with React and Vite. It has search across projects, certifications and skills, spring-based animations, and a contact form powered by EmailJS.",
    repo: "https://github.com/mamahda/my-portofolio",
    status: "live",
    live: "https://mamahda.vercel.app/",
    image: "/images/project/portofolio.webp",
  },
  {
    id: "cli-chat-server",
    title: "CLI Chat Server",
    category: "Network Programming",
    tech: ["C++", "TCP/IP"],
    desc: "Built a multi-client terminal chat in C++ over TCP with POSIX sockets. The server runs each client on its own thread, protects shared state with mutexes, broadcasts every message, and replays the chat history to new clients. The client sends and receives on separate threads.",
    repo: "https://github.com/mamahda/cli-chat-server",
    status: "not-deployed",
    image: "/images/project/chat-server.webp",
  },
  {
    id: "tetris",
    title: "Terminal Tetris",
    category: "Game Development",
    tech: ["C++"],
    desc: "Built a terminal Tetris game in C++ with non-blocking keyboard input (termios and fcntl) and a high score saved to a file. The code is split into map, piece and high-score modules.",
    repo: "https://github.com/mamahda/tetris",
    status: "not-deployed",
    image: "/images/project/tetris.webp",
  },
  {
    id: "flappy-bird",
    title: "Terminal Flappy Bird",
    category: "Game Development",
    tech: ["C++"],
    desc: "Built a terminal Flappy Bird game in C++ with gravity, obstacles, scoring and levels that speed up as the score grows, in separate Linux (termios) and Windows (conio) builds.",
    repo: "https://github.com/mamahda/flappy-bird",
    status: "not-deployed",
    image: "/images/project/flappy-bird.webp",
  },
].map(defineProject);
