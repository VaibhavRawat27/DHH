"use client";

import { useEffect, useState } from "react";

export function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const date = now
    ? now
        .toLocaleDateString("en-GB", {
          weekday: "short",
          day: "2-digit",
          month: "short",
        })
        .toUpperCase()
    : "—";
  const time = now
    ? now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--:--:--";

  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted tabular-nums">
      <span className="text-cream/80">{date}</span>
      <span className="mx-1.5 text-ember">·</span>
      <span>{time}</span>
    </span>
  );
}
