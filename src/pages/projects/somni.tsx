// @ts-nocheck
import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from 'framer-motion';
import { createPortal } from 'react-dom';
import Navigation from '@/components/Navigation';
import { ProjectDetailBackNav } from '@/components/ProjectDetailBackNav';

const TABS = [
  { id: 'project', label: 'Project' },
  { id: 'form', label: 'Form' },
  { id: 'electronics', label: 'Electronics' },
];

const SOMNI_WAITLIST_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdn3Vi3cO3PLD5ggBPtHqpuNz7GXvJHz32m6knjm77szy23jw/viewform';

/* ------------------------------------------------------------------ */
/* Recall timeline geometry                                            */
/* ------------------------------------------------------------------ */

const VB_W = 1000;
const VB_H = 360;
const PLOT = { left: 70, right: 930, top: 78, bottom: 268 };
const MAX_T = 50; // seconds shown on the axis

const xForT = (t) => PLOT.left + (t / MAX_T) * (PLOT.right - PLOT.left);
const yForR = (r) => PLOT.top + (1 - r / 100) * (PLOT.bottom - PLOT.top);
const pctX = (x) => `${(x / VB_W) * 100}%`;
const pctY = (y) => `${(y / VB_H) * 100}%`;

// Recall curve nodes — peaks in the first 10s, then decays.
const CURVE = [
  { t: 0, r: 100 },
  { t: 5, r: 99 }, // Somni node
  { t: 10, r: 93 },
  { t: 24, r: 60 }, // Notebook node
  { t: 40, r: 39 }, // App node
  { t: 50, r: 33 },
];

const MARKERS = [
  {
    id: 'somni',
    t: 5,
    r: 99,
    time: '~10s',
    title: 'Somni',
    blurb: 'Captured in the first 10 seconds — recall at its peak, zero distractions.',
    highlight: true,
  },
  {
    id: 'notebook',
    t: 24,
    r: 60,
    time: '~30s',
    title: 'Notebook journaling',
    blurb: 'Fumbling for a pen — key details already slipping away.',
  },
  {
    id: 'app',
    t: 40,
    r: 39,
    time: '~60s',
    title: 'Dream journal app',
    blurb: 'Unlock, tap, type — the distraction erases the most.',
  },
];

function smoothPath(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const CURVE_PTS = CURVE.map((c) => ({ x: xForT(c.t), y: yForR(c.r) }));
const LINE_PATH = smoothPath(CURVE_PTS);
const AREA_PATH = `${LINE_PATH} L ${PLOT.right} ${PLOT.bottom} L ${PLOT.left} ${PLOT.bottom} Z`;

const windowRightX = xForT(10);
const labelBandY = 296; // where connector lines stop / labels begin

function Hero360() {
  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Animated GIF loops without a play button — browsers block muted MP4 autoplay
          inside transformed/animated layouts even when play() is called. */}
      <img
        src="/images/somni-360-spin.gif"
        alt="Somni 360° product spin"
        draggable={false}
        className="w-[360px] max-w-[82vw] select-none sm:w-[420px]"
      />
    </motion.div>
  );
}

