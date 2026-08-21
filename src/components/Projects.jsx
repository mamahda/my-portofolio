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
    <section className="relative h-dvh overflow-hidden bg-white px-4 pb-5 pt-20 sm:px-6 sm:pb-10 sm:pt-24 lg:px-12 lg:pb-20 lg:pt-36">
      <div className="container mx-auto flex h-full min-h-0 flex-col">
        {/* <div className="shrink-0 text-center">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Featured Projects</h1>
          <div className="mt-8 h-px w-full bg-slate-200" />
        </div> */}

        <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col justify-center xl:max-w-7xl">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <MotionCard
                key={project.title}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:min-h-[25rem] md:grid-cols-2 xl:min-h-[29rem]"
              >
                <div className="aspect-video bg-slate-50 md:h-full md:aspect-auto">
                  <img src={project.image} alt={project.title} className="h-full w-full object-contain p-3 md:p-5" />
                </div>

                <div className="flex flex-col justify-center p-4 sm:p-6 md:p-8">
                  <span className="mb-3 w-fit rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
                    {project.category}
                  </span>
                  <h2 className="mb-2 text-2xl font-bold leading-tight text-slate-900 sm:mb-3 sm:text-3xl md:text-4xl">
                    {project.title}
                  </h2>
                  <p className="mb-4 text-xs leading-relaxed text-slate-600 sm:mb-5 sm:text-sm">{project.desc}</p>
                  <div className="mb-4 flex flex-wrap gap-1.5 sm:mb-6 sm:gap-2">
                    {project.tech.map((technology) => (
                      <span key={technology} className="rounded-lg border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-500 sm:px-3 sm:py-1 sm:text-xs">
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
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        padding: { xs: "6px 10px", sm: "7px 12px" },
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
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        padding: { xs: "6px 10px", sm: "7px 12px" },
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

          <div className="mt-4 flex items-center justify-between sm:mt-8">
            <button
              type="button"
              onClick={showPrevious}
              className="inline-flex w-28 items-center justify-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-blue-600 hover:text-blue-600 sm:w-32 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
              aria-label="Previous project"
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <span className="text-xs font-medium text-slate-400 sm:text-sm">
              {activeIndex + 1} / {projects.length}
            </span>
            <button
              type="button"
              onClick={showNext}
              className="inline-flex w-28 items-center justify-center gap-1.5 rounded-xl border border-blue-600 bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-transparent hover:text-blue-600 sm:w-32 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
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
