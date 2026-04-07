// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { ProjectDetailBackNav } from '@/components/ProjectDetailBackNav';
import { ProjectSkillPills } from '@/components/ui/skill-pill';
import { LightboxImage } from '@/components/ImageLightbox';

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
            <LightboxImage loading="lazy" decoding="async" src={item.src} alt={item.alt} className={tile} />
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
          <div className="min-w-0">
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl font-black text-gray-900 mb-8 md:mb-10 tracking-tight leading-none uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Winter Wave
            </motion.h1>

            {/* Image vertically centered with subtitle + intro body only (not title or pills) */}
            <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.14fr)] gap-10 lg:gap-16 xl:gap-20 items-center">
              <div className="min-w-0 space-y-6">
                <p
                  className="text-xl sm:text-2xl font-medium text-gray-600 uppercase tracking-[-0.05em]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  CNC Machined Bottle Opener
                </p>
                <div className="space-y-4 max-w-3xl text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <p className="text-base sm:text-lg leading-relaxed">
                    For my ME 128 mid-quarter project, I created a CNC machined bottle opener inspired by the geometry of an ocean wave. As someone who loves the ocean and surfing, I was immediately drawn to the complex curvature and motion of a breaking wave.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    With my first major CNC project, I wanted to test the capabilities of precision subtractive manufacturing by modeling and machining a complex 3D form that still functioned as a reliable tool. I took this project from early design sketches through CAD modeling, CAM programming, machining, finishing, and final assembly. It was my first true end-to-end exposure to CNC manufacturing and gave me a strong appreciation for the relationship between design intent and manufacturability.
                  </p>
                </div>
              </div>

              <motion.div
                variants={imageVariants}
                className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl justify-self-center md:justify-self-end shrink-0 min-w-0"
              >
                {/* Same proportions as Wave1.jpg (822×622): no new letterboxing. Slight zoom + origin recenters the piece without a wider/shorter frame. */}
                <div className="relative w-full aspect-[822/622] overflow-hidden rounded-2xl bg-gradient-to-b from-stone-50 to-stone-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] ring-1 ring-stone-200/90">
                  <LightboxImage
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    src="/images/Wave1.jpg"
                    alt="Winter Wave bottle opener design"
                    className="absolute inset-0 h-full w-full object-cover origin-[50%_58%] scale-[1.1]"
                  />
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-8 md:mt-10">
              <ProjectSkillPills labels={WINTER_WAVE_SKILLS} />
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
              <div className="space-y-6 text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                <p>
                  I spent a significant amount of time designing and refining this piece through multiple iterations. My focus was on balancing three key factors: an ergonomic feel in hand, a visually compelling wave geometry, and a functional bottle opening interface.
                </p>
                <p>
                  Throughout the design process, I explored different assembly concepts with workholding in mind, evaluated the potential of different materials and multi-part constructions, and tested optimal angles for cracking a bottle cap. Prototyping allowed me to validate grip, leverage, and geometry before committing to machining, reinforcing the importance of designing not just for appearance, but for performance and manufacturability.
                </p>
              </div>
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
              <div className="space-y-6 text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                <p>
                  Before moving to CNC machining, I prototyped the form to validate the geometry, grip, leverage, and interaction with a bottle cap. This stage helped me understand how the wave could feel like an art piece while still functioning as a practical tool.
                </p>
                <p>
                  Most of my time in prototyping was spent finding the optimal distance between the lip of the opener and the flat of the wave, which determined how effectively the opener could engage the cap. I started with PLA prints, then moved to laser-cut acrylic so I could iterate faster and get more consistent results under load before committing to CNC machining.
                </p>
              </div>
            </motion.div>
            <motion.div className="order-1 lg:order-2" variants={imageVariants}>
              <ImageGrid items={PROTO_IMAGES} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mb-20" variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-12 lg:items-stretch">
            <motion.div
              variants={imageVariants}
              className="flex min-h-0 min-w-0 flex-col gap-4 lg:h-full"
            >
              <div className="shrink-0">
                <ImageGrid items={CNC_IMAGES} />
              </div>
              <div className="relative min-h-[20rem] w-full flex-1 overflow-hidden rounded-md bg-stone-100">
                <LightboxImage
                  loading="lazy"
                  decoding="async"
                  src="/images/wavess.jpg"
                  alt="Winter Wave CNC manufacturing detail"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_47%]"
                />
              </div>
            </motion.div>
            <motion.div className="min-w-0 space-y-12" variants={itemVariants}>
              <div className="space-y-4">
                <h2
                  className="text-4xl font-bold text-gray-900 uppercase tracking-tight"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  CNC machining &amp; manufacturing
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  My machining process consisted of four setups that required careful planning and workholding. The longest operations were finishing passes using a 1/8&quot; ball end mill to achieve a smooth and consistent surface across the complex wave geometry. These passes required thoughtful toolpath strategy and attention to step-over to maintain both surface quality and dimensional accuracy.
                </p>
              </div>

              <div className="space-y-6">
                <h2
                  className="text-4xl font-bold text-gray-900 uppercase tracking-tight"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Manufacturing challenge
                </h2>
                <div className="space-y-6 text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <p>
                    The biggest challenge in this project was workholding and vibration while machining the wave geometry. To create the shape, I extended the stock out of the vise as a cantilever and machined halfway into the part before flipping and repeating the process on the opposite side.
                  </p>
                  <p>
                    As the material thinned, the unsupported stock deflected slightly under cutting forces, leaving a small offset. I resolved this by rerunning the finishing pass with a deeper boundary. This reinforced the importance of proper support and consistent workholding, even during finishing operations.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h2
                  className="text-4xl font-bold text-gray-900 uppercase tracking-tight"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Finishing &amp; assembly
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  After machining, I finished the part by sanding up to 2000 grit to achieve a smooth surface finish. I then laser cut a 0.25&quot; steel surfer silhouette and press-fit it into a machined slot in the base of the opener. The part was then ready for use.
                </p>
              </div>

              <div className="space-y-6">
                <h2
                  className="text-4xl font-bold text-gray-900 uppercase tracking-tight"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Key takeaways
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  This project reinforced the importance of consistent setup, reliable workholding, and iterating before machining. Prototyping allowed me to refine geometry and ergonomics early, making the final machining process more predictable and efficient.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WinterWavePage;