function RecallTimeline() {
  const chartRef = useRef(null);
  const inView = useInView(chartRef, { amount: 0.4 });
  return (
    <div className="w-full">
      <div className="mb-12 flex flex-col gap-10 lg:mb-8 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
        <div className="max-w-2xl lg:flex-1">
          <h2
            className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Optimizing dream journaling.
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed text-gray-600"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            We made dream journaling frictionless by automating the process. Your
            dream is freshest the moment you wake, and every second after, the most
            important details slip away. Somni lands inside that window — before a
            notebook or a phone ever could.
          </p>
        </div>
        <div className="lg:-mt-44 lg:ml-4 lg:shrink-0">
          <Hero360 />
        </div>
      </div>

      <div ref={chartRef} className="relative w-full select-none">
        <div className="relative h-[440px] w-full sm:h-[480px]">
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="recallArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="recallLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="45%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
            </defs>

            {/* peak window band */}
            <rect
              x={PLOT.left}
              y={PLOT.top - 8}
              width={windowRightX - PLOT.left}
              height={PLOT.bottom - PLOT.top + 8}
              fill="#e0f2fe"
              opacity="0.6"
            />
            <line
              x1={windowRightX}
              y1={PLOT.top - 8}
              x2={windowRightX}
              y2={PLOT.bottom}
              stroke="#7dd3fc"
              strokeWidth="1"
              strokeDasharray="4 5"
              vectorEffect="non-scaling-stroke"
            />

            {/* baseline */}
            <line
              x1={PLOT.left}
              y1={PLOT.bottom}
              x2={PLOT.right}
              y2={PLOT.bottom}
              stroke="#e5e7eb"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
            />

            {/* area + curve */}
            <path d={AREA_PATH} fill="url(#recallArea)" />
            <motion.path
              d={LINE_PATH}
              fill="none"
              stroke="url(#recallLine)"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />

            {/* connectors from each dot down to its label */}
            {MARKERS.map((m) => (
              <line
                key={m.id}
                x1={xForT(m.t)}
                y1={yForR(m.r)}
                x2={xForT(m.t)}
                y2={labelBandY}
                stroke={m.highlight ? '#7dd3fc' : '#e5e7eb'}
                strokeWidth="1.25"
                strokeDasharray="3 5"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {/* peak window pill */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: pctX((PLOT.left + windowRightX) / 2), top: pctY(PLOT.top - 34) }}
          >
            <span
              className="whitespace-nowrap rounded-full bg-sky-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-700"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              First 10s · peak recall
            </span>
          </div>

          {/* dots */}
          {MARKERS.map((m, i) => (
            <motion.div
              key={m.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: pctX(xForT(m.t)), top: pctY(yForR(m.r)) }}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 0.9 + i * 0.18, duration: 0.45, ease: 'backOut' }}
            >
              {m.highlight && (
                <span className="absolute inset-0 -m-1 animate-ping rounded-full bg-sky-400/40" />
              )}
              <span
                className={`relative block rounded-full ring-4 ring-white ${
                  m.highlight
                    ? 'h-5 w-5 bg-sky-500 shadow-[0_0_0_3px_rgba(14,165,233,0.25)]'
                    : 'h-4 w-4 border-[2.5px] border-sky-300 bg-white'
                }`}
              />
            </motion.div>
          ))}

          {/* labels */}
          {MARKERS.map((m, i) => (
            <motion.div
              key={m.id}
              className="absolute w-[150px] -translate-x-1/2 text-center sm:w-[180px]"
              style={{ left: pctX(xForT(m.t)), top: pctY(labelBandY + 8) }}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 1.05 + i * 0.18, duration: 0.5 }}
            >
              <span
                className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold tabular-nums tracking-wide ${
                  m.id === 'somni'
                    ? 'bg-sky-100 text-sky-700'
                    : m.id === 'notebook'
                    ? 'bg-orange-100 text-orange-600'
                    : 'bg-red-100 text-red-600'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {m.time}
              </span>
              <p
                className={`text-base font-bold ${m.highlight ? 'text-sky-700' : 'text-gray-900'}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {m.title}
              </p>
              <p
                className="mt-1 text-xs leading-snug text-gray-500"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {m.blurb}
              </p>
            </motion.div>
          ))}

          {/* axis caption */}
          <div
            className="absolute flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gray-400"
            style={{ left: pctX(PLOT.left), top: pctY(PLOT.bottom + 14) }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif" }}>Wake up</span>
            <span className="h-px w-8 bg-gray-300" />
            <span style={{ fontFamily: "'Inter', sans-serif" }}>time</span>
          </div>

          {/* y-axis caption */}
          <div
            className="absolute whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-gray-400"
            style={{
              left: pctX(16),
              top: pctY((PLOT.top + PLOT.bottom) / 2),
              transform: 'translate(-50%, -50%) rotate(-90deg)',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Dream recollection accuracy
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* How it works — scroll-driven steps                                  */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    id: 'wake',
    eyebrow: 'Step 01',
    title: 'You wake up',
    desc: 'Your alarm goes off. The instant your eyes open the clock starts — and your dream is already beginning to fade.',
  },
  {
    id: 'listen',
    eyebrow: 'Step 02',
    title: 'Somni wakes with you',
    desc: 'Somni recognizes your alarm and answers with a soft chime and a glowing ring of LEDs — letting you know it is awake and actively listening.',
  },
  {
    id: 'capture',
    eyebrow: 'Step 03',
    title: 'You speak, Somni captures',
    desc: 'Speak your dream whenever you are ready. Somni stops listening, registers it, and pushes everything to the app — analytics, patterns, insights, and AI-generated images of your dream. By the time you have had your coffee, it is all waiting for you.',
  },
];

function AlarmVisual() {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-sky-300/60"
          style={{ width: 140, height: 140 }}
          initial={{ scale: 0.6, opacity: 0.5 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
        />
      ))}
      <motion.div
        className="relative rounded-[1.75rem] bg-white px-12 py-9 text-center shadow-[0_30px_60px_-30px_rgba(2,132,199,0.35)] ring-1 ring-gray-100"
        animate={{ rotate: [0, -2.5, 2.5, -2.5, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 1.6 }}
      >
        <div
          className="text-6xl font-black tracking-tight text-gray-900"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          6:30
        </div>
        <div
          className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-600"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Alarm
        </div>
        <span className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </span>
      </motion.div>
    </div>
  );
}

function ListeningVisual({ lightProgress }) {
  const areaRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springCfg = { stiffness: 140, damping: 16, mass: 0.6 };
  const rotateX = useSpring(rx, springCfg);
  const rotateY = useSpring(ry, springCfg);

  // Scroll-driven light: off at first, turns on as you scroll down.
  // Falls back to "on" when no scroll progress is supplied (e.g. mobile inline).
  const fallback = useMotionValue(1);
  const lp = lightProgress || fallback;
  const lightOpacity = useSpring(lp, { stiffness: 90, damping: 20 });
  const ringScaleX = useTransform(lightOpacity, [0, 1], [0.45, 1]);
  const glowScale = useTransform(lightOpacity, [0, 1], [0.55, 1]);

  const handleMove = (e) => {
    const el = areaRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 38);
    rx.set(-py * 24);
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      ref={areaRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex w-full cursor-grab flex-col items-center justify-center active:cursor-grabbing"
      style={{ perspective: 1100 }}
    >
      <motion.div
        className="relative inline-block [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
        animate={{ y: [0, -12, 0] }}
        transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
      >
        {/* Somni device */}
        <img
          src="/images/somni-device-hd.png"
          alt="Somni v1 device"
          draggable={false}
          className="relative z-10 block w-[240px] max-w-[66vw] select-none drop-shadow-[0_28px_40px_rgba(15,23,42,0.22)] sm:w-[280px]"
        />

        {/* Base light — bigger, fades on as you scroll */}
        <motion.div
          className="pointer-events-none absolute bottom-[1%] left-1/2 z-0 flex -translate-x-1/2 items-center justify-center"
          style={{ opacity: lightOpacity }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute h-9 w-56 rounded-[50%] border border-sky-400/50"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.9, opacity: [0, 0.5, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}
            />
          ))}

          {/* big soft glow pool */}
          <motion.span
            className="absolute h-20 w-72 rounded-[50%] bg-sky-500/60 blur-2xl"
            style={{ scaleX: glowScale }}
            animate={{ opacity: [0.55, 0.9, 0.55] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />

          {/* the lit ring */}
          <motion.span
            className="relative h-6 w-52 rounded-[50%] bg-gradient-to-b from-sky-200 to-sky-500 shadow-[0_0_34px_10px_rgba(56,189,248,0.65)]"
            style={{ scaleX: ringScaleX }}
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      <motion.span
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600"
        style={{ fontFamily: "'Inter', sans-serif", opacity: lightOpacity }}
      >
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-sky-500"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        Listening
      </motion.span>
    </div>
  );
}

const SOMNI_APP_URL = 'https://somni-app-lemon.vercel.app/';

function AppLiveModal({ onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-gray-950/85 px-4 py-8 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.92, y: 14 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close live app"
          className="absolute -right-2 -top-12 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white ring-1 ring-white/20 transition hover:bg-white/20 sm:-right-14 sm:top-0"
        >
          ×
        </button>
        <div
          className="relative rounded-[2.75rem] bg-gray-900 p-2.5 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.8)] ring-1 ring-gray-800"
          style={{ width: 'min(92vw, 360px)', height: 'min(82vh, 720px)' }}
        >
          <div className="absolute left-1/2 top-2.5 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-gray-700" />
          <div className="h-full w-full overflow-hidden rounded-[2.25rem] bg-gray-950">
            <iframe
              src={SOMNI_APP_URL}
              title="Somni app — live demo"
              className="h-full w-full border-0"
              allow="fullscreen"
            />
          </div>
        </div>
        <p
          className="mt-5 text-center text-sm text-white/70"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Live Somni app — scroll and tap the tabs to explore the full flow.
        </p>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function AppVisual() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex items-center justify-center">
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open the live Somni app"
        className="group relative block w-[16.5rem] cursor-pointer rounded-[2.5rem] bg-gray-900 p-2.5 text-left shadow-[0_40px_80px_-30px_rgba(15,23,42,0.45)] ring-1 ring-gray-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="absolute left-1/2 top-2.5 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-gray-700" />
        <div className="relative overflow-hidden rounded-[2rem] bg-gray-950">
          <motion.img
            src="/images/somni-app-insights.png"
            alt="Somni app — Insights screen"
            draggable={false}
            className="block w-full select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6, ease: 'easeOut' }}
          />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-gray-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white ring-1 ring-white/25 backdrop-blur-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Tap and log in to explore the app
            </span>
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && <AppLiveModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

function StepVisual({ step, lightProgress }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {step === 0 && <AlarmVisual />}
      {step === 1 && <ListeningVisual lightProgress={lightProgress} />}
      {step === 2 && <AppVisual />}
    </motion.div>
  );
}

function HowItWorks() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ['start start', 'end end'],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [-34, 34]);
  const visualRotate = useTransform(scrollYProgress, [0, 1], [-3.5, 3.5]);
  // Base light: off at the start, fades on while scrolling through step 2.
  const lightProgress = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);

  return (
    <div className="mt-32">
      <div className="mb-4 max-w-2xl">
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600/90"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          The flow
        </p>
        <h2
          className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          How it works
        </h2>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-20">
        {/* Sticky visual (desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-28 flex h-[78vh] items-center justify-center">
            <motion.div
              className="relative aspect-square w-full max-w-md"
              style={{ y: visualY, rotate: visualRotate }}
            >
              <AnimatePresence mode="wait">
                <StepVisual key={active} step={active} lightProgress={lightProgress} />
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Steps */}
        <div ref={stepsRef}>
          {STEPS.map((s, i) => (
            <motion.section
              key={s.id}
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: '-45% 0px -45% 0px' }}
              className="flex min-h-[68vh] flex-col justify-center py-12 lg:min-h-[78vh]"
            >
              {/* Inline visual (mobile) */}
              <motion.div
                className="mb-10 lg:hidden"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative mx-auto aspect-square w-full max-w-xs">
                  <StepVisual step={i} />
                </div>
              </motion.div>

              <motion.div
                animate={{ opacity: active === i ? 1 : 0.35 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-5 flex items-center gap-4">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                      active === i ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-400'
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600/90"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {s.eyebrow}
                  </span>
                </div>
                <h3
                  className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {s.title}
                </h3>
                <p
                  className="max-w-md text-lg leading-relaxed text-gray-600"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {s.desc}
                </p>
              </motion.div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Form — four pieces assemble into one product                        */
/* ------------------------------------------------------------------ */

// Scroll-progress windows (0 → 1 across the tall section).
// Converge and assemble intentionally overlap: the moment all four pieces are
// on screen, a little more scroll continuously draws them together AND fades
// the finished device in — one fluid motion, no dead pause.
const FP_CONVERGE = [0.46, 0.76];
const FP_ASSEMBLE = [0.54, 0.88];

const PIECES = [
  {
    id: 'top',
    n: '01',
    label: 'Top',
    src: '/images/somni-top.png',
    reveal: [0.03, 0.13],
    fromY: -168,
    toY: -60,
    imgClass: 'w-[150px] sm:w-[168px]',
    z: 10,
  },
  {
    id: 'shell',
    n: '02',
    label: 'Shell',
    src: '/images/somni-shell.png',
    reveal: [0.13, 0.24],
    fromY: -56,
    toY: -20,
    imgClass: 'w-[176px] sm:w-[198px]',
    z: 20,
  },
  {
    id: 'middle',
    n: '03',
    label: 'Middle',
    src: '/images/somni middle.png',
    reveal: [0.23, 0.34],
    fromY: 58,
    toY: 18,
    imgClass: 'w-[164px] sm:w-[184px]',
    z: 30,
  },
  {
    id: 'base',
    n: '04',
    label: 'Base',
    src: '/images/somni-base.png',
    reveal: [0.33, 0.44],
    fromY: 172,
    toY: 60,
    imgClass: 'w-[150px] sm:w-[168px]',
    z: 40,
  },
];

function Piece({ progress, piece }) {
  const opacity = useTransform(progress, piece.reveal, [0, 1]);
  const y = useTransform(progress, FP_CONVERGE, [piece.fromY, piece.toY]);
  // ease into place rather than tracking scroll linearly
  const yEased = useSpring(y, { stiffness: 110, damping: 26, mass: 0.4 });
  const labelOpacity = useTransform(
    progress,
    [piece.reveal[0], piece.reveal[1], FP_CONVERGE[0], FP_CONVERGE[0] + 0.04],
    [0, 1, 1, 0]
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ zIndex: piece.z }}
    >
      <motion.div className="relative flex items-center justify-center" style={{ y: yEased, opacity }}>
        <img
          src={piece.src}
          alt={`Somni ${piece.label.toLowerCase()}`}
          draggable={false}
          className={`block select-none drop-shadow-[0_18px_26px_rgba(15,23,42,0.16)] ${piece.imgClass}`}
        />
        <motion.span
          className="absolute left-full ml-8 hidden items-baseline gap-2 whitespace-nowrap sm:flex"
          style={{ opacity: labelOpacity }}
        >
          <span
            className="text-[11px] font-semibold tabular-nums tracking-[0.2em] text-sky-500"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {piece.n}
          </span>
          <span
            className="text-sm font-bold text-gray-900"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {piece.label}
          </span>
        </motion.span>
      </motion.div>
    </div>
  );
}

function FourPieces() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Spring-smoothed scroll progress -> buttery, slightly lagged motion that
  // keeps moving for a beat after you stop scrolling.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
    restDelta: 0.0004,
  });

  // Exploded parts fade out as the assembled device fades in (overlapping).
  const groupOpacity = useTransform(progress, FP_ASSEMBLE, [1, 0]);
  const groupScale = useTransform(progress, FP_ASSEMBLE, [1, 0.93]);
  const hdScale = useTransform(progress, FP_ASSEMBLE, [0.9, 1]);
  const glowOpacity = useTransform(
    progress,
    [FP_ASSEMBLE[0], FP_ASSEMBLE[1], 0.93],
    [0, 0.85, 0]
  );

  const hdOpacity = useTransform(progress, [FP_ASSEMBLE[0], 0.66, 0.76, 0.84], [0, 1, 1, 0]);
  // Crossfade in by 0.84, then hold iterations on screen until section ends.
  const iterationsOpacity = useTransform(progress, [0.76, 0.84, 1], [0, 1, 1]);
  const iterationsY = useTransform(progress, [0.76, 0.84], [20, 0]);

  // Interactive mouse tilt over the whole stage.
  const stageRef = useRef(null);
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotateX = useSpring(ty, { stiffness: 130, damping: 18, mass: 0.5 });
  const rotateY = useSpring(tx, { stiffness: 130, damping: 18, mass: 0.5 });

  const handleMove = (e) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tx.set(px * 12);
    ty.set(-py * 8);
  };
  const handleLeave = () => {
    tx.set(0);
    ty.set(0);
  };

  return (
    <div ref={sectionRef} className="relative mt-16 h-[720vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-4">
        <div
          ref={stageRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="relative flex h-[min(480px,56vh)] w-full max-w-5xl items-center justify-center"
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="absolute inset-0 [transform-style:preserve-3d]"
            style={{ rotateX, rotateY }}
          >
            {/* exploded → tight stack */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: groupOpacity, scale: groupScale }}
            >
              {PIECES.map((p) => (
                <Piece key={p.id} progress={progress} piece={p} />
              ))}
            </motion.div>

            {/* assembled device */}
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{ opacity: hdOpacity, scale: hdScale }}
            >
              <div className="relative flex items-center justify-center">
                <motion.span
                  className="absolute bottom-[8%] h-16 w-64 rounded-[50%] bg-sky-500/40 blur-2xl"
                  style={{ opacity: glowOpacity }}
                />
                <img
                  src="/images/somni-device-hd.png"
                  alt="Somni v1 — assembled"
                  draggable={false}
                  className="relative block w-[280px] max-w-[78vw] select-none drop-shadow-[0_30px_50px_rgba(15,23,42,0.22)] sm:w-[320px]"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* same spot as HD — crossfade in as device fades out */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-2"
            style={{ opacity: iterationsOpacity, y: iterationsY }}
          >
            <p
              className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.28em] text-gray-900"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              After countless iterations
            </p>
            <img
              src="/images/somni-iterations-lineup.png"
              alt="Six Somni prototypes from first concept to final product"
              draggable={false}
              className="w-full max-w-4xl select-none rounded-lg object-contain"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function PartSlideIn({ src, alt }) {
  const trackRef = useRef(null);
  const imgRef = useRef(null);
  const [travel, setTravel] = useState(0);

  // Measure how far the product can slide while staying fully inside its track,
  // so the whole part is always visible — never cut off, no page overflow.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current?.offsetWidth || 0;
      const img = imgRef.current?.offsetWidth || 0;
      setTravel(Math.max(0, track - img));
    };
    measure();
    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) {
      if (trackRef.current) ro.observe(trackRef.current);
      if (imgRef.current) ro.observe(imgRef.current);
    }
    window.addEventListener('resize', measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'center center'],
  });
  // Enters from well off to the left and glides into its resting spot
  // (left-of-center). Fades in so the entry from the edge reads cleanly.
  const x = useTransform(scrollYProgress, [0, 1], [-240, travel * 0.15]);
  const xSmooth = useSpring(x, { stiffness: 70, damping: 22, mass: 0.5 });
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  return (
    <div ref={trackRef} className="mt-10 w-full overflow-hidden">
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        style={{ x: xSmooth, opacity }}
        className="w-[360px] max-w-full select-none drop-shadow-[0_24px_40px_rgba(15,23,42,0.18)] sm:w-[420px]"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Electronics tab — six components emerge from the shell              */
/* ------------------------------------------------------------------ */

const EC_COUNT = 6;
const EC_SLOT = 1 / EC_COUNT;

const EC_COMPONENTS = [
  {
    id: 'raspberry-pi',
    n: '01',
    label: 'Raspberry Pi',
    tagline: 'The brain of Somni.',
    body:
      'Powered through USB-C, the Raspberry Pi connects the main electronic components and runs the logic that controls audio input, user interaction, LED feedback, and app-connected dream journaling features.',
    src: '/images/electronics/raspberry-pi.png',
    imgClass: 'w-[130px] sm:w-[150px]',
    fromY: 88,
    toY: -152,
    xOffset: 0,
    z: 55,
  },
  {
    id: 'microphone',
    n: '02',
    label: 'Microphone',
    tagline: 'Captures dream recall through voice.',
    body:
      'The microphone listens for the phone alarm trigger and records the user’s spoken dream reflection immediately after waking, reducing the friction of writing dreams down manually.',
    src: '/images/electronics/microphone.png',
    imgClass: 'w-[64px] sm:w-[76px]',
    fromY: 92,
    toY: -148,
    xOffset: -36,
    z: 56,
  },
  {
    id: 'capacitive-touch',
    n: '03',
    label: 'Capacitive Touch Board',
    tagline: 'Creates a seamless touch interface.',
    body:
      'The capacitive touch board allows the user to interact with Somni through the silicone surface, keeping the product clean and buttonless while still enabling simple controls like start, stop, or confirm.',
    src: '/images/electronics/capacitive-touch.png',
    imgClass: 'w-[118px] sm:w-[136px]',
    fromY: 90,
    toY: -156,
    xOffset: 32,
    z: 57,
  },
  {
    id: 'i2s-amp',
    n: '04',
    label: 'Amplifier',
    tagline: 'Boosts clear audio output.',
    body:
      'The amplifier strengthens the audio signal from the Raspberry Pi so Somni can play chimes and prompt the user clearly through the speaker.',
    src: '/images/electronics/i2s-amplifier.png',
    imgClass: 'w-[100px] sm:w-[116px]',
    fromY: 86,
    toY: -150,
    xOffset: -28,
    z: 58,
  },
  {
    id: 'speaker',
    n: '05',
    label: 'Speaker',
    tagline: 'Guides the user through the recall process.',
    body:
      'The speaker plays soft audio prompts and chimes that help guide the user into recording their dream while they are still in the moment after waking.',
    src: '/images/electronics/speaker.png',
    imgClass: 'w-[88px] sm:w-[104px]',
    fromY: 94,
    toY: -154,
    xOffset: 24,
    z: 59,
  },
  {
    id: 'led-strip',
    n: '06',
    label: 'LEDs',
    tagline: 'Provides ambient system feedback.',
    body:
      'The LED ring at the base gives Somni a subtle visual language, indicating states like powered on, listening, recording, or processing.',
    src: '/images/electronics/led-strip.png',
    imgClass: 'w-[148px] sm:w-[172px]',
    fromY: 88,
    toY: -158,
    xOffset: 0,
    z: 60,
  },
];

function useComponentScrollOpacity(progress, index) {
  const riseStart = index * EC_SLOT + 0.03;
  const riseEnd = index * EC_SLOT + 0.11;
  const fadeStart = (index + 1) * EC_SLOT + 0.02;
  const fadeEnd = (index + 1) * EC_SLOT + 0.1;
  const isLast = index === EC_COUNT - 1;

  return useTransform(
    progress,
    isLast
      ? [riseStart, riseEnd, 1]
      : [riseStart, riseEnd, fadeStart, fadeEnd, 1],
    isLast ? [0, 1, 1] : [0, 1, 1, 0, 0]
  );
}

function EmergingComponent({ progress, component, index }) {
  const riseStart = index * EC_SLOT + 0.03;
  const riseEnd = index * EC_SLOT + 0.11;
  const opacity = useComponentScrollOpacity(progress, index);
  const y = useTransform(progress, [riseStart, riseEnd], [component.fromY, component.toY]);
  const yEased = useSpring(y, { stiffness: 105, damping: 24, mass: 0.38 });
  const scale = useTransform(progress, [riseStart, riseEnd], [0.38, 1]);
  const scaleEased = useSpring(scale, { stiffness: 105, damping: 24, mass: 0.38 });
  const x = useTransform(progress, [riseStart, riseEnd], [0, component.xOffset]);
  const xEased = useSpring(x, { stiffness: 105, damping: 24, mass: 0.38 });
  const zIndex = useTransform(progress, [riseStart, riseEnd], [28, component.z]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ zIndex: zIndex }}
    >
      <motion.div
        className="relative flex flex-col items-center"
        style={{ y: yEased, x: xEased, scale: scaleEased, opacity }}
      >
        <img
          src={component.src}
          alt={component.label}
          draggable={false}
          className={`block select-none drop-shadow-[0_20px_32px_rgba(15,23,42,0.2)] ${component.imgClass}`}
        />
      </motion.div>
    </motion.div>
  );
}

function ComponentCopyPanel({ progress, component, index }) {
  const opacity = useComponentScrollOpacity(progress, index);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center gap-3"
      style={{ opacity }}
    >
      <span
        className="text-[11px] font-semibold tabular-nums tracking-[0.28em] text-sky-500"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {component.n}
      </span>
      <h3
        className="text-2xl font-black tracking-tight text-gray-900 sm:text-[1.65rem]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {component.label}
      </h3>
      <p
        className="text-[15px] font-semibold leading-snug text-gray-900"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {component.tagline}
      </p>
      <p
        className="max-w-sm text-sm leading-relaxed text-gray-500"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {component.body}
      </p>
    </motion.div>
  );
}

function SixComponentsReveal() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 26,
    mass: 0.35,
    restDelta: 0.0004,
  });

  const shellGlow = useTransform(progress, [0, 0.2, 1], [0.35, 0.7, 0.85]);

  return (
    <div ref={sectionRef} className="relative mt-12 h-[580vh] -mb-28 sm:-mb-36">
      <div className="sticky top-0 flex h-screen items-center justify-center px-4 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 md:gap-14 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
          <div className="relative flex h-[min(480px,58vh)] w-full max-w-md shrink-0 items-center justify-center sm:h-[min(520px,72vh)] lg:max-w-lg">
            <motion.span
              className="pointer-events-none absolute left-1/2 top-[18%] h-[28%] w-[42%] -translate-x-1/2 rounded-full bg-sky-400/35 blur-3xl"
              style={{ opacity: shellGlow }}
              aria-hidden
            />

            {EC_COMPONENTS.map((c, i) => (
              <EmergingComponent key={c.id} progress={progress} component={c} index={i} />
            ))}

            <img
              src="/images/electronics/somni-shell-hollow.png"
              alt="Somni shell — hollow interior"
              draggable={false}
              className="relative z-40 w-full max-w-[min(340px,88vw)] select-none drop-shadow-[0_32px_48px_rgba(15,23,42,0.14)]"
            />
          </div>

          <div className="relative w-full max-w-md text-center lg:max-w-[340px] lg:flex-1 lg:pl-4 lg:text-left xl:max-w-[380px]">
            <div className="relative min-h-[200px] lg:min-h-[260px]">
              {EC_COMPONENTS.map((c, i) => (
                <ComponentCopyPanel
                  key={c.id}
                  progress={progress}
                  component={c}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const STACK_TOP_Z = 50;

function syncProcessVideoMute(video, wantsSound) {
  video.muted = !wantsSound;
  video.defaultMuted = !wantsSound;
  if (!wantsSound) video.setAttribute('muted', '');
  else video.removeAttribute('muted');
}

function playProcessVideo(video, wantsSound) {
  syncProcessVideoMute(video, false);
  const attempt = (withSound) => {
    syncProcessVideoMute(video, withSound);
    const p = video.play();
    if (p?.catch) {
      p.catch(() => {
        if (withSound) attempt(false);
      });
    }
  };
  attempt(wantsSound);
}

function ProcessAutoplayVideo({
  src,
  label,
  className = '',
  videoRef,
  wantsSound = false,
}) {
  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted={!wantsSound}
      playsInline
      preload="auto"
      aria-label={label}
      className={className}
    />
  );
}

const PROCESS_VIDEOS = [
  {
    id: 'v3',
    src: '/videos/electronics-process/IMG_7256.mp4',
    label: 'Electronics assembly — component fitting',
    sideCopy:
      'With the MPR121 board wired up and copper touch pads on the shell exterior, we worked through every control over capacitive touch—checking connectivity before any silicone went on, then testing volume up and down and the active-listening toggle with audio from the speaker and visual feedback through the LEDs.',
  },
  {
    id: 'v2',
    src: '/videos/electronics-process/IMG_8190.mp4',
    label: 'Electronics assembly — enclosure integration',
    sideCopy:
      'Testing capacitive touch and button response through the silicone shell. We experimented with copper pad height and thickness, and soldered leads directly to the pads instead of wrapping wire around them—small changes that made a real difference in sensitivity and reliability.',
  },
  {
    id: 'v1',
    src: '/videos/electronics-process/IMG_7231.mp4',
    label: 'Electronics assembly — base wiring',
    sideCopy:
      'Testing visual feedback through the LED ring—our first real glimpse of Somni with light. Seeing the industrial design come through in software, not just on a bench, made the product feel tangible for the first time.',
  },
  {
    id: 'v4',
    src: '/videos/electronics-process/IMG_7232.mp4',
    label: 'Electronics assembly — bench testing',
    sideCopy:
      'Syncing audio and visual feedback end to end—testing that every interaction felt right, and that the overall vibe matched what we wanted when Somni prompts you to speak your dream.',
  },
];

const VIDEO_STACK_LAYOUT = [
  { top: 0, left: 0, rotate: -2.5 },
  { top: 22, left: 18, rotate: 1.5 },
  { top: 44, left: 36, rotate: -1 },
  { top: 66, left: 54, rotate: 2 },
];

const PROCESS_PHOTOS = [
  {
    src: '/images/electronics/process/bench-assembly.png',
    alt: 'Bench assembly — Pi, LED ring, and Somni shell',
  },
  {
    src: '/images/electronics/process/mpr121-wiring.png',
    alt: 'MPR121 capacitive touch board wired inside the enclosure',
  },
  {
    src: '/images/electronics/process/capacitive-prototype.png',
    alt: 'Early capacitive touch prototype with foil electrodes',
  },
  {
    src: '/images/electronics/process/shell-wiring.png',
    alt: 'Signal wires routed through the printed shell',
  },
  {
    src: '/images/electronics/process/raspberry-pi-bench.png',
    alt: 'Raspberry Pi Zero wired on the workbench',
  },
  {
    src: '/images/electronics/process/board-soldering.png',
    alt: 'Touch sensor board held for soldering and inspection',
  },
];

const SWIPE_OFF_THRESHOLD = 72;
const SWIPE_VELOCITY = 380;

function ProcessVideoCard({
  video,
  layout,
  isTop,
  onDismiss,
  exitDirection = 1,
  zIndex,
  soundUnlocked = false,
  onToggleSound,
  isExiting = false,
  registerVideoRef,
}) {
  const cardClass = isTop
    ? 'absolute w-[82%] cursor-grab overflow-hidden rounded-2xl bg-gray-950 shadow-[0_20px_40px_rgba(15,23,42,0.18)] ring-1 ring-gray-200/80 active:cursor-grabbing'
    : 'absolute w-[82%] overflow-hidden rounded-2xl bg-gray-950 shadow-[0_20px_40px_rgba(15,23,42,0.18)] ring-1 ring-gray-200/80 pointer-events-none';

  return (
    <motion.div
      data-stack-card
      className={cardClass}
      style={{ top: layout.top, left: layout.left, zIndex }}
      drag={isTop && !isExiting ? 'x' : false}
      dragConstraints={isTop ? { left: 0, right: 0 } : false}
      dragElastic={0.85}
      dragMomentum={false}
      whileDrag={isTop ? { scale: 1.02, cursor: 'grabbing' } : undefined}
      onTap={isTop ? onToggleSound : undefined}
      onDragEnd={
        isTop
          ? (_, info) => {
              if (isExiting) return;
              const off = info.offset.x;
              const vel = info.velocity.x;
              if (
                Math.abs(off) > SWIPE_OFF_THRESHOLD ||
                Math.abs(vel) > SWIPE_VELOCITY
              ) {
                onDismiss(off >= 0 ? 1 : -1);
              }
            }
          : undefined
      }
      initial={false}
      animate={
        isTop && isExiting
          ? {
              x: exitDirection * 420,
              opacity: 0,
              rotate: layout.rotate + exitDirection * 10,
            }
          : { opacity: 1, scale: 1, x: 0, rotate: layout.rotate }
      }
      transition={
        isTop && isExiting
          ? { duration: 0.32, ease: [0.32, 0.72, 0, 1] }
          : { duration: 0.35, ease: 'easeOut' }
      }
    >
      <ProcessAutoplayVideo
        src={video.src}
        label={video.label}
        videoRef={(node) => registerVideoRef(video.id, node)}
        wantsSound={isTop && soundUnlocked}
        className="pointer-events-none aspect-[4/5] w-full object-cover"
      />
    </motion.div>
  );
}

function ProcessVideoStack({
  align = 'center',
  topIndex: topIndexProp,
  onTopIndexChange,
} = {}) {
  const [topIndexInternal, setTopIndexInternal] = useState(0);
  const topIndex = topIndexProp ?? topIndexInternal;
  const setTopIndex = onTopIndexChange ?? setTopIndexInternal;
  const [exitDir, setExitDir] = useState(1);
  const [soundUnlocked, setSoundUnlocked] = useState(false);
  const [stackInView, setStackInView] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [hintSpacer, setHintSpacer] = useState(56);
  const stackRef = useRef(null);
  const videoRefs = useRef({});
  const topIndexRef = useRef(topIndex);
  const soundRef = useRef(soundUnlocked);
  const stackInViewRef = useRef(stackInView);
  topIndexRef.current = topIndex;
  soundRef.current = soundUnlocked;
  stackInViewRef.current = stackInView;

  const registerVideoRef = (id, node) => {
    if (node) {
      videoRefs.current[id] = node;
      if (
        stackInViewRef.current &&
        id === PROCESS_VIDEOS[topIndexRef.current]?.id
      ) {
        playProcessVideo(node, soundRef.current);
      }
    } else {
      delete videoRefs.current[id];
    }
  };

  const syncStackPlayback = () => {
    const topId = PROCESS_VIDEOS[topIndexRef.current]?.id;
    const inView = stackInViewRef.current;
    const wantsSound = soundRef.current;

    PROCESS_VIDEOS.forEach(({ id }) => {
      const el = videoRefs.current[id];
      if (!el) return;

      if (inView && id === topId) {
        playProcessVideo(el, wantsSound);
      } else {
        el.pause();
      }
    });
  };

  useLayoutEffect(() => {
    syncStackPlayback();
  }, [topIndex, stackInView, soundUnlocked]);

  useEffect(() => {
    const cleanups = PROCESS_VIDEOS.map(({ id }) => {
      const el = videoRefs.current[id];
      if (!el) return undefined;

      const onReady = () => {
        if (id === PROCESS_VIDEOS[topIndexRef.current]?.id && stackInViewRef.current) {
          playProcessVideo(el, soundRef.current);
        }
      };

      ['loadeddata', 'canplay', 'canplaythrough'].forEach((e) =>
        el.addEventListener(e, onReady)
      );

      return () => {
        ['loadeddata', 'canplay', 'canplaythrough'].forEach((e) =>
          el.removeEventListener(e, onReady)
        );
      };
    });

    return () => cleanups.forEach((fn) => fn?.());
  }, [topIndex]);

  useEffect(() => {
    const el = stackRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStackInView(entry.isIntersecting);
        if (!entry.isIntersecting) {
          PROCESS_VIDEOS.forEach(({ id }) => videoRefs.current[id]?.pause());
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => setSoundUnlocked((on) => !on);

  const measureStackOverflow = useCallback(() => {
    const root = stackRef.current;
    if (!root) return;

    let maxBottom = 0;
    root.querySelectorAll('[data-stack-card]').forEach((node) => {
      maxBottom = Math.max(maxBottom, node.offsetTop + node.offsetHeight);
    });

    setHintSpacer(Math.max(56, maxBottom - root.offsetHeight + 40));
  }, []);

  useLayoutEffect(() => {
    measureStackOverflow();
    const root = stackRef.current;
    if (!root || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(measureStackOverflow);
    observer.observe(root);
    window.addEventListener('resize', measureStackOverflow);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureStackOverflow);
    };
  }, [topIndex, measureStackOverflow]);

  const dismissTop = (direction) => {
    if (isExiting) return;
    setExitDir(direction);
    setIsExiting(true);
    window.setTimeout(() => {
      setTopIndex((i) => (i + 1) % PROCESS_VIDEOS.length);
      setIsExiting(false);
      requestAnimationFrame(() => syncStackPlayback());
    }, 320);
  };

  const alignClass =
    align === 'end' ? 'ml-auto mr-0' : 'mx-auto';

  return (
    <div className={`relative w-full max-w-md ${alignClass}`}>
      <div className="mb-6 text-left sm:mb-8">
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600/90"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Function
        </p>
        <h3
          className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Putting it all together.
        </h3>
      </div>

      <div
        ref={stackRef}
        className="relative h-[min(420px,58vw)] w-full overflow-visible sm:h-[460px]"
      >
        {PROCESS_VIDEOS.map((video, videoIdx) => {
          const stackOrder =
            (videoIdx - topIndex + PROCESS_VIDEOS.length) %
            PROCESS_VIDEOS.length;
          const isTop = stackOrder === 0;

          return (
            <ProcessVideoCard
              key={video.id}
              video={video}
              layout={VIDEO_STACK_LAYOUT[stackOrder]}
              zIndex={STACK_TOP_Z - stackOrder}
              isTop={isTop}
              isExiting={isTop && isExiting}
              registerVideoRef={registerVideoRef}
              soundUnlocked={soundUnlocked}
              onToggleSound={toggleSound}
              exitDirection={exitDir}
              onDismiss={dismissTop}
            />
          );
        })}
      </div>
      <div aria-hidden style={{ height: hintSpacer }} className="shrink-0" />
      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 ${
          align === 'end' ? 'text-right' : 'text-center'
        }`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Swipe the top clip → · tap for sound on / off
      </p>
      <p
        className={`mt-4 text-xs tabular-nums text-gray-400 ${
          align === 'end' ? 'text-right' : 'text-center'
        }`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {topIndex + 1} / {PROCESS_VIDEOS.length}
      </p>
    </div>
  );
}

function ProcessVideoSection() {
  const [topIndex, setTopIndex] = useState(0);
  const activeVideo = PROCESS_VIDEOS[topIndex];
  const activeSideCopy = activeVideo?.sideCopy;

  return (
    <motion.div
      className="mt-10 grid items-stretch gap-10 lg:mt-8 lg:grid-cols-2 lg:gap-x-16"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
    >
      <div className="relative lg:h-full lg:pr-6">
        <div className="max-lg:py-2 lg:absolute lg:inset-x-0 lg:bottom-32 lg:top-[7.25rem] lg:flex lg:items-center">
          <AnimatePresence mode="wait">
            {activeSideCopy ? (
              <motion.p
                key={activeVideo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="max-w-lg text-base leading-relaxed text-gray-600"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {activeSideCopy}
              </motion.p>
            ) : (
              <span className="sr-only">No description for this clip</span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-end lg:justify-end">
        <ProcessVideoStack
          align="end"
          topIndex={topIndex}
          onTopIndexChange={setTopIndex}
        />
      </div>
    </motion.div>
  );
}

function ProcessPhotoCluster() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {PROCESS_PHOTOS.map((photo) => (
        <figure
          key={photo.src}
          className="overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200/70"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            draggable={false}
            loading="lazy"
            className="aspect-[4/5] w-full select-none object-cover"
          />
        </figure>
      ))}
    </div>
  );
}

function ElectronicsProcessSection() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pb-32 pt-4 sm:px-8">
      <motion.div
        className="mb-10 max-w-2xl lg:mb-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600/90"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Process
        </p>
        <h2
          className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Building and integrating
        </h2>
      </motion.div>

      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-x-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <ProcessPhotoCluster />
        </motion.div>

        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.06 }}
          >
            <div
              className="flex max-w-md flex-col gap-4 text-base leading-relaxed text-gray-600"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <p>
                Somni&apos;s internal system was built around two main pathways: electronics
                and physical integration. The microphone, speaker, amplifier, LEDs, and
                capacitive touch board all connected back to the Raspberry Pi, through GPIO
                pins and the microphone connecting directly through USB-C using an extension
                cable.
              </p>
              <p>
                Once everything worked on the bench, the bigger challenge was fitting it
                cleanly inside the enclosure. Some components were held with designed-in
                mounting points and M2 screws, while others required double-sided tape or hot
                glue when the original fixturing did not work as planned.
              </p>
              <p>
                The capacitive touch system required the most careful integration. The copper
                pads, solder joints, and wires had to stay clean and still so the touch input
                would stay sensitive without false triggering through the silicone surface.
              </p>
              <p>
                Early enclosure tests showed that a working circuit on the bench does not
                always survive assembly. Wires shifted, connections loosened, and tight internal
                packaging created new issues, making wire routing and strain relief just as
                important as the electronics themselves.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <ProcessVideoSection />
    </section>
  );
}

