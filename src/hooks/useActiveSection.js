import { useEffect, useState } from "react";

/* The section whose top has passed a line 25% down the viewport is current. Two edges an
   intersection band can't reach: at the very bottom the last section wins (short final sections
   never scroll up to the line), and before any section reaches the line the first one counts as
   current as long as it's on screen. */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
      if (!nodes.length) return;

      const line = window.innerHeight * 0.25;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = null;

      if (atBottom) current = nodes[nodes.length - 1].id;
      else {
        for (const node of nodes) if (node.getBoundingClientRect().top <= line) current = node.id;
        if (!current && nodes[0].getBoundingClientRect().top < window.innerHeight) current = nodes[0].id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return active;
}
