import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Certification", to: "/certification" },
    { name: "Projects", to: "/projects" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const linkClassName = ({ isActive }) =>
    `font-medium transition-colors relative group ${
      isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
    }`;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 py-3 shadow-sm backdrop-blur-md backdrop-saturate-150 border-b border-slate-200/70"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-6">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-tighter"
        >
          ma<span className="text-slate-800">mahda</span>
        </Link>

        <ul className="hidden md:flex flex-1 justify-center items-center gap-5 lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.to}
                className={linkClassName}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                        isActive ? "w-full font-bold" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink to="/contact" className="hidden md:block group">
          {({ isActive }) => (
            <span
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "border-blue-600 bg-white/80 text-blue-600 shadow-sm backdrop-blur-sm"
                  : "border-blue-600 bg-blue-600 text-white hover:bg-transparent hover:text-blue-600"
              }`}
            >
              Contact
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </NavLink>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-800"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute left-0 top-full z-50 w-full border-t border-slate-100 bg-white/95 shadow-xl backdrop-blur-md">
          <ul className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block font-medium ${
                      isActive
                        ? "text-blue-600"
                        : "text-slate-600 hover:text-blue-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2 font-semibold transition-colors ${
                    isActive
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-blue-600 bg-blue-600 text-white"
                  }`
                }
              >
                Contact <ArrowRight size={16} />
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
