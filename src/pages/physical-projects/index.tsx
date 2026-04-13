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

const LAST_PROJECT_INDEX = PROJECTS.length - 1;

function RailChevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      className="h-16 w-16 text-stone-300 transition-colors duration-300 ease-out group-hover:text-sky-600/90 sm:h-24 sm:w-24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === 'right' ? (
        <path d="M9 6l6 6-6 6" />
      ) : (
        <path d="M15 6l-6 6 6 6" />
      )}
    </svg>
  );
}

const PhysicalProjects = () => {
  const router = useRouter();
  const [activeProject, setActiveProject] = useState(0);
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.key === 'ArrowRight' && activeProject < LAST_PROJECT_INDEX) {
        e.preventDefault();
        scrollToProject(activeProject + 1);
      } else if (e.key === 'ArrowLeft' && activeProject > 0) {
        e.preventDefault();
        scrollToProject(activeProject - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeProject, scrollToProject]);

  const getProjectNameStyle = (projectIndex: number) => {
    return `text-sm font-medium uppercase tracking-[-0.05em] transition-colors duration-300 cursor-pointer hover:text-gray-800 ${
      activeProject === projectIndex ? 'text-gray-900' : 'text-gray-400'
    }`;
  };

  const canGoLeft = activeProject > 0;
  const canGoRight = activeProject < LAST_PROJECT_INDEX;

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

      {/* Side rails: first slide = right only; middle = both; last = left only */}
      {canGoLeft && (
        <div className="pointer-events-none fixed inset-y-0 left-0 z-[44] flex w-20 items-center justify-center pl-2 sm:w-28 sm:pl-4">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => scrollToProject(activeProject - 1)}
            className="group pointer-events-auto flex items-center justify-center rounded-md p-2 text-stone-300 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F5]"
          >
            <RailChevron direction="left" />
          </button>
        </div>
      )}

      {canGoRight && (
        <div className="pointer-events-none fixed inset-y-0 right-0 z-[44] flex w-20 items-center justify-center pr-2 sm:w-28 sm:pr-4">
          <button
            type="button"
            aria-label="Next project"
            onClick={() => scrollToProject(activeProject + 1)}
            className="group pointer-events-auto flex items-center justify-center rounded-md p-2 text-stone-300 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F5]"
          >
            <RailChevron direction="right" />
          </button>
        </div>
      )}

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
