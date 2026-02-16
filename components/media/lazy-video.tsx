"use client";

import { withBasePath } from "@/lib/base-path";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  poster: string;
  title: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
};

export function LazyVideo({
  src,
  poster,
  title,
  className,
  autoPlay = true,
  loop = true,
  controls = false,
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setIsNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: "220px 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <video
        className="h-full w-full object-cover"
        poster={withBasePath(poster)}
        playsInline
        muted
        loop={loop}
        autoPlay={isNearViewport && autoPlay && !reducedMotion}
        controls={controls}
        preload={isNearViewport ? "metadata" : "none"}
        aria-label={title}
      >
        {isNearViewport ? <source src={withBasePath(src)} type="video/mp4" /> : null}
      </video>
    </div>
  );
}
