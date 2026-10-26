import { useCallback, useEffect, useRef, useState } from "react";

export default function useCopy(timeout = 1800) {
  const [copied, setCopied] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text, key = "default") => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(key);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(null), timeout);
        return true;
      } catch {
        return false;
      }
    },
    [timeout],
  );

  return [copied, copy];
}
