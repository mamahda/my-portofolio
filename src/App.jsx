import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Certification from "./components/Certification";
import CertificationDetail from "./components/CertificationDetail";
import Footer from "./components/Footer";

const MotionPage = motion.div;

function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12">
      <h1 className="text-5xl font-bold text-slate-900">404</h1>
      <p className="mt-4 text-slate-600">Halaman tidak ditemukan.</p>
    </section>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="font-sans antialiased bg-white">
      <Navbar />

      <main>
        <AnimatePresence mode="wait" initial={false}>
          <MotionPage
            key={location.pathname}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Routes location={location}>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/certification" element={<Certification />} />
              <Route path="/certification/:certificationId" element={<CertificationDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MotionPage>
        </AnimatePresence>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
