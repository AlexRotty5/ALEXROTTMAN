import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useImageLightbox } from '@/components/ImageLightbox';

const PREVIEW_SIZES = '(max-width: 768px) 100vw, 600px';

const previewRowClass =
  'flex w-full flex-col gap-12 md:flex-row md:items-start md:gap-14 lg:gap-20';
const previewTextColClass =
  'flex min-w-0 flex-1 flex-col justify-start md:max-w-md lg:max-w-lg xl:max-w-xl';

function PreviewCardImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const { open } = useImageLightbox();

  return (
    <div
      role="button"
      tabIndex={0}
      className="relative h-[500px] w-full max-w-[600px] rounded-[8px] overflow-hidden shadow-2xl cursor-zoom-in shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-stone-900/15 focus-visible:ring-offset-2"
      onMouseEnter={() => window.dispatchEvent(new CustomEvent('slider-pause'))}
      onMouseLeave={() => window.dispatchEvent(new CustomEvent('slider-resume'))}
      onClick={() => open(src, alt)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(src, alt);
        }
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover pointer-events-none"
        sizes={PREVIEW_SIZES}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        decoding="async"
      />
    </div>
  );
}

/** Next control for physical-projects rail — large target, clear affordance, light chrome */
function ProjectRailLinkButton({ href, label }: { href: string; label: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label={label}
      className="group relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-stone-300/90 bg-white text-stone-600 shadow-[0_2px_8px_rgba(15,23,42,0.07),0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.03] backdrop-blur-sm transition-[color,background-color,border-color,transform,box-shadow,ring-color] duration-300 ease-out hover:border-sky-400/45 hover:bg-sky-400/[0.09] hover:text-sky-800/90 hover:shadow-[0_14px_32px_-8px_rgba(56,189,248,0.18),0_4px_14px_rgba(14,165,233,0.1)] hover:ring-sky-300/35 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/25 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] active:border-sky-400/35 active:bg-sky-400/[0.06] active:shadow-[0_2px_8px_rgba(14,165,233,0.12)]"
      onMouseEnter={() => window.dispatchEvent(new CustomEvent('slider-pause'))}
      onMouseLeave={() => window.dispatchEvent(new CustomEvent('slider-resume'))}
      onClick={() => router.push(href)}
    >
      <svg
        className="h-7 w-7 translate-x-px transition-transform duration-300 ease-out group-hover:translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.65}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 12h14" />
        <path d="m13 7 6 5-6 5" />
      </svg>
    </button>
  );
}

export function PhysicalProjectsCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage src="/images/retinac.jpg" alt="Retinac" />

        <div className={previewTextColClass}>
          <h2
            className="text-5xl sm:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-[-0.1em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Retinac
          </h2>
          <h3
            className="text-xl sm:text-2xl font-medium text-gray-600 mb-5 sm:mb-6 uppercase tracking-[-0.05em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Stanford Biodesign
          </h3>
          <p
            className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Co-founder and Product Engineer for Retinac, a developing medical device out of Stanford University.
          </p>
          <ProjectRailLinkButton href="/projects/retinac" label="Open Retinac project" />
        </div>
      </div>
    </div>
  );
}

export function GaryLangCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage
          src="/images/nealfeay.jpg"
          alt="Neal Feay Internship"
          priority
        />

        <div className={previewTextColClass}>
          <h2
            className="text-5xl sm:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-[-0.1em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Neal Feay
          </h2>
          <h3
            className="text-xl sm:text-2xl font-medium text-gray-600 mb-5 sm:mb-6 uppercase tracking-[-0.05em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Engineer Intern Summer 2024
          </h3>
          <p
            className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Engineer Intern at Neal Feay, specializing in CAD modeling, precision machining, and project management tasks.
          </p>
          <ProjectRailLinkButton href="/projects/nealfeay" label="Open Neal Feay project" />
        </div>
      </div>
    </div>
  );
}

export function TempoCrankCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage src="/images/post6.jpg" alt="Tempo Crank" />

        <div className={previewTextColClass}>
          <h2
            className="text-5xl sm:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-[-0.1em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Tempo Crank
          </h2>
          <h3
            className="text-xl sm:text-2xl font-medium text-gray-600 mb-5 sm:mb-6 uppercase tracking-[-0.05em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Mechanical Engineering Project
          </h3>
          <p
            className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A volleyball net crank system that sets up and takes down nets 2× faster using a geared transmission system.
          </p>
          <ProjectRailLinkButton href="/projects/tempocrank" label="Open Tempo Crank project" />
        </div>
      </div>
    </div>
  );
}

export function WinterWaveCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage src="/images/Wave1.v2.jpg" alt="Winter Wave" />

        <div className={previewTextColClass}>
          <h2
            className="text-5xl sm:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-[-0.1em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Winter Wave
          </h2>
          <h3
            className="text-xl sm:text-2xl font-medium text-gray-600 mb-5 sm:mb-6 uppercase tracking-[-0.05em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            CNC Machined Bottle Opener
          </h3>
          <p
            className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A CNC machined bottle opener that prioritizes aesthetics and ergonomics—designed to live on a desk as a sculptural piece while still functioning reliably to open any bottle.
          </p>
          <ProjectRailLinkButton href="/projects/winterwave" label="Open Winter Wave project" />
        </div>
      </div>
    </div>
  );
}

export function EggHolderCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage src="/images/eggcover.jpg" alt="Le Coquetier" />

        <div className={previewTextColClass}>
          <h2
            className="text-5xl sm:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-[-0.1em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Le Coquetier
          </h2>
          <h3
            className="text-xl sm:text-2xl font-medium text-gray-600 mb-5 sm:mb-6 uppercase tracking-[-0.05em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Product Manufacturing
          </h3>
          <p
            className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            An egg holder, designed, engineered, and fully hand manufactured for my ME 103 final project. Chosen as a showcase item at the Stanford Engineering Department's 100th Anniversary Event.
          </p>
          <ProjectRailLinkButton href="/projects/eggholder" label="Open Le Coquetier project" />
        </div>
      </div>
    </div>
  );
}

export function GearTrainsCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage src="/images/gear1.jpg" alt="Gear Trains" />

        <div className={previewTextColClass}>
          <h2
            className="text-5xl sm:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-[-0.1em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Gear Trains
          </h2>
          <h3
            className="text-xl sm:text-2xl font-medium text-gray-600 mb-5 sm:mb-6 uppercase tracking-[-0.05em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            PRODUCT MANUFACTURING
          </h3>
          <p
            className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A comprehensive gear train system designed and manufactured as part of ME 102 coursework, demonstrating mechanical engineering principles and manufacturing techniques.
          </p>
          <ProjectRailLinkButton href="/projects/geartrains" label="Open Gear Trains project" />
        </div>
      </div>
    </div>
  );
}

export function AlexToolkitCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage src="/toolkit1.jpg" alt="Alex's Toolkit" />

        <div className={previewTextColClass}>
          <h2
            className="text-5xl sm:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-[-0.1em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Alex's Toolkit
          </h2>
          <h3
            className="text-xl sm:text-2xl font-medium text-gray-600 mb-5 sm:mb-6 uppercase tracking-[-0.05em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Handcrafted Tools
          </h3>
          <p
            className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A personal toolkit project featuring handcrafted hammer and custom toolbox, showcasing traditional metalworking and woodworking techniques.
          </p>
          <ProjectRailLinkButton href="/projects/toolkit" label="Open Alex's Toolkit project" />
        </div>
      </div>
    </div>
  );
}
