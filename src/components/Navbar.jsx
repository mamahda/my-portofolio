import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

/**
 * Navbar component for the website.
 *
 * This component provides a responsive navigation bar that includes:
 * - A logo that links to the homepage.
 * - Desktop navigation links that are visible on medium screens and larger.
 * - A mobile menu button that toggles a dropdown menu on smaller screens.
 * - The navbar changes its appearance on scroll.
 * - Active navigation links are highlighted based on the current scroll position.
 */
const Navbar = () => {
  // State to track if the page has been scrolled
  const [scrolled, setScrolled] = useState(false);
  // State to control the visibility of the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  // State to track the currently active section of the page
  const [activeSection, setActiveSection] = useState("home");

  // Array of navigation links
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    /**
     * Handles the scroll event.
     *
     * This function is responsible for:
     * - Changing the navbar's style when the user scrolls past a certain point.
     * - Determining which section of the page is currently in view and updating the activeSection state.
     */
    const handleScroll = () => {
      // Set scrolled to true if the user has scrolled more than 50px
      setScrolled(window.scrollY > 50);

      // Get all the sections from the navLinks
      const sections = navLinks.map((link) => document.querySelector(link.href));
      // Get the current scroll position, adjusted to be in the middle of the viewport
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Iterate over the sections to find the active one
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          // Check if the scroll position is within the current section
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    // Add the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
    // Remove the scroll event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-slate-200 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 tracking-tighter">
          ma<span className="text-slate-800">mahda</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`font-medium transition-colors relative group ${
                  activeSection === link.href.substring(1)
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.name}
                {/* Underline effect for active and hovered links */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                    activeSection === link.href.substring(1) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-800">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl">
          <ul className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)} // Close the menu when a link is clicked
                  className={`block font-medium ${
                    activeSection === link.href.substring(1)
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
