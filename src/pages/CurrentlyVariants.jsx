// TEMPORARY: exploring the "Currently" sidebar block. Remove once a variant is chosen.
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { AsideBlock } from "../components/layout/SidebarCards";
import { profile } from "../data/profile";
import { formatMonth, tenure } from "../lib/dates";

const currentRoles = profile.experience.flatMap((entry) =>
  entry.roles.filter((role) => !role.end).map((role) => ({ ...role, org: entry.org })),
);

const resourceRow =
  "group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-zinc-200 transition-colors hover:bg-white/[0.04] hover:text-zinc-50";

const CheckMyWork = () => (
  <AsideBlock title="Check my work first">
    <ul className="-mx-2">
      <li>
        <a href={profile.cv} target="_blank" rel="noopener noreferrer" className={resourceRow}>
          <span className="flex-1">Curriculum vitae</span>
          <ArrowUpRightIcon size={13} className="text-zinc-500 group-hover:text-accent" />
        </a>
      </li>
      <li>
        <span className={resourceRow}>
          <span className="flex-1">Projects</span>
          <ArrowRightIcon size={13} className="text-zinc-500 group-hover:text-accent" />
        </span>
      </li>
    </ul>
  </AsideBlock>
);

/* A: one stat line, roles collapsed into tags. Low repetition, scans in a glance. */
const A = () => (
  <AsideBlock title="Currently" first>
    <p className="text-sm text-zinc-100">
      Juggling <span className="font-mono text-accent">{currentRoles.length}</span> roles right now
    </p>
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {currentRoles.map((role) => (
        <li
          key={role.title}
          className="rounded-md bg-white/[0.04] px-2 py-1 text-xs text-zinc-300 ring-1 ring-inset ring-white/[0.08]"
        >
          {role.title}
        </li>
      ))}
    </ul>
    <p className="mt-4 text-xs text-zinc-500">{profile.openTo.title} · replies within a day</p>
  </AsideBlock>
);

/* B: timeline dots, matching the Experience section's visual language on the home page. */
const B = () => (
  <AsideBlock title="Currently" first>
    <ul className="border-l border-line">
      {currentRoles.map((role) => (
        <li key={role.title} className="relative py-2 pl-4">
          <span className="absolute left-[-3.5px] top-[13px] size-[7px] rounded-full bg-accent ring-4 ring-ink-950" />
          <p className="text-sm leading-snug text-zinc-100">{role.title}</p>
          <p className="text-xs text-zinc-500">
            {role.org} <span className="text-zinc-600">·</span> {tenure(role.start, role.end)}
          </p>
        </li>
      ))}
    </ul>
    <p className="mt-3 text-xs text-zinc-500">{profile.openTo.title} · replies within a day</p>
  </AsideBlock>
);

/* C: one focal role (the newest), the rest folded into a plain count. Least visual weight. */
const C = () => {
  const [primary, ...rest] = currentRoles;
  return (
    <AsideBlock title="Currently" first>
      <p className="text-base font-medium leading-snug text-zinc-100">{primary.title}</p>
      <p className="mt-0.5 text-sm text-zinc-500">
        {primary.org} <span className="text-zinc-600">·</span> since {formatMonth(primary.start)}
      </p>
      {rest.length > 0 && (
        <p className="mt-2 text-xs text-zinc-500">+{rest.length} other role{rest.length > 1 ? "s" : ""} right now</p>
      )}
      <p className="mt-4 text-xs text-zinc-500">{profile.openTo.title} · replies within a day</p>
    </AsideBlock>
  );
};

const CurrentlyVariants = () => (
  <div className="mx-auto grid max-w-[1100px] grid-cols-3 gap-8 bg-ink-950 p-10">
    {[A, B, C].map((Variant, index) => (
      <div key={index}>
        <p className="mb-2 font-mono text-xs text-accent">{["A stat + tags", "B timeline", "C single focus"][index]}</p>
        <Variant />
        <CheckMyWork />
      </div>
    ))}
  </div>
);

export default CurrentlyVariants;
