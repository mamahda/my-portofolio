import { memo } from "react";
import { motion } from "framer-motion";
import { spring } from "../../lib/motion";

const OpenToWorkAvatar = ({ src, alt, className = "size-32" }) => (
  <div className={`relative shrink-0 rounded-full bg-ink-950 p-1 ${className}`}>
    <img src={src} alt={alt} className="size-full rounded-full object-cover" />
    <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-1" aria-hidden="true">
      <defs>
        <linearGradient id="otw-stroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="rgb(var(--accent))" stopOpacity="0" />
          <stop offset="0.2" stopColor="rgb(var(--accent))" />
          <stop offset="0.8" stopColor="rgb(var(--accent))" />
          <stop offset="1" stopColor="rgb(var(--accent))" stopOpacity="0" />
        </linearGradient>
        <path id="otw-text-path" d="M 4.02 62.32 A 47.6 47.6 0 0 0 95.98 62.32" />
      </defs>
      <motion.path
        d="M 6.05 61.78 A 45.5 45.5 0 0 0 93.95 61.78"
        fill="none"
        stroke="url(#otw-stroke)"
        strokeWidth="9"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ ...spring, delay: 0.35 }}
      />
      <motion.text
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        fill="rgb(var(--ink-950))"
        fontSize="6.4"
        fontWeight="700"
        letterSpacing="0.7"
        textAnchor="middle"
        fontFamily="Plus Jakarta Sans, sans-serif"
      >
        <textPath href="#otw-text-path" startOffset="50%">
          #OPENTOWORK
        </textPath>
      </motion.text>
    </svg>
  </div>
);

export default memo(OpenToWorkAvatar);
