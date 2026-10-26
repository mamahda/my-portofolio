import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import CertificationLogo from "../CertificationLogo";
import TagList from "../ui/Tag";

/* The issuer logo only appears on the certification pages; the profile keeps the list text-only. */
const CertificationItem = ({ certification, showLogo = true }) => (
  <article className="flex gap-4">
    {showLogo && <CertificationLogo certification={certification} className="size-11" />}
    <div className="min-w-0 flex-1">
      <Link
        to={`/certification/${certification.id}`}
        className="group inline-flex items-center gap-1.5 text-base font-medium leading-snug text-zinc-100 transition-colors hover:text-accent"
      >
        {certification.title}
        <ArrowUpRightIcon
          size={14}
          className="text-zinc-500 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </Link>
      <p className="mt-0.5 text-sm text-zinc-500">
        {certification.issuer} <span className="px-0.5 text-zinc-600">/</span> Issued {certification.year}
      </p>
      <p className="mt-1 break-all font-mono text-[11.5px] text-zinc-500">ID {certification.code}</p>
      {certification.skills?.length > 0 && <TagList items={certification.skills} className="mt-3" />}
    </div>
  </article>
);

export default CertificationItem;
