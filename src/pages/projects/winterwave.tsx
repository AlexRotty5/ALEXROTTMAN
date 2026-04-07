// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { ProjectDetailBackNav } from '@/components/ProjectDetailBackNav';
import { ProjectSkillPills } from '@/components/ui/skill-pill';

const WINTER_WAVE_SKILLS = [
  'Concept Sketching',
  'CAD',
  'CAM / CNC',
  'Prototyping',
  'Manufacturing',
];

const CONCEPT_IMAGES = [2, 3, 4, 5, 6, 7].map((n) => ({
  src: `/images/Wave${n}.jpg`,
  alt: `Concept sketch and design process ${n - 1}`,
}));

const PROTO_IMAGES = [8, 9, 10, 11, 12, 13].map((n) => ({
  src: `/images/Wave${n}.jpg`,
  alt: `Prototyping and iteration ${n - 7}`,
  /* Wave10: important detail sits low in frame — anchor crop to the bottom, same tile size as others */
  ...(n === 10 ? { cropClass: 'object-bottom' } : {}),
}));

const CNC_IMAGES = [14, 15, 16, 17, 18, 19, 20].map((n) => ({
  src: `/images/Wave${n}.jpg`,
  alt: `CNC machining and manufacturing ${n - 13}`,
}));

const imgTileClass =
  'w-full h-56 sm:h-64 object-cover rounded-md bg-stone-100';

function ImageGrid({ items }: { items: { src: string; alt: string; cropClass?: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, i) => {
        const crop = item.cropClass ?? 'object-center';
        const tile =
          items.length % 2 === 1 && i === items.length - 1
            ? `${imgTileClass} max-w-2xl w-full ${crop}`
            : `${imgTileClass} ${crop}`;
        return (
          <div
            key={item.src}
            className={
              items.length % 2 === 1 && i === items.length - 1
                ? 'col-span-2 flex justify-center'
                : ''
            }
          >
            <img loading="lazy" decoding="async" src={item.src} alt={item.alt} className={tile} />
          </div>
        );
      })}
    </div>
  );
}

const WinterWavePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9 } },
  };

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <ProjectDetailBackNav />
      <Navigation currentPage="projects" isHeaderVisible={true} />

      <motion.div
        className="pt-32 pb-24 px-8 max-w-6xl mx-auto w-full min-w-0"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
      >
        <motion.div className="mb-20" variants={itemVariants}>
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.14fr)] gap-10 lg:gap-16 xl:gap-20 items-center">
            <div className="min-w-0">
              <motion.h1
                className="text-6xl sm:text-7xl md:text-8xl font-black text-gray-900 mb-6 tracking-tight leading-none uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Winter Wave
              </motion.h1>
              <p
                className="text-xl sm:text-2xl font-medium text-gray-600 mb-6 uppercase tracking-[-0.05em]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                CNC machined bottle opener
              </p>
              <div className="space-y-4 max-w-3xl text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>
                <p className="text-base sm:text-lg leading-relaxed">
                  My goal was to create a bottle opener that doesn&apos;t read as a typical tool—something that could sit on a desk as a fun, sculptural piece while still working reliably.
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  I took it from sketching and form studies through physical iterations and CNC machining, balancing the wave-like silhouette with clear function and manufacturability.
                </p>
              </div>
              <motion.div variants={itemVariants} className="mt-8">
                <ProjectSkillPills labels={WINTER_WAVE_SKILLS} />
              </motion.div>
            </div>

            <motion.div
              variants={imageVariants}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl justify-self-center md:justify-self-end shrink-0 min-w-0"
            >
              <img
                loading="eager"
                fetchPriority="high"
                decoding="async"
                src="/images/Wave1.jpg"
                alt="Winter Wave bottle opener design"
                className="w-full h-auto rounded-2xl object-contain bg-gradient-to-b from-stone-50 to-stone-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] ring-1 ring-stone-200/90"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mb-20" variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={imageVariants}>
              <ImageGrid items={CONCEPT_IMAGES} />
            </motion.div>
            <motion.div className="space-y-4" variants={itemVariants}>
              <h2
                className="text-4xl font-bold text-gray-900 uppercase tracking-tight"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Concept sketching &amp; design process
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                I explored organic wave geometry, proportions, and how the opener would be held and used—sketching variations until the form felt both playful and machinable from solid stock.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mb-20" variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div className="order-2 lg:order-1 space-y-4" variants={itemVariants}>
              <h2
                className="text-4xl font-bold text-gray-900 uppercase tracking-tight"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Prototyping &amp; iterations
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Physical prototypes helped validate grip, leverage, and the interaction with a cap. Each iteration refined the curve, thickness, and edge conditions before committing to CNC.
              </p>
            </motion.div>
            <motion.div className="order-1 lg:order-2" variants={imageVariants}>
              <ImageGrid items={PROTO_IMAGES} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mb-20" variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={imageVariants}>
              <ImageGrid items={CNC_IMAGES} />
            </motion.div>
            <motion.div className="space-y-4" variants={itemVariants}>
              <h2
                className="text-4xl font-bold text-gray-900 uppercase tracking-tight"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                CNC machining &amp; manufacturing
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                CAM and machine work focused on holding the part securely through 3D contours, managing tool reach, and finishing surfaces so the wave reads cleanly in hand and on the desk.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WinterWavePage;
