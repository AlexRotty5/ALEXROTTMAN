// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { ProjectDetailBackNav } from '@/components/ProjectDetailBackNav';
import { ProjectSkillPills } from '@/components/ui/skill-pill';

const EGG_HOLDER_SKILLS = [
  'CAD',
  'Materials Knowledge',
  'Creativity',
  'Manufacturing Processes',
  'DFM',
];

const EggHolderPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1 }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ProjectDetailBackNav />

      {/* Navigation */}
      <Navigation currentPage="projects" isHeaderVisible={true} />

      {/* Main Content */}
      <motion.div
        className="pt-32 pb-24 px-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Project Header */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-7xl md:text-9xl font-black text-gray-900 mb-6 tracking-tight leading-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            LE COQUETIER
          </motion.h1>
          <motion.div 
            className="space-y-1"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p className="text-2xl font-semibold text-gray-900">ME 103 (Product Realization: Design and Making) Final Project</p>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-8">
            <ProjectSkillPills labels={EGG_HOLDER_SKILLS} />
          </motion.div>
        </motion.div>

        {/* The Project Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Project Image */}
            <motion.div 
              className="relative"
              variants={imageVariants}
            >
              <img
                fetchPriority="high"
                loading="eager"
                decoding="async"
                src="/images/egg1.jpg"
                alt="Le Coquetier"
                className="w-full h-96 object-contain"
              />
            </motion.div>

            {/* Project Description */}
            <motion.div 
              className="space-y-4 flex flex-col justify-start"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                THE PROJECT
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  This piece was a final project for ME 103 fully handmade in Stanford's Product Realization Lab (PRL). It took 10 weeks of work and the use of various machines and manufacturing skills. The inspiration came from a trip to Spain with Emma, whose family has a tradition of serving soft-boiled eggs in unique egg cups.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  I aimed to make a "glorified version" as a gift for Emma, incorporating elements of Spanish culture, such as a Barcelona tile-inspired hammer holder and a bead-blasted finish with Spanish floral patterns.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* The Process Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Process Images */}
            <motion.div 
              className="space-y-4 flex flex-col justify-center"
              variants={imageVariants}
            >
              <div className="grid grid-cols-2 gap-4">
                <img loading="lazy" decoding="async"
                  src="/images/egg3.jpg"
                  alt="Process 3"
                  className="w-full h-48 object-contain"
                />
                <img loading="lazy" decoding="async"
                  src="/images/egg4.jpg"
                  alt="Process 4"
                  className="w-full h-48 object-contain"
                />
                <img loading="lazy" decoding="async"
                  src="/images/egg5.jpg"
                  alt="Process 5"
                  className="w-full h-48 object-contain"
                />
                <img loading="lazy" decoding="async"
                  src="/images/egg6.jpg"
                  alt="Process 6"
                  className="w-full h-48 object-contain"
                />
                <img loading="lazy" decoding="async"
                  src="/images/egg7.jpg"
                  alt="Process 7"
                  className="w-full h-48 object-contain"
                />
                <img loading="lazy" decoding="async"
                  src="/images/egg8.jpg"
                  alt="Process 8"
                  className="w-full h-48 object-contain"
                />
              </div>
            </motion.div>

            {/* Process Description */}
            <motion.div 
              className="space-y-4 flex flex-col justify-start"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                THE PROCESS
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  This project consists of five distinct pieces, secured by a single 1/4-20 shoulder screw.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  The base and the middle piece were machined from brass stock on a lathe using a radius cutter and a left-hand tool. The egg cup and miniature hammer were sand-casted using 3D-printed molds. The Barcelona tile-inspired hammer holder was 3D modeled and cut with a water jet cutter.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Additional processes used included milling (for facing, tapping, drilling, chamfering) and various finishing techniques such as sanding, polishing, bead blasting, vinyl cutting, and 3D printing, to achieve a refined finish.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  A major challenge in the milling process was figuring out how to mount the intricate geometries of my pieces. I chose to design and 3D-printed custom mounts, which let me secure each part in the mill, face it off, and assemble it with the tolerances I had calculated!
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* My Role Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Final Product Image */}
            <motion.div 
              className="relative"
              variants={imageVariants}
            >
              <img loading="lazy" decoding="async"
                src="/images/egg-cup.png"
                alt="Final Product"
                className="w-full h-96 object-contain mt-2"
              />
            </motion.div>

            {/* My Role Description */}
            <motion.div 
              className="space-y-4 flex flex-col justify-start"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                MY ROLE
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  This project was a meaningful personal endeavor and a valuable learning experience. It deepened my understanding of manufacturing processes and significantly enhanced my engineering skills, particularly in designing for manufacturability.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  It was a challenging yet rewarding experience that combined creativity, craftsmanship, and technical precision.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EggHolderPage;