function ElectronicsTab() {
  return (
    <div className="mt-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1
          className="text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-6xl"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Six main components, one{' '}
          <span className="text-sky-600">function</span>.
        </h1>
      </div>

      <SixComponentsReveal />
      <ElectronicsProcessSection />
    </div>
  );
}

function FormTab() {
  return (
    <div className="mt-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1
          className="text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-6xl"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Four pieces into one{' '}
          <span className="text-sky-600">form</span>.
        </h1>
      </div>

      <FourPieces />

      <section className="mt-24 lg:mt-40">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:items-start">
          {/* Left — title, subtext, photo */}
          <motion.div
            className="flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-4">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                1
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600/90"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Part One: The Top
              </span>
            </div>
            <p
              className="mt-5 max-w-sm text-base leading-relaxed text-gray-500"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Resin-printed acoustic enclosure housing the speaker and microphone
            </p>
            <PartSlideIn src="/images/somni-top.png" alt="Somni top — acoustic enclosure" />
          </motion.div>

          {/* Right — process photos + caption */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: '/images/somni-top-pla-white.png', alt: 'White PLA-printed prototype of the top' },
                { src: '/images/somni-top-pressfit.png', alt: 'Finished top press-fit into the Somni body' },
                { src: '/images/somni-top-mesh.png', alt: 'Fabric acoustic mesh fitted to the enclosure' },
                { src: '/images/somni-top-resin-front.png', alt: 'Resin-printed black top with acoustic mesh' },
              ].map((photo) => (
                <figure
                  key={photo.src}
                  className="overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200/70"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    draggable={false}
                    className="aspect-square w-full select-none object-cover"
                  />
                </figure>
              ))}
            </div>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-gray-600"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              The first prototype was PLA-printed in white to lock in the geometry,
              making sure it press-fit smoothly into the main enclosure. I also
              designed enclosure mounts for the speaker and microphone we were
              using, with optimal placement—hearing and audio feedback were
              prominent factors. Chasing a cleaner surface finish, I
              switched to resin printing in black V5 material — giving the
              enclosure its smooth, finished feel. A fabric acoustic mesh wraps the
              speaker face to complete the design.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mt-24 lg:mt-40">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:items-start">
          {/* Left — title, subtext, photo */}
          <motion.div
            className="flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-4">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                2
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600/90"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Part Two: Silicone Shell
              </span>
            </div>
            <p
              className="mt-5 max-w-sm text-base leading-relaxed text-gray-500"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              A silicone molded sleeve to give a professional and sleek feel
            </p>
            <PartSlideIn src="/images/somni-shell.png" alt="Somni silicone shell" />
          </motion.div>

          {/* Right — process photos + caption */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: '/images/somni-shell-mold.png', alt: 'PLA-printed mold cavity for the silicone shell' },
                { src: '/images/somni-shell-pour.png', alt: 'Pouring silicone into the taped mold' },
                { src: '/images/somni-shell-cast.png', alt: 'Cast silicone shell curing in the mold' },
                { src: '/images/somni-shell-demold.png', alt: 'Demolding the cured silicone shell' },
                { src: '/images/somni-shell-test.png', alt: 'A test pull revealing the cavity geometry' },
                { src: '/images/somni-shell-final.png', alt: 'Finished silicone shells in two colorways' },
              ].map((photo) => (
                <figure
                  key={photo.src}
                  className="overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200/70"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    draggable={false}
                    className="aspect-square w-full select-none object-cover"
                  />
                </figure>
              ))}
            </div>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-gray-600"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Through multiple cavity design iterations—adjusting thicknesses,
              button displays, and overall mold coverage—I landed on a final design
              and worked to achieve a consistent finish through post-processing the
              cavity, testing different pouring methods, and experimenting with
              pigment to create a darker color. Both the cavity and core were PLA 3D
              printed for mold fabrication. In total, I designed approximately five
              different cavities + cores, resulting in four unique mold and design
              variations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mt-24 lg:mt-40">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:items-start">
          {/* Left — title, subtext, photo */}
          <motion.div
            className="flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-4">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                3
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600/90"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Part Three: Main Enclosure
              </span>
            </div>
            <p
              className="mt-5 max-w-sm text-base leading-relaxed text-gray-500"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              A PLA printed enclosure supporting internal and external electronic
              infrastructure
            </p>
            <PartSlideIn
              src="/images/somni middle.png"
              alt="Somni main enclosure — PLA printed"
            />
          </motion.div>

          {/* Right — process photos + caption */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  src: '/images/somni-middle-capacitive.png',
                  alt: 'Early PLA enclosure form with external capacitive touch pad',
                },
                {
                  src: '/images/somni-middle-internal.png',
                  alt: 'Internal cavity with mounting points for electronics',
                },
                {
                  src: '/images/somni-middle-pads.png',
                  alt: 'Capacitive touch pads mounted on the external enclosure',
                },
                {
                  src: '/images/somni-middle-wiring.png',
                  alt: 'Wiring routed from external capacitive touch pads',
                },
              ].map((photo) => (
                <figure
                  key={photo.src}
                  className="overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200/70"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    draggable={false}
                    className="aspect-square w-full select-none object-cover"
                  />
                </figure>
              ))}
            </div>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-gray-600"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              I 3D printed an enclosure with hardware dimensions/positioning and
              product shape in
              mind. I went through many different forms of the shape, constantly
              iterating size and mounting for electronics. I added pads for capacitive
              touch pads on the external side.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mt-24 lg:mt-40">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:items-start">
          {/* Left — title, subtext, photo */}
          <motion.div
            className="flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-4">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                4
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600/90"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Part Four: The Base
              </span>
            </div>
            <p
              className="mt-5 max-w-sm text-base leading-relaxed text-gray-500"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              A clear printed base anchoring the device and housing the LED light ring
            </p>
            <PartSlideIn src="/images/somni-base.png" alt="Somni base" />
          </motion.div>

          {/* Right — process photos */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  src: '/images/somni-base-iteration.png',
                  alt: 'Early base print iteration and form testing',
                },
                {
                  src: '/images/somni-base-fit.png',
                  alt: 'Translucent base checked against the main enclosure',
                },
                {
                  src: '/images/somni-base-electronics.png',
                  alt: 'Raspberry Pi and LED ring mounted in the base',
                },
                {
                  src: '/images/somni-base-feet.png',
                  alt: 'Finished base with grip feet on the underside',
                },
              ].map((photo) => (
                <figure
                  key={photo.src}
                  className="overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200/70"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    draggable={false}
                    className="aspect-square w-full select-none object-cover"
                  />
                </figure>
              ))}
            </div>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-gray-600"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              I resin printed the base with clear V5 material. This gave me optimal
              transparency for our LEDs. I also worked with Raspberry Pi dimensioning
              as it would sit in the base of our product. The base was press-fit into
              the main enclosure, and I printed TPU feet to ensure the product was
              stable.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function SomniWaitlistCta() {
  return (
    <section className="mt-24 border-t border-gray-200/80 pt-16 text-center lg:mt-32 lg:pt-20">
      <h2
        className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Want your own Somni?
      </h2>
      <p
        className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-600"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        We&apos;re building Somni v2 and plan to launch this summer—join the waitlist
        to be first in line.
      </p>
      <a
        href={SOMNI_WAITLIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-sky-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(2,132,199,0.55)] transition-colors duration-300 hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Join Somni Waitlist
      </a>
    </section>
  );
}

const SomniPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('project');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <ProjectDetailBackNav />

      <Navigation currentPage="projects" isHeaderVisible={true} />

      <motion.div
        className="mx-auto max-w-6xl px-8 pt-32 pb-24"
        initial={{ opacity: 0, y: 16 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-3">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-2 text-xl font-semibold tracking-[-0.01em] transition-colors duration-300 focus:outline-none ${
                  isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="somni-tab-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-sky-600/90"
                  />
                )}
              </button>
            );
          })}
        </div>

        {activeTab === 'project' && (
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="mb-3 text-7xl font-black uppercase leading-none tracking-tight text-gray-900 md:text-9xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              SOMNI
            </h1>
            <RecallTimeline />
            <HowItWorks />
          </motion.div>
        )}

        {activeTab === 'form' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FormTab />
          </motion.div>
        )}

        {activeTab === 'electronics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ElectronicsTab />
          </motion.div>
        )}

        <SomniWaitlistCta />
      </motion.div>
    </div>
  );
};

export default SomniPage;
