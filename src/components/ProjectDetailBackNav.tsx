import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export function ProjectDetailBackNav() {
  const router = useRouter();

  return (
    <motion.button
      type="button"
      aria-label="Back to all projects"
      className="fixed top-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/80 bg-white/95 text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-colors hover:bg-white hover:border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20"
      onClick={() => router.push('/physical-projects')}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </motion.button>
  );
}
