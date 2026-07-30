import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@mui/material";
import { projects } from "../data/projects";

const MotionCard = motion.article;

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % projects.length);
  };

  const project = projects[activeIndex];

  return (
    <section className="relative h-screen overflow-hidden bg-white px-4 pb-24 pt-24 sm:px-6 lg:px-12">
      <div className="container mx-auto flex h-full min-h-0 flex-col">
        <div className="shrink-0 text-center">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Featured Projects</h1>
          <div className="mt-8 h-px w-full bg-slate-200" />
        </div>

        <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col justify-center">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <MotionCard
                key={project.title}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid min-h-[25rem] grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-2"
              >
                <div className="h-56 bg-slate-50 md:h-full">
                  <img src={project.image} alt={project.title} className="h-full w-full object-contain p-4 md:p-8" />
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <span className="mb-4 w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                    {project.category}
                  </span>
                  <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">{project.title}</h2>
                  <p className="mb-5 text-sm leading-relaxed text-slate-600">{project.desc}</p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tech.map((technology) => (
                      <span key={technology} className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500">
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Github size={18} />}
                      href={project.privateRepo ? undefined : project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      disabled={project.privateRepo}
                      sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        borderColor: "#e2e8f0",
                        color: "#64748b",
                        flex: 1,
                        "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                        "&.Mui-disabled": { borderColor: "#e2e8f0", bgcolor: "#f1f5f9", color: "#94a3b8" },
                      }}
                    >
                      {project.privateRepo ? "Confidential" : "Repo"}
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={project.live ? <ExternalLink size={18} /> : null}
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      disabled={Boolean(project.status) || !project.live}
                      sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        bgcolor: project.live && !project.status ? "#eff6ff" : "#f1f5f9",
                        color: project.live && !project.status ? "#2563eb" : "#94a3b8",
                        boxShadow: "none",
                        flex: 1,
                        "&:hover": project.live && !project.status ? { bgcolor: "#2563eb", color: "white" } : {},
                        "&.Mui-disabled": { bgcolor: "#f1f5f9", color: "#94a3b8", cursor: "not-allowed" },
                      }}
                    >
                      {project.status || (project.live ? "View Live" : "Coming Soon")}
                    </Button>
                  </div>
                </div>
              </MotionCard>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={showPrevious}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-blue-600 hover:text-blue-600"
              aria-label="Previous project"
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <span className="text-sm font-medium text-slate-400">
              {activeIndex + 1} / {projects.length}
            </span>
            <button
              type="button"
              onClick={showNext}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-blue-600"
              aria-label="Next project"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
