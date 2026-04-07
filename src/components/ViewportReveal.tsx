import React, { useEffect, useRef, useState } from 'react';

type ViewportRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Distance before entering viewport to start mounting (loads media earlier while scrolling) */
  rootMargin?: string;
  /** Minimum height to reserve so layout doesn’t jump */
  minHeightClassName?: string;
};

/**
 * Renders children only after the section is near the viewport, so images/animations
 * below the fold don’t all compete for bandwidth on first paint.
 */
export function ViewportReveal({
  children,
  className = '',
  rootMargin = '320px 0px 320px 0px',
  minHeightClassName = 'min-h-screen',
}: ViewportRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [shown, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {shown ? children : <div className={minHeightClassName} aria-hidden />}
    </div>
  );
}
