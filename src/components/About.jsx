import React from "react";
import { Terminal, Shield, Globe, Server } from "lucide-react";
import myPhoto from "../assets/myphoto.jpeg";

/**
 * About component that provides a summary of skills and background.
 *
 * This component includes:
 * - A profile picture and a brief bio.
 * - A grid of skills with icons and descriptions.
 * - Responsive design that adjusts for different screen sizes.
 * - Animations on scroll.
 */
const About = () => {
  // Array of skills with icons, titles, and descriptions
  const skills = [
    {
      icon: <Server size={32} />,
      title: "Backend Systems",
      desc: "Golang, TCP/HTTP Servers, SQL, & High Concurrency Systems",
    },
    {
      icon: <Shield size={32} />,
      title: "Cyber Security",
      desc: "Network Security, Linux Hardening, Penetration Testing & Cryptography",
    },
    {
      icon: <Terminal size={32} />,
      title: "Development Tools",
      desc: "Neovim (Lua Config), Git, Docker, & Linux (Arch/CachyOS)",
    },
    {
      icon: <Globe size={32} />,
      title: "Computer Network",
      desc: "TCP/IP, DNS, HTTP, and network security protocols.",
    },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-20 bg-slate-50 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Left Side: Image & Text */}
          <div className="md:w-5/12" data-aos="fade-right">
            {/* Profile Picture */}
            <div className="relative mb-8 group w-fit mx-auto md:mx-0">
              {/* Background blur effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 transform translate-x-2 translate-y-2"></div>

              <img
                src={myPhoto}
                alt="Gilbran Mahda"
                className="relative z-10 rounded-full shadow-xl w-[200px] md:max-w-xs object-cover aspect-[1/1] border-4 border-white"
              />
            </div>

            {/* About Me Section */}
            <div className="inline-block px-0 py-2 w-fit rounded-2xl4">
              <h2 className="px-4 text-3xl font-bold text-slate-900">About Me</h2>
            </div>
            <p className="px-4 text-slate-600 mb-4 leading-relaxed text-lg">
              I am an Informatics student with a strong focus on secure and efficient systems.
              Currently honing my skills in Competitive Programming and exploring the field of Cyber
              Security.
            </p>
            <p className="p-4 text-slate-600 leading-relaxed">
              My workflow revolves around <strong>CachyOS</strong> and <strong>Neovim</strong>,
              allowing me to build robust Backend systems and secure networks efficiently.
            </p>
          </div>

          {/* Right Side: Grid of Skills */}
          <div className="md:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl border border-slate-100 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden"
                style={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "0 20px 40px -5px rgba(59, 130, 246, 0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.05)")
                }
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Hover effect blob */}
                <div className="absolute -right-10 -top-10 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Skill Icon */}
                <div className="w-14 h-14 bg-blue-50/80 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm relative z-10">
                  {skill.icon}
                </div>
                {/* Skill Title */}
                <h3 className="text-xl font-bold text-slate-800 mb-2 relative z-10">
                  {skill.title}
                </h3>
                {/* Skill Description */}
                <p className="text-slate-500 text-sm leading-relaxed relative z-10">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
