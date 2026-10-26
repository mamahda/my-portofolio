import { Link } from "react-router-dom";
import { navItems } from "../../lib/navigation";

const SiteFooter = () => (
  <footer className="border-t border-line py-6 text-xs text-zinc-500">
    <ul className="flex flex-wrap gap-x-3 gap-y-1">
      {navItems.map((item) => (
        <li key={item.key}>
          <Link to={item.to} className="transition-colors hover:text-zinc-300">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
    <p className="mt-3">
      <span className="font-semibold tracking-tight text-zinc-300">
        ma<span className="text-accent">mahda</span>
      </span>{" "}
      &copy; {new Date().getFullYear()}
    </p>
  </footer>
);

export default SiteFooter;
