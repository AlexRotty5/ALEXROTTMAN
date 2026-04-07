// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { ProjectDetailBackNav } from '@/components/ProjectDetailBackNav';
import { ProjectSkillPills } from '@/components/ui/skill-pill';

const GEAR_TRAINS_SKILLS = [
  'Prototyping',
  'Additive Manufacturing',
  'Mechanical Systems',
  'Rapid Iteration',
];

const GearTrainsPage = () => {
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

      <Navigation currentPage="projects" isHeaderVisible={true} />

      <motion.div 
        className="max-w-7xl mx-auto px-8 py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-7xl md:text-9xl font-black text-gray-900 mb-6 tracking-tight leading-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            GEAR TRAINS
          </motion.h1>
          <motion.div 
            className="space-y-1"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p className="text-2xl font-semibold text-gray-900">ME 102 (Foundations of Product Realization) Final Project</p>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-8">
            <ProjectSkillPills labels={GEAR_TRAINS_SKILLS} />
          </motion.div>
        </motion.div>

        {/* The Project Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Project Images */}
            <motion.div 
              className="relative"
              variants={imageVariants}
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  src="/images/gear3.jpeg"
                  alt="Gear Trains Project 3"
                  className="w-full h-80 object-cover"
                />
                <img loading="lazy" decoding="async"
                  src="/images/gear1.jpg"
                  alt="Gear Trains Project"
                  className="w-full h-80 object-cover"
                />
              </div>
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
                  I prototyped, designed, modeled, engineered, and presented a gear train as my final project in ME 102. The goal of this project was to highlight the ratios between spur gears and demonstrate the overall significance of gears in mechanical systems.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  This project was recognized by the professor and selected to be showcased as a class example at Stanford's "Meet the Makers" event in Spring 2024.
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
                <img loading="lazy" decoding="async" src="/images/gear2.jpg" alt="Process 2" className="w-full h-52 object-contain " />
                <img loading="lazy" decoding="async" src="/images/gear6.jpg" alt="Process 6" className="w-full h-52 object-contain " />
                <img loading="lazy" decoding="async" src="/images/gear4.jpg" alt="Process 4" className="w-full h-52 object-contain " />
                <img loading="lazy" decoding="async" src="/images/gear5.jpg" alt="Process 5" className="w-full h-52 object-contain " />
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
                  After exploring various iterations of gear trains, bevel wheels, lever arms, and other mechanical systems, I ultimately chose to make my final project a gear train featuring several different spur gears and a perpendicular bevel wheel.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  The four smaller spurs, backboard, stand, handle, and wall were 3D-modeled and laser-cut, then assembled using either press fits or shoulder screws and nuts. The main bevel wheel was also 3D-modeled and then printed using standard PLA material. The horizontal gear was assembled with a shoulder screw and nut, while the perpendicular gear utilized a press-fit D-shaft and a backplate for assembly.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  This project significantly enhanced my skills in 3D modeling, sketching, prototyping, design thinking, 3D printing, laser cutting, and engineering mechanical systems.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GearTrainsPage;
