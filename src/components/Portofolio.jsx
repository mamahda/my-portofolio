import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@mui/material";
import portfolioImage from "../assets/portofolio.png";
import vpImage from "../assets/vp.png";
import tcanteenImage from "../assets/tcanteen.png";

const Portfolio = () => {
  const projects = [
    {
      title: "Victoria Property",
      category: "backend development",
      tech: ["Go (Golang)", "HTTP", "JWTAuth"],
      desc: "Built a scalable backend system using Go (Golang), developed RESTful APIs, and managed the database to ensure efficient and reliable property data management.",
      repo: "https://github.com/mamahda/vp_backend",
      status: "Under Development",
      image: vpImage,
    },
    {
      title: "TCanteen",
      category: "Backend Development",
      tech: ["Laravel", "PHP", "MySQL"],
      desc: "Built a scalable backend system using Laravel, developed RESTful APIs, and managed the database to ensure efficient and reliable property data management.",
      repo: "https://github.com/mamahda/tcanteen-backend",
      status: "Not Deployed",
      image: tcanteenImage,
    },
    {
      title: "Portofolio Website",
      category: "Web Development",
      tech: ["Javascript", "ReactJS", "Tailwind"],
      desc: "Developed a personal portfolio website to showcase projects, skills, and professional experience in a structured and visually clear manner.",
      repo: "https://github.com/mamahda/my-portofolio",
      live: "https://your-live-portfolio-url.com", // Placeholder
      image: portfolioImage,
    },
  ];

  return (
    <section id="portfolio" className="min-h-screen flex items-center py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-16 flex flex-col items-center text-center" data-aos="fade-up">
          <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase mb-2">
            My Work
          </span>
          <h2 className="text-4xl font-bold text-slate-900">Featured Projects</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-3xl bg-white border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-2"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(37, 99, 235, 0.25)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)")
              }
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="h-56 bg-slate-50 relative overflow-hidden group-hover:shadow-inner flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-bold text-4xl text-slate-200 group-hover:text-blue-200 transition-colors">
                    {project.title
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </span>
                )}
              </div>

              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-6 text-sm line-clamp-3 leading-relaxed">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white text-slate-500 text-xs font-medium border border-slate-200 rounded-lg shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Github size={18} />}
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderRadius: "12px",
                      textTransform: "none",
                      borderColor: "#e2e8f0",
                      color: "#64748b",
                      flex: 1,
                      "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                    }}
                  >
                    Repo
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={project.live ? <ExternalLink size={18} /> : null}
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={!project.live && !project.status}
                    sx={{
                      borderRadius: "12px",
                      textTransform: "none",
                      bgcolor: project.live ? "#eff6ff" : "#f1f5f9",
                      color: project.live ? "#2563eb" : "#94a3b8",
                      boxShadow: "none",
                      flex: 1,
                      "&:hover": project.live
                        ? {
                            bgcolor: "#2563eb",
                            color: "white",
                            boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
                          }
                        : {},
                      "&.Mui-disabled": {
                        bgcolor: "#f1f5f9",
                        color: "#94a3b8",
                      },
                    }}
                  >
                    {project.status ? project.status : project.live ? "View Live" : "Coming Soon"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
