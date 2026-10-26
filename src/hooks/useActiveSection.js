import { useEffect, useState } from "react";

export default function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
          else if (entry.target.id === ids[0] && entry.boundingClientRect.top > 0) setActive(null);
        });
      },
      { rootMargin: "-25% 0px -70% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
