import { useCallback, useEffect, useRef, useState } from "react";

/* One visually hidden live region shared by every copy button, so screen readers hear the result. */
const announce = (message) => {
  let region = document.getElementById("copy-status");
  if (!region) {
    region = document.createElement("div");
    region.id = "copy-status";
    region.setAttribute("role", "status");
    region.className = "sr-only";
    document.body.append(region);
  }
  region.textContent = "";
  requestAnimationFrame(() => {
    region.textContent = message;
  });
};

/* The Clipboard API only exists on https/localhost; a page opened over a LAN IP needs the old way. */
const legacyCopy = (text) => {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.cssText = "position:fixed;opacity:0;pointer-events:none";
  document.body.append(field);
  field.select();
  const ok = document.execCommand("copy");
  field.remove();
  return ok;
};

export default function useCopy(timeout = 1800) {
  const [copied, setCopied] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text, key = "default") => {
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        ok = legacyCopy(text);
      }
      announce(ok ? "Copied to clipboard" : "Could not copy. Select the text and copy it manually.");
      if (ok) {
        setCopied(key);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(null), timeout);
      }
      return ok;
    },
    [timeout],
  );

  return [copied, copy];
}
