import { useEffect, useState } from "react";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { featured } from "../../data/featured";
import Section from "../ui/Section";
import Img from "../ui/Img";

const parseRepoUrl = (url) => {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  return match ? { owner: match[1], repo: match[2] } : null;
};

/* Kept for the whole session so returning to the profile doesn't refetch (and re-flash the titles). */
const metaCache = new Map();

const fetchMeta = (url) => {
  if (!metaCache.has(url)) {
    const { owner, repo } = parseRepoUrl(url);
    metaCache.set(
      url,
      fetch(`https://api.github.com/repos/${owner}/${repo}`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then((data) => ({ fullName: data.full_name, description: data.description }))
        .catch(() => ({ fullName: `${owner}/${repo}`, description: null }))
        .then((meta) => {
          metaCache.set(url, meta);
          return meta;
        }),
    );
  }
  return metaCache.get(url);
};

/* The link is the only hand-authored data; title and description come from a live
   fetch of the GitHub API, and the preview image is GitHub's own generated social card. */
const FeaturedCard = ({ url }) => {
  const parsed = parseRepoUrl(url);
  const [meta, setMeta] = useState(() => {
    const cached = metaCache.get(url);
    return cached instanceof Promise ? null : (cached ?? null);
  });

  useEffect(() => {
    if (meta || !parseRepoUrl(url)) return undefined;
    let cancelled = false;
    fetchMeta(url).then((result) => {
      if (!cancelled) setMeta(result);
    });
    return () => {
      cancelled = true;
    };
  }, [url, meta]);

  if (!parsed) return null;

  const title = `GitHub - ${meta?.fullName ?? `${parsed.owner}/${parsed.repo}`}${
    meta?.description ? `: ${meta.description}` : ""
  }`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-xl ring-1 ring-inset ring-white/[0.06] transition-colors hover:ring-white/[0.14]"
    >
      <Img
        src={`https://opengraph.githubassets.com/1/${parsed.owner}/${parsed.repo}`}
        alt={`${parsed.owner}/${parsed.repo} preview`}
        className="aspect-[1200/630] w-full"
      />
      <div className="flex items-center gap-2 bg-white/[0.03] px-3.5 py-2.5">
        <GithubLogoIcon size={14} className="shrink-0 text-zinc-500" />
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-zinc-200 transition-colors group-hover:text-accent">
            {title}
          </p>
          <p className="text-[11px] text-zinc-500">GitHub</p>
        </div>
      </div>
    </a>
  );
};

const FeaturedSection = () => (
  <Section id="featured" title="Featured">
    {/* Phones: one swipeable row with the next card peeking in. From sm up: two columns. */}
    <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0">
      {featured.map((url) => (
        <li key={url} className="w-[85%] shrink-0 snap-start sm:w-auto">
          <FeaturedCard url={url} />
        </li>
      ))}
    </ul>
  </Section>
);

export default FeaturedSection;
