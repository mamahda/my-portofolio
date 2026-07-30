import { Globe, Server, Shield, Terminal } from "lucide-react";

const skills = [
  {
    icon: <Server size={32} />,
    title: "Backend Engineering",
    desc: "Golang, REST APIs, MySQL, Laravel, and scalable backend system development.",
  },
  {
    icon: <Shield size={32} />,
    title: "Cyber Security",
    desc: "Network Security, Linux Hardening, System Security, and Security Fundamentals.",
  },
  {
    icon: <Terminal size={32} />,
    title: "DevOps & Cloud",
    desc: "Docker, GitHub Actions, Azure, CI/CD Pipelines, and Linux Administration.",
  },
  {
    icon: <Globe size={32} />,
    title: "Networking",
    desc: "TCP/IP, DNS, HTTP/HTTPS, Routing, and Network Infrastructure Fundamentals.",
  },
];

const About = () => {
  return (
    <section className="flex min-h-screen items-center bg-white px-4 py-24 sm:px-6 lg:px-24">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <div className="w-full lg:w-5/12">
            <div className="relative mb-7 w-fit group mx-auto lg:mx-0">
              <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-400 blur-xl opacity-30 transition-opacity duration-500 group-hover:opacity-50" />
              <img
                src="/images/myphoto.jpeg"
                alt="Gilbran Mahda"
                className="relative z-10 aspect-square w-40 rounded-full border-4 border-white object-cover shadow-xl sm:w-48"
              />
            </div>

            <h1 className="px-1 text-3xl font-bold text-slate-900">About Me</h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              I am an Informatics Engineering student at Institut Teknologi Sepuluh Nopember (ITS)
              with a strong interest in Backend Engineering, DevOps, Networking, and Cybersecurity.
              I enjoy building reliable systems, automating workflows, and exploring secure
              infrastructure technologies.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              My workflow revolves around <strong>CachyOS</strong> and <strong>Neovim</strong>,
              allowing me to build robust Backend systems and secure networks efficiently.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:w-7/12">
            {skills.map((skill) => (
              <article
                key={skill.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  {skill.icon}
                </div>
                <h2 className="text-lg font-bold text-slate-800">{skill.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{skill.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
