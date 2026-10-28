import { lazy, Suspense, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import PageShell from "./components/layout/PageShell";
import { button } from "./lib/ui";
import ProfilePage from "./pages/ProfilePage";

/* Like React.lazy, but once the chunk has been fetched the page renders directly
   instead of suspending, so a prefetched route never flashes a fallback. */
const preloadable = (factory) => {
  let Loaded = null;
  let pending = null;
  const load = () =>
    (pending ??= factory().then(
      (module) => (Loaded = module.default),
      (error) => {
        pending = null;
        throw error;
      },
    ));
  const Lazy = lazy(() => load().then(() => ({ default: Loaded })));
  const Page = (props) => (Loaded ? <Loaded {...props} /> : <Lazy {...props} />);
  Page.preload = load;
  return Page;
};

const ProjectsPage = preloadable(() => import("./pages/ProjectsPage"));
const CertificationsPage = preloadable(() => import("./pages/CertificationsPage"));
const CertificationDetailPage = preloadable(() => import("./pages/CertificationDetailPage"));
const ContactPage = preloadable(() => import("./pages/ContactPage"));
const CurrentlyVariants = preloadable(() => import("./pages/CurrentlyVariants")); // TEMPORARY

const prefetchedPages = [ProjectsPage, CertificationsPage, CertificationDetailPage, ContactPage];

/* Only shows up if a route chunk is still missing after a moment (a deep link on a slow network). */
const RouteFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <span className="route-spinner size-6 rounded-full border-2 border-zinc-700 border-t-accent" />
  </div>
);

function NotFound() {
  return (
    <PageShell>
      <section className="py-24 sm:py-32">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-zinc-50">This page does not exist</h1>
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
  // /about only redirects to /#about, so it shares home's key and doesn't trigger a second transition.
  const pageKey = location.pathname === "/about" ? "/" : location.pathname;
  const lastKey = useRef(null);
  const hashTimer = useRef();

  const scrollToHash = useCallback((hash) => {
    clearTimeout(hashTimer.current);
    let attempts = 0;
    const attempt = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (attempts++ < 15) hashTimer.current = setTimeout(attempt, 50);
    };
    attempt();
  }, []);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 300));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const id = idle(() => prefetchedPages.forEach((page) => page.preload()));
    return () => cancel(id);
  }, []);

  /* A new page is scrolled once the old one has faded out (see onExitComplete);
     here we only handle the first load and hash changes within the same page. */
  useEffect(() => {
    const firstLoad = lastKey.current === null;
    const samePage = lastKey.current === pageKey;
    lastKey.current = pageKey;
    if (!firstLoad && !samePage) return;
    if (location.hash) scrollToHash(location.hash);
    else if (samePage) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageKey, location.hash, scrollToHash]);

  useEffect(() => () => clearTimeout(hashTimer.current), []);

  const handleExitComplete = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (window.location.hash) scrollToHash(window.location.hash);
  };

  return (
    <MotionConfig reducedMotion="user">
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
          <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
            <motion.div
              key={pageKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.12, ease: "easeOut" } }}
            >
              <Suspense fallback={<RouteFallback />}>
                <Routes location={location}>
                  <Route path="/" element={<ProfilePage />} />
                  <Route path="/about" element={<Navigate to={{ pathname: "/", hash: "#about" }} replace />} />
                  <Route path="/certification" element={<CertificationsPage />} />
                  <Route path="/certification/:certificationId" element={<CertificationDetailPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/__currently" element={<CurrentlyVariants />} /> {/* TEMPORARY */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  );
}

export default App;
