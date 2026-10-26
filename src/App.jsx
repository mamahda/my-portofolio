import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import PageShell from "./components/layout/PageShell";
import { button } from "./lib/ui";
import CertificationDetailPage from "./pages/CertificationDetailPage";
import CertificationsPage from "./pages/CertificationsPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectsPage";

function NotFound() {
  return (
    <PageShell>
      <section className="py-24 sm:py-32">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50">This page does not exist</h1>
        <p className="mt-2 text-sm text-zinc-500">The link might be broken, or the page may have moved.</p>
        <Link to="/" className={button("primary", "mt-6")}>
          Go to profile
        </Link>
      </section>
    </PageShell>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return undefined;
    }

    let attempts = 0;
    let timer;
    const scrollToHash = () => {
      const target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (attempts++ < 12) timer = setTimeout(scrollToHash, 60);
    };
    timer = setTimeout(scrollToHash, 60);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-[100dvh]">
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
        }}
        className="fixed left-4 top-2 z-[70] -translate-y-16 rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink-950 transition-transform focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />

      <main id="main" tabIndex={-1} className="outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<ProfilePage />} />
              <Route path="/about" element={<Navigate to={{ pathname: "/", hash: "#about" }} replace />} />
              <Route path="/certification" element={<CertificationsPage />} />
              <Route path="/certification/:certificationId" element={<CertificationDetailPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
