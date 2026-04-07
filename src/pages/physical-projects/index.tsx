import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  PhysicalProjectsCursor,
  EggHolderCursor,
  GaryLangCursor,
  TempoCrankCursor,
  WinterWaveCursor,
  GearTrainsCursor,
  AlexToolkitCursor,
} from '@/components/ui/cursor';
import Navigation from '@/components/Navigation';
import { ViewportReveal } from '@/components/ViewportReveal';

const PROJECTS = [
  { id: 'neal-feay', label: 'Neal Feay', Component: GaryLangCursor },
  { id: 'tempo-crank', label: 'Tempo Crank', Component: TempoCrankCursor },
  { id: 'le-coquetier', label: 'Le Coquetier', Component: EggHolderCursor },
  { id: 'winter-wave', label: 'Winter Wave', Component: WinterWaveCursor },
  { id: 'retinac', label: 'Retinac', Component: PhysicalProjectsCursor },
  { id: 'gear-trains', label: 'Gear Trains', Component: GearTrainsCursor },
  { id: 'toolkit', label: 'Toolkit', Component: AlexToolkitCursor },
] as const;

const PhysicalProjects = () => {
  const router = useRouter();
  const [activeProject, setActiveProject] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollRef = useRef<HTMLElement | null>(null);
  const activeRaf = useRef<number | null>(null);

  const updateActiveFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    const i = Math.round(el.scrollLeft / w);
    const clamped = Math.min(Math.max(0, i), PROJECTS.length - 1);
    setActiveProject(clamped);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      setShowScrollHint((prev) => (prev ? false : prev));
      if (activeRaf.current != null) cancelAnimationFrame(activeRaf.current);
      activeRaf.current = requestAnimationFrame(() => {
        activeRaf.current = null;
        updateActiveFromScroll();
      });
    };

    updateActiveFromScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (activeRaf.current != null) cancelAnimationFrame(activeRaf.current);
    };
  }, [updateActiveFromScroll]);

  useEffect(() => {
    const onResize = () => updateActiveFromScroll();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [updateActiveFromScroll]);

  useEffect(() => {
    const t = window.setTimeout(() => setShowScrollHint(false), 2600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const next = el.scrollLeft + e.deltaY;
      if ((e.deltaY > 0 && el.scrollLeft < max) || (e.deltaY < 0 && el.scrollLeft > 0)) {
        el.scrollLeft = next;
        e.preventDefault();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const scrollToProject = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const w = container.clientWidth;
    container.scrollTo({ left: index * w, behavior: 'smooth' });
  }, []);

  const getProjectNameStyle = (projectIndex: number) => {
    return `text-sm font-medium uppercase tracking-[-0.05em] transition-colors duration-300 cursor-pointer hover:text-gray-800 ${
      activeProject === projectIndex ? 'text-gray-900' : 'text-gray-400'
    }`;
  };

  return (
    <div className="relative h-screen overflow-hidden bg-[#FAF9F5]">
      <div className="fixed top-6 left-6 z-50">
        <img
          src="/logo.png"
          alt="Alex Rottman"
          className="h-16 w-auto transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
          onClick={() => router.push('/')}
        />
      </div>

      <div className="fixed top-12 left-1/2 z-40 w-full max-w-[min(100vw-1.5rem,80rem)] -translate-x-1/2 px-5 sm:px-8 pointer-events-none">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 sm:gap-x-10 sm:gap-y-3 pointer-events-auto">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={getProjectNameStyle(i)}
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={() => scrollToProject(i)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <Navigation currentPage="physical-projects" isHeaderVisible={true} />

      <div
        className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-500 ${
          showScrollHint ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-3 rounded-full border border-gray-200/70 bg-white/70 backdrop-blur px-4 py-2 shadow-sm">
          <svg
            className="h-4 w-4 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M8 7l-5 5 5 5" />
            <path d="M16 7l5 5-5 5" />
          </svg>
          <span className="sr-only">Horizontal scroll</span>
          <div className="w-20 h-1.5 rounded-full bg-gray-200/70 overflow-hidden">
            <div className="h-full w-7 bg-gray-500/35 rounded-full" />
          </div>
        </div>
      </div>

      <main
        ref={scrollRef}
        className="horizontal-rail flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth [scrollbar-gutter:stable]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {PROJECTS.map(({ id, Component }, index) => (
          <section
            key={id}
            id={id}
            className={`flex h-full min-h-0 w-screen shrink-0 snap-start snap-always flex-col pt-32 pb-16 sm:pt-36 sm:pb-20 ${
              index > 0 ? 'shadow-[-12px_0_40px_-28px_rgba(0,0,0,0.18)]' : ''
            }`}
            style={{
              backgroundColor: '#FAF9F5',
            }}
          >
            <div className="flex min-h-0 flex-1 items-center overflow-y-hidden overflow-x-hidden [scrollbar-gutter:stable]">
              <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
                {index === 0 ? (
                  <Component />
                ) : (
                  <ViewportReveal
                    minHeightClassName="min-h-[min(100vh,52rem)]"
                    rootMargin="0px 320px 0px 320px"
                  >
                    <Component />
                  </ViewportReveal>
                )}
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default PhysicalProjects;
