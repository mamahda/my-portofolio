import { AnimatePresence, motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import useTheme from "../../hooks/useTheme";
import { iconButton } from "../../lib/ui";

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggle } = useTheme();
  const light = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Dark mode" : "Light mode"}
      className={`${iconButton} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          {light ? <MoonIcon size={19} /> : <SunIcon size={19} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
