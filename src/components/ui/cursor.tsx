import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const PREVIEW_SIZES = '(max-width: 768px) 100vw, 600px';

const previewRowClass =
  'flex w-full flex-col gap-12 md:flex-row md:items-start md:gap-14 lg:gap-20';
const previewTextColClass =
  'flex min-w-0 flex-1 flex-col justify-start md:max-w-md lg:max-w-lg xl:max-w-xl';

const previewCardImage = (
  src: string,
  alt: string,
  href: string,
  router: ReturnType<typeof useRouter>,
  options: { priority?: boolean } = {}
) => (
  <div
    role="link"
    tabIndex={0}
    className="relative h-[500px] w-full max-w-[600px] rounded-[8px] overflow-hidden shadow-2xl cursor-pointer shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    onMouseEnter={() => window.dispatchEvent(new CustomEvent('slider-pause'))}
    onMouseLeave={() => window.dispatchEvent(new CustomEvent('slider-resume'))}
    onClick={() => router.push(href)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        router.push(href);
      }
    }}
  >
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes={PREVIEW_SIZES}
      priority={options.priority}
      loading={options.priority ? undefined : 'lazy'}
      decoding="async"
    />
  </div>
);

export function PhysicalProjectsCursor() {
  const router = useRouter();

  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        {previewCardImage(
          '/images/retinac.jpg',
          'Retinac',
          '/projects/retinac',
          router
        )}

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
          <button
            type="button"
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('slider-pause'))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('slider-resume'))}
            onClick={() => router.push('/projects/retinac')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function GaryLangCursor() {
  const router = useRouter();

  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        {previewCardImage(
          '/images/nealfeay.jpg',
          'Neal Feay Internship',
          '/projects/nealfeay',
          router,
          { priority: true }
        )}

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
          <button
            type="button"
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('slider-pause'))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('slider-resume'))}
            onClick={() => router.push('/projects/nealfeay')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function TempoCrankCursor() {
  const router = useRouter();

  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        {previewCardImage(
          '/images/post6.jpg',
          'Tempo Crank',
          '/projects/tempocrank',
          router
        )}

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
          <button
            type="button"
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('slider-pause'))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('slider-resume'))}
            onClick={() => router.push('/projects/tempocrank')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function WinterWaveCursor() {
  const router = useRouter();

  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        {previewCardImage(
          '/images/Wave1.v2.jpg',
          'Winter Wave',
          '/projects/winterwave',
          router
        )}

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
            CNC machined bottle opener
          </h3>
          <p
            className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A bottle opener designed not to look like one—sculptural enough to live on a desk as a small objet while still working as a tool.
          </p>
          <button
            type="button"
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('slider-pause'))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('slider-resume'))}
            onClick={() => router.push('/projects/winterwave')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function EggHolderCursor() {
  const router = useRouter();

  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        {previewCardImage(
          '/images/eggcover.jpg',
          'Le Coquetier',
          '/projects/eggholder',
          router
        )}

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
          <button
            type="button"
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('slider-pause'))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('slider-resume'))}
            onClick={() => router.push('/projects/eggholder')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function GearTrainsCursor() {
  const router = useRouter();

  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        {previewCardImage(
          '/images/gear1.jpg',
          'Gear Trains',
          '/projects/geartrains',
          router
        )}

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
          <button
            type="button"
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('slider-pause'))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('slider-resume'))}
            onClick={() => router.push('/projects/geartrains')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function AlexToolkitCursor() {
  const router = useRouter();

  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        {previewCardImage(
          '/toolkit1.jpg',
          "Alex's Toolkit",
          '/projects/toolkit',
          router
        )}

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
          <button
            type="button"
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('slider-pause'))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('slider-resume'))}
            onClick={() => router.push('/projects/toolkit')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
