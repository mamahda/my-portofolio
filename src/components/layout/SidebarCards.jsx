import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  FileTextIcon,
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react";
import useActiveSection from "../../hooks/useActiveSection";
import useCopy from "../../hooks/useCopy";
import { profile } from "../../data/profile";
import { spring, snappy } from "../../lib/motion";
import { profileSectionIds, profileSections } from "../../lib/navigation";
import { hostOf } from "../../lib/ui";

/* The sidebar is sticky and always on screen, so it animates on mount rather than
   waiting for an in-view trigger that can fail to fire after a route change. */
export const AsideBlock = ({ title, children, first = false, className = "" }) => (
  <motion.section
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={spring}
    className={`py-5 ${first ? "md:pt-0" : "mt-2"} ${className}`}
  >
    <h2 className="text-sm font-medium text-zinc-400">{title}</h2>
    <div className="mt-3">{children}</div>
  </motion.section>
);

export const SectionNav = () => {
  const active = useActiveSection(profileSectionIds);

  const jump = (id) => {
    if (id === profileSectionIds[0]) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AsideBlock title="On this page" first className="hidden md:block">
      <ul className="space-y-0.5">
        {profileSections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="toc-indicator"
                  transition={snappy}
                  className="absolute inset-y-1 left-0 w-0.5 bg-accent"
                />
              )}
              <button
                type="button"
                onClick={() => jump(section.id)}
                aria-current={isActive ? "location" : undefined}
                className={`flex w-full items-baseline rounded-md py-1.5 pl-3 text-left text-sm transition-colors ${
                  isActive ? "bg-white/[0.06] text-zinc-50" : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-100"
                }`}
              >
                {section.label}
              </button>
            </li>
          );
        })}
      </ul>
    </AsideBlock>
  );
};

const actionRow =
  "group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-white/[0.04]";
const actionIcon = "shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-100";

export const QuickActions = ({ className = "", title = "Quick actions", hideMessage = false }) => {
  const [copied, copy] = useCopy();
  const emailCopied = copied === "email";

  return (
    <AsideBlock title={title} className={className}>
      <ul className="-mx-2">
        <li>
          <button type="button" onClick={() => copy(profile.email, "email")} className={actionRow}>
            {emailCopied ? (
              <CheckIcon size={18} className="shrink-0 text-accent" />
            ) : (
              <CopyIcon size={18} className={actionIcon} />
            )}
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-zinc-100">{emailCopied ? "Email copied" : "Copy email"}</span>
              <span className="block truncate text-xs text-zinc-500">{profile.email}</span>
            </span>
          </button>
        </li>
        <li>
          <a href={profile.cv} target="_blank" rel="noopener noreferrer" className={actionRow}>
            <FileTextIcon size={18} className={actionIcon} />
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-zinc-100">Open CV</span>
              <span className="block truncate text-xs text-zinc-500">{hostOf(profile.cv)}</span>
            </span>
            <ArrowUpRightIcon size={13} weight="bold" className="shrink-0 text-zinc-500 group-hover:text-accent" />
          </a>
        </li>
        {!hideMessage && (
          <li>
            <Link to="/contact" className={actionRow}>
              <PaperPlaneTiltIcon size={18} className={actionIcon} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-zinc-100">Send a message</span>
                <span className="block truncate text-xs text-zinc-500">Usually replies within a day</span>
              </span>
            </Link>
          </li>
        )}
      </ul>
    </AsideBlock>
  );
};

/* Shared building blocks for page-specific sidebars. */

export const StatGrid = ({ stats }) => (
  <dl className="grid grid-cols-2 gap-2">
    {stats.map((stat) => (
      <div key={stat.label} className="content-surface px-3 py-3">
        <dt className="text-xs text-zinc-500">{stat.label}</dt>
        <dd className="mt-0.5 text-lg font-semibold tabular-nums text-zinc-100">{stat.value}</dd>
      </div>
    ))}
  </dl>
);

export const FacetList = ({ items, active, onSelect, allLabel = "All" }) => {
  const total = items.reduce((sum, item) => sum + item.count, 0);
  const rows = [{ label: allLabel, count: total, value: null }, ...items];

  return (
    <ul className="-mx-2">
      {rows.map((row) => {
        const isActive = active === row.value;
        return (
          <li key={row.label}>
            <button
              type="button"
              onClick={() => onSelect(row.value)}
              aria-pressed={isActive}
              className={`flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${
                isActive ? "bg-white/[0.06] text-zinc-50" : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-100"
              }`}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className={`size-1.5 shrink-0 rounded-full ${isActive ? "bg-accent" : "bg-transparent"}`} />
                <span className="truncate">{row.label}</span>
              </span>
              <span className="text-xs tabular-nums text-zinc-500">{row.count}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export const TagCloud = ({ items, active, onSelect }) => (
  <ul className="flex flex-wrap gap-1.5">
    {items.map((item) => {
      const isActive = active === item.value;
      return (
        <li key={item.value}>
          <button
            type="button"
            onClick={() => onSelect(isActive ? null : item.value)}
            aria-pressed={isActive}
            className={`rounded-md px-2 py-1 text-xs ring-1 md:py-0.5 ring-inset transition-colors active:scale-[0.97] ${
              isActive
                ? "bg-accent text-ink-950 ring-accent"
                : "bg-white/[0.03] text-zinc-400 ring-white/[0.07] hover:text-zinc-100 hover:ring-white/20"
            }`}
          >
            {item.value}
            {item.count > 1 && <span className={`ml-1.5 ${isActive ? "text-ink-950/60" : "text-zinc-500"}`}>{item.count}</span>}
          </button>
        </li>
      );
    })}
  </ul>
);

export const SocialList = ({ title = "Social media", className = "" }) => (
  <AsideBlock title={title} className={className}>
    <ul className="-mx-2">
      {profile.socials.map(({ icon: Icon, ...social }) => (
        <li key={social.name}>
          <a href={social.url} target="_blank" rel="noopener noreferrer" className={actionRow}>
            <Icon size={18} className={actionIcon} />
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-zinc-100">{social.name}</span>
              <span className="block truncate text-xs text-zinc-500">{social.handle}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-xs text-zinc-500 transition-colors group-hover:text-accent">
              {social.action}
              <ArrowUpRightIcon size={12} weight="bold" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  </AsideBlock>
);

export const SocialIcons = () => (
  <AsideBlock title="Elsewhere">
    <ul className="flex gap-2">
      {profile.socials.map(({ icon: Icon, ...social }) => (
        <li key={social.name}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.name}: ${social.handle}`}
            title={`${social.name} · ${social.handle}`}
            className="flex size-10 items-center justify-center rounded-lg text-zinc-400 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.05] hover:text-accent active:scale-95"
          >
            <Icon size={18} />
          </a>
        </li>
      ))}
    </ul>
  </AsideBlock>
);
