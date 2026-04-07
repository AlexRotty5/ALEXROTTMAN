import React from 'react';
import { motion } from 'framer-motion';

export function SkillPill({ label }: { label: string }) {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ y: 0, scale: 0.98 }}
      className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium select-none"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {label}
    </motion.span>
  );
}

export function ProjectSkillPills({ labels, className = '' }: { labels: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {labels.map((label) => (
        <SkillPill key={label} label={label} />
      ))}
    </div>
  );
}
