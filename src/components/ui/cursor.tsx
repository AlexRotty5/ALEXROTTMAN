import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PREVIEW_SIZES = '(max-width: 768px) 100vw, 600px';

const previewRowClass =
  'flex w-full flex-col gap-12 md:flex-row md:items-start md:gap-14 lg:gap-20';
const previewTextColClass =
  'flex min-w-0 flex-1 flex-col justify-start md:max-w-md lg:max-w-lg xl:max-w-xl';

function PreviewCardImage({
  src,
  alt,
  href,
  priority = false,
}: {
  src: string;
  alt: string;
  href: string;
  priority?: boolean;
}) {
  const router = useRouter();

  return (
    <div
      role="link"
      tabIndex={0}
      className="relative h-[500px] w-full max-w-[600px] rounded-[8px] overflow-hidden shadow-2xl cursor-pointer shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-stone-900/15 focus-visible:ring-offset-2"
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
        className="object-cover pointer-events-none"
        sizes={PREVIEW_SIZES}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        decoding="async"
      />
    </div>
  );
}

const sliderPause = () => window.dispatchEvent(new CustomEvent('slider-pause'));
const sliderResume = () => window.dispatchEvent(new CustomEvent('slider-resume'));

function ProjectTitleLink({
  href,
  children,
  trackingClass = 'tracking-[-0.1em]',
  sizeClass = 'text-5xl sm:text-6xl',
}: {
  href: string;
  children: React.ReactNode;
  trackingClass?: string;
  sizeClass?: string;
}) {
  return (
    <h2
      className={`mb-3 sm:mb-4 font-bold uppercase ${sizeClass} ${trackingClass}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Link
        href={href}
        className="inline-block rounded-lg -mx-2 px-2 py-1 text-gray-900 transition-colors duration-300 ease-out hover:text-sky-600/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/35 focus-visible:ring-offset-2"
        onMouseEnter={sliderPause}
        onMouseLeave={sliderResume}
      >
        {children}
      </Link>
    </h2>
  );
}

function ProjectSubtitleLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <h3
      className="mb-5 sm:mb-6 text-xl sm:text-2xl font-medium uppercase tracking-[-0.05em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Link
        href={href}
        className="inline-block rounded-lg -mx-2 px-2 py-0.5 text-gray-600 transition-colors duration-300 ease-out hover:text-sky-600/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/35 focus-visible:ring-offset-2"
        onMouseEnter={sliderPause}
        onMouseLeave={sliderResume}
      >
        {children}
      </Link>
    </h3>
  );
}

function ProjectDescriptionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <p
      className="mb-8 text-lg sm:text-xl leading-relaxed"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Link
        href={href}
        className="block w-full rounded-lg -mx-2 px-2 py-1 text-gray-700 transition-colors duration-300 ease-out hover:text-sky-600/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/35 focus-visible:ring-offset-2"
        onMouseEnter={sliderPause}
        onMouseLeave={sliderResume}
      >
        {children}
      </Link>
    </p>
  );
}

export function SomniCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage
          src="/images/Somni%20front%20page.png"
          alt="Somni"
          href="/projects/somni"
          priority
        />

        <div className={previewTextColClass}>
          <ProjectTitleLink href="/projects/somni" trackingClass="tracking-[-0.05em]">
            Somni
          </ProjectTitleLink>
          <ProjectSubtitleLink href="/projects/somni">Stanford Capstone Project</ProjectSubtitleLink>
          <ProjectDescriptionLink href="/projects/somni">
            An AI-driven product that makes dream journaling frictionless, turning dream recall into organized reflections, patterns, and insights.
          </ProjectDescriptionLink>
        </div>
      </div>
    </div>
  );
}

export function PidHotWheelsCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage
          src="/images/pid-hot-wheels-main.png"
          alt="PD Balance Beam"
          href="/projects/pidhotwheels"
        />

        <div className={previewTextColClass}>
          <ProjectTitleLink href="/projects/pidhotwheels" trackingClass="tracking-[-0.05em]">
            PD Balance Beam
          </ProjectTitleLink>
          <ProjectSubtitleLink href="/projects/pidhotwheels">Personal Controls Project</ProjectSubtitleLink>
          <ProjectDescriptionLink href="/projects/pidhotwheels">
            A PD control system that uses Arduino, ultrasonic sensing, and servo actuation to stabilize a rolling Hot Wheels car on a beam, with the target position set by a movable reference cube.
          </ProjectDescriptionLink>
        </div>
      </div>
    </div>
  );
}

export function PhysicalProjectsCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage
          src="/images/retinac.jpg"
          alt="Retinac"
          href="/projects/retinac"
        />

        <div className={previewTextColClass}>
          <ProjectTitleLink href="/projects/retinac">Retinac</ProjectTitleLink>
          <ProjectSubtitleLink href="/projects/retinac">Stanford Biodesign</ProjectSubtitleLink>
          <ProjectDescriptionLink href="/projects/retinac">
            Co-founder and Product Engineer for Retinac, a developing medical device out of Stanford University.
          </ProjectDescriptionLink>
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
          href="/projects/nealfeay"
        />

        <div className={previewTextColClass}>
          <ProjectTitleLink href="/projects/nealfeay">Neal Feay</ProjectTitleLink>
          <ProjectSubtitleLink href="/projects/nealfeay">Engineer Intern Summer 2024</ProjectSubtitleLink>
          <ProjectDescriptionLink href="/projects/nealfeay">
            Engineer Intern at Neal Feay, specializing in CAD modeling, precision machining, and project management tasks.
          </ProjectDescriptionLink>
        </div>
      </div>
    </div>
  );
}

export function TempoCrankCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage
          src="/images/post6.jpg"
          alt="Tempo Crank"
          href="/projects/tempocrank"
        />

        <div className={previewTextColClass}>
          <ProjectTitleLink href="/projects/tempocrank">Tempo Crank</ProjectTitleLink>
          <ProjectSubtitleLink href="/projects/tempocrank">Mechanical Engineering Project</ProjectSubtitleLink>
          <ProjectDescriptionLink href="/projects/tempocrank">
            A volleyball net crank system that sets up and takes down nets 2× faster using a geared transmission system.
          </ProjectDescriptionLink>
        </div>
      </div>
    </div>
  );
}

export function WinterWaveCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage
          src="/images/Wave1.v2.jpg"
          alt="Winter Wave"
          href="/projects/winterwave"
        />

        <div className={previewTextColClass}>
          <ProjectTitleLink href="/projects/winterwave">Winter Wave</ProjectTitleLink>
          <ProjectSubtitleLink href="/projects/winterwave">CNC Machined Bottle Opener</ProjectSubtitleLink>
          <ProjectDescriptionLink href="/projects/winterwave">
            A CNC machined bottle opener that prioritizes aesthetics and ergonomics—designed to live on a desk as a sculptural piece while still functioning reliably to open any bottle.
          </ProjectDescriptionLink>
        </div>
      </div>
    </div>
  );
}

export function EggHolderCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage
          src="/images/eggcover.jpg"
          alt="Le Coquetier"
          href="/projects/eggholder"
        />

        <div className={previewTextColClass}>
          <ProjectTitleLink href="/projects/eggholder">Le Coquetier</ProjectTitleLink>
          <ProjectSubtitleLink href="/projects/eggholder">Product Manufacturing</ProjectSubtitleLink>
          <ProjectDescriptionLink href="/projects/eggholder">
            An egg holder, designed, engineered, and fully hand manufactured for my ME 103 final project. Chosen as a showcase item at the Stanford Engineering Department's 100th Anniversary Event.
          </ProjectDescriptionLink>
        </div>
      </div>
    </div>
  );
}

export function GearTrainsCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage
          src="/images/gear1.jpg"
          alt="Gear Trains"
          href="/projects/geartrains"
        />

        <div className={previewTextColClass}>
          <ProjectTitleLink href="/projects/geartrains">Gear Trains</ProjectTitleLink>
          <ProjectSubtitleLink href="/projects/geartrains">PRODUCT MANUFACTURING</ProjectSubtitleLink>
          <ProjectDescriptionLink href="/projects/geartrains">
            A comprehensive gear train system designed and manufactured as part of ME 102 coursework, demonstrating mechanical engineering principles and manufacturing techniques.
          </ProjectDescriptionLink>
        </div>
      </div>
    </div>
  );
}

export function AlexToolkitCursor() {
  return (
    <div className="w-full py-2 md:py-0">
      <div className={previewRowClass}>
        <PreviewCardImage
          src="/toolkit1.jpg"
          alt="Alex's Toolkit"
          href="/projects/toolkit"
        />

        <div className={previewTextColClass}>
          <ProjectTitleLink href="/projects/toolkit">Alex&apos;s Toolkit</ProjectTitleLink>
          <ProjectSubtitleLink href="/projects/toolkit">Handcrafted Tools</ProjectSubtitleLink>
          <ProjectDescriptionLink href="/projects/toolkit">
            A personal toolkit project featuring handcrafted hammer and custom toolbox, showcasing traditional metalworking and woodworking techniques.
          </ProjectDescriptionLink>
        </div>
      </div>
    </div>
  );
}
