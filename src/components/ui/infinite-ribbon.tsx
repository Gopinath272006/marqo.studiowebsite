import type * as React from "react";
import { cn } from "@/lib/utils";

export interface InfiniteRibbonProps {
  repeat?: number;
  duration?: number;
  reverse?: boolean;
  rotation?: number;
  children: React.ReactNode;
  className?: string;
}

export function InfiniteRibbon({
  duration = 40,
  reverse = false,
  rotation = 0,
  children,
  className,
}: InfiniteRibbonProps) {
  return (
    <div
      className={cn("group flex overflow-hidden py-2 [--gap:2rem] [gap:var(--gap)] flex-row max-w-full", className)}
      style={{
        transform: `rotate(${rotation}deg)`,
        maskImage:
          "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))",
        WebkitMaskImage:
          "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))",
      }}
    >
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)] flex-row",
              reverse ? "animate-marquee-reverse" : "animate-marquee"
            )}
            style={{
              animationDuration: `${duration}s`,
            }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
