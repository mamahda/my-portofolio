import React from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { ChevronRight, Github, Linkedin, Instagram } from "lucide-react";

const Hero = () => {
  const socials = [
    { icon: <Github size={24} />, href: "https://github.com/", label: "GitHub" },
    { icon: <Linkedin size={24} />, href: "https://linkedin.com/", label: "LinkedIn" },
    { icon: <Instagram size={24} />, href: "https://instagram.com/", label: "Instagram" },
  ];

  return (
    // Class snap-start sudah dihapus dari sini
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white"
    >
      {/* Background Gradient Blob */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -z-10 opacity-60"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1 mb-6 border border-blue-100 bg-blue-50/50 text-blue-600 text-sm font-semibold tracking-wider rounded-full">
            INFORMATICS STUDENT
          </div>
          {/* PERUBAHAN NAMA DI SINI */}
          <h1 className="text-6xl md:text-8xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
            <span className="text-slate-900">Gilbran </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 relative inline-block z-10">
              {" "}
              Mahda
            </span>
          </h1>
          <p className="text-slate-600 text-lg mb-8 max-w-lg leading-relaxed">
            Focusing on Backend development with Go, IoT Systems, and performance optimization using
            the Linux ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#2563eb",
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "1rem",
                padding: "12px 32px",
                boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
                "&:hover": {
                  bgcolor: "#1d4ed8",
                  boxShadow: "0 20px 30px -10px rgba(37, 99, 235, 0.5)",
                },
              }}
              endIcon={<ChevronRight />}
              href="#portfolio"
            >
              View Projects
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "#1e293b",
                borderColor: "#cbd5e1",
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "1rem",
                padding: "12px 32px",
                borderWidth: "1.5px",
                "&:hover": { borderColor: "#2563eb", color: "#2563eb", bgcolor: "transparent" },
              }}
              href="#contact"
            >
              Contact Me
            </Button>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-6">
            <span className="text-slate-400 text-sm font-medium">Follow me:</span>
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
        </motion.div>

        {/* Visual Element: Terminal */}
        <motion.div
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
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
