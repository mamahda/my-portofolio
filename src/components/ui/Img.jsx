import { useState } from "react";
import { ImageBrokenIcon } from "@phosphor-icons/react";

/* Images already shown once this session skip the shimmer and fade, so revisiting a page doesn't flicker. */
const loadedSrcs = new Set();

const Img = ({ src, alt, fit = "cover", className = "", imgClassName = "" }) => {
  const [state, setState] = useState(() => (loadedSrcs.has(src) ? "ready" : "loading"));

  return (
    <div className={`relative overflow-hidden bg-ink-800 ${className}`}>
      {state === "loading" && (
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
      )}

      {state === "error" ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-4 text-center text-zinc-500">
          <ImageBrokenIcon size={22} />
          <span className="text-xs">Preview unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => {
            loadedSrcs.add(src);
            setState("ready");
          }}
          onError={() => setState("error")}
          className={`h-full w-full transition-opacity duration-500 ${
            fit === "contain" ? "object-contain" : "object-cover object-top"
          } ${state === "ready" ? "opacity-100" : "opacity-0"} ${imgClassName}`}
        />
      )}
    </div>
  );
};

export default Img;
