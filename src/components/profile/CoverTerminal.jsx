import { memo, useEffect, useState } from "react";

const script = [
  { cmd: "go run ./cmd/api", out: "listening on :8080 (14 routes)" },
  { cmd: "docker compose up -d", out: "3 containers started in 2.71s" },
  { cmd: "php artisan migrate", out: "migrated 9 tables" },
  { cmd: "nvim main.go", out: "main.go 47L, 1093B" },
];

const CoverTerminal = () => {
  const [line, setLine] = useState(0);
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const current = script[line];
    let timer;

    if (typed < current.cmd.length) {
      timer = setTimeout(() => setTyped((count) => count + 1), 55 + Math.random() * 60);
    } else if (!done) {
      timer = setTimeout(() => setDone(true), 380);
    } else {
      timer = setTimeout(() => {
        setDone(false);
        setTyped(0);
        setLine((index) => (index + 1) % script.length);
      }, 2600);
    }

    return () => clearTimeout(timer);
  }, [line, typed, done]);

  const current = script[line];

  return (
    <div
      aria-hidden="true"
      className="w-[300px] overflow-hidden rounded-xl bg-ink-950/70 font-mono text-[12px] leading-relaxed text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/[0.08] backdrop-blur-md"
    >
      <div className="flex items-center gap-1.5 border-b border-white/[0.05] px-3 py-2">
        <span className="size-2 rounded-full bg-zinc-600" />
        <span className="size-2 rounded-full bg-zinc-600" />
        <span className="size-2 rounded-full bg-zinc-600" />
        <span className="ml-2 text-[11px] text-zinc-500">mahda@cachyos: ~/code</span>
      </div>
      <div className="min-h-[64px] px-3.5 py-3">
        <p className="whitespace-nowrap">
          <span className="text-accent">~</span>
          <span className="text-zinc-500"> $ </span>
          <span className="text-zinc-100">{current.cmd.slice(0, typed)}</span>
          {!done && <span className="ml-px inline-block h-3.5 w-[7px] translate-y-[2px] animate-blink bg-accent" />}
        </p>
        <p className={`text-zinc-500 transition-opacity duration-300 ${done ? "opacity-100" : "opacity-0"}`}>
          {current.out}
        </p>
      </div>
    </div>
  );
};

export default memo(CoverTerminal);
