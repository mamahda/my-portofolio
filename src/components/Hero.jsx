import React from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ChevronRight, Github, Linkedin, Instagram, ExternalLink } from "lucide-react";

/**
 * Hero component for the website's homepage.
 *
 * This component serves as the main introduction on the website, featuring:
 * - A prominent headline with the user's name.
 * - A brief description of the user's professional interests.
 * - Call-to-action buttons for viewing a CV and learning more about the profile.
 * - Social media links for professional networking.
 * - A decorative, non-interactive terminal animation on larger screens.
 * - Responsive design that adjusts the layout for different screen sizes.
 */
const Hero = () => {
  const MotionDiv = motion.div;

  // Array of social media links
  const socials = [
    { icon: <Github size={24} />, href: "https://github.com/mamahda", label: "GitHub" },
    {
      icon: <Linkedin size={24} />,
      href: "https://linkedin.com/in/gilbran-mahda",
      label: "LinkedIn",
    },
    { icon: <Instagram size={24} />, href: "https://instagram.com/gbrn.mhd", label: "Instagram" },
  ];

  return (
    <section className="relative flex h-dvh items-center justify-center overflow-hidden bg-white px-4 pb-6 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-12">
      {/* Background Gradient Blob */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -z-10 opacity-60"></div>

      <div className="container mx-auto grid h-full min-h-0 items-center gap-8 overflow-y-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-12 md:overflow-visible md:pl-12 md:pr-0 md:grid-cols-2">
        {/* Left Column: Text Content */}
        <MotionDiv
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-0 py-4 md:py-0"
        >
          <div className="mb-4 inline-block rounded-full border border-blue-100 bg-blue-50/50 px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 sm:mb-6 sm:px-4 sm:text-sm">
            Teknik Informatika - ITS
          </div>
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:mb-6 sm:text-6xl md:text-8xl">
            <span className="text-slate-900">Gilbran </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 relative inline-block z-10">
              {" "}
              Mahda
            </span>
          </h1>
          <p className="mb-5 max-w-lg text-base leading-relaxed text-slate-600 sm:mb-8 sm:px-2 sm:text-lg">
            Enthusiastic student with a strong interest in computer science and engineering.
          </p>

          {/* Call-to-action Buttons */}
          <div className="mb-6 flex flex-col gap-3 sm:mb-10 sm:gap-4 sm:flex-row">
            <Button
              variant="contained"
              size="large"
              href="https://its.id/m/cvmahda"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: "#2563eb",
                borderRadius: "12px",
                textTransform: "none",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                padding: { xs: "10px 20px", sm: "12px 32px" },
                boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
                "&:hover": {
                  bgcolor: "#1d4ed8",
                  boxShadow: "0 20px 30px -10px rgba(37, 99, 235, 0.5)",
                },
              }}
              endIcon={<ExternalLink size={18} />}
            >
              View CV
            </Button>
            <Button
              component={Link}
              to="/about"
              variant="outlined"
              size="large"
              sx={{
                color: "#1e293b",
                borderColor: "#cbd5e1",
                borderRadius: "12px",
                textTransform: "none",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                padding: { xs: "10px 20px", sm: "12px 32px" },
                borderWidth: "1.5px",
                "&:hover": { borderColor: "#2563eb", color: "#2563eb", bgcolor: "transparent" },
              }}
              endIcon={<ChevronRight />}
            >
              Get to Know Me
            </Button>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-slate-400 text-sm font-medium">Let's Connect:</span>
            <div className="flex gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-600 transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </MotionDiv>

        {/* Right Column: Visual Element (Terminal) */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:flex justify-end p-10"
          style={{ marginRight: "50px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-cyan-300 rounded-full blur-[60px] opacity-40 animate-pulse"></div>

          <div className="relative w-96 h-80 bg-slate-900 border border-slate-700 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            <div className="h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-6 font-mono text-sm text-slate-300">
              <p>
                <span className="text-green-400">user@cachyos</span>:<span>~</span>$ nvim main.go
              </p>
              <p className="mt-2 text-blue-400">package main</p>
              <p className="mt-2">func main() {"{"}</p>
              <p className="pl-4">fmt.Println("Hello World")</p>
              <p>{"}"}</p>
              <p className="mt-2 animate-pulse">_</p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Hero;
