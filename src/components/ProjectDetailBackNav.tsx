import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export function ProjectDetailBackNav() {
  const router = useRouter();

  return (
    <motion.button
      type="button"
      aria-label="Back to all projects"
      className="group fixed top-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-stone-300/90 bg-white text-stone-600 shadow-[0_2px_8px_rgba(15,23,42,0.07),0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.03] backdrop-blur-sm transition-[color,background-color,border-color,transform,box-shadow,ring-color] duration-300 ease-out hover:border-sky-400/45 hover:bg-sky-400/[0.09] hover:text-sky-800/90 hover:shadow-[0_14px_32px_-8px_rgba(56,189,248,0.18),0_4px_14px_rgba(14,165,233,0.1)] hover:ring-sky-300/35 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/25 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] active:border-sky-400/35 active:bg-sky-400/[0.06] active:shadow-[0_2px_8px_rgba(14,165,233,0.12)]"
      onClick={() => router.push('/physical-projects')}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <svg
        className="h-6 w-6 translate-x-px transition-transform duration-300 ease-out group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.65}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M15 19l-7-7 7-7" />
      </svg>
    </motion.button>
  );
}
