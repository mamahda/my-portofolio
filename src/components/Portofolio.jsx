import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@mui/material';

const Portfolio = () => {
  const projects = [
    {
      title: "Virtual Farm Units (VFU)",
      category: "IoT & AI Integration",
      tech: ["Python", "Computer Vision", "IoT"],
      desc: "Integrated urban farming system using AI and Computer Vision for automated monitoring."
    },
    {
      title: "KDE Plasma Widget",
      category: "Desktop Customization",
      tech: ["QML", "JavaScript", "C++"],
      desc: "Developing custom system monitor widget for KDE Plasma desktop environment, focusing on aesthetics and lightweight performance."
    },
    {
      title: "High-Performance Server",
      category: "Backend Development",
      tech: ["Go (Golang)", "TCP", "HTTP"],
      desc: "Implementation of efficient TCP and HTTP handlers using Go, designed to handle high concurrency."
    },
  ];

  return (
    <section id="portfolio" className="min-h-screen flex items-center py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-16 flex flex-col items-center text-center" data-aos="fade-up">
           <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase mb-2">My Work</span>
          <h2 className="text-4xl font-bold text-slate-900">Featured Projects</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-3xl bg-white border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-2"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(37, 99, 235, 0.25)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)"}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="h-56 bg-slate-50 relative overflow-hidden group-hover:shadow-inner flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 {/* Initials as Placeholder */}
                 <span className="font-bold text-4xl text-slate-200 group-hover:text-blue-200 transition-colors">
                    {project.title.split(' ').map(n => n[0]).join('').substring(0,2)}
                 </span>
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
                    <span key={i} className="px-3 py-1 bg-white text-slate-500 text-xs font-medium border border-slate-200 rounded-lg shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Github size={18}/>}
                    sx={{
                      borderRadius: '12px',
                      textTransform: 'none',
                      borderColor: '#e2e8f0',
                      color: '#64748b',
                      flex: 1,
                      '&:hover': { borderColor: '#cbd5e1', bgcolor: '#f8fafc' }
                    }}
                  >
                    Repo
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<ExternalLink size={18}/>}
                    sx={{
                      borderRadius: '12px',
                      textTransform: 'none',
                      bgcolor: '#eff6ff',
                      color: '#2563eb',
                      boxShadow: 'none',
                      flex: 1,
                      '&:hover': { bgcolor: '#2563eb', color: 'white', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }
                    }}
                  >
                    Details
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
