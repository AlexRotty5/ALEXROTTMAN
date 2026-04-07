// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { ProjectDetailBackNav } from '@/components/ProjectDetailBackNav';
import { ProjectSkillPills } from '@/components/ui/skill-pill';
import { LightboxImage } from '@/components/ImageLightbox';

const NEAL_FEAY_SKILLS = [
  'CAD',
  'DFM',
  'Manufacturing Processes',
  'Statistical Optimization',
  'Project/Supply Chain Management',
];

const NealFeayPage = () => {
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
            NEAL FEAY
          </motion.h1>
          <motion.div 
            className="space-y-1"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p className="text-2xl font-semibold text-gray-900">Engineer Intern Summer 2024</p>
            <a 
              href="https://www.nealfeay.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              @https://www.nealfeay.com
            </a>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-8">
            <ProjectSkillPills labels={NEAL_FEAY_SKILLS} />
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="border-t border-gray-200"></div>
        </motion.div>

        {/* Gary Lang Sample Piece Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Gary Lang Images */}
            <motion.div 
              className="relative grid grid-cols-2 gap-4 h-full"
              variants={imageVariants}
            >
              <LightboxImage
                fetchPriority="high"
                loading="eager"
                decoding="async"
                src="/images/gary1.jpg"
                alt="Gary Lang Sample Piece 1"
                className="w-full h-full object-cover"
              />
              <LightboxImage loading="lazy" decoding="async"
                src="/images/gray2.jpg"
                alt="Gary Lang Sample Piece 2"
                className="w-full h-full object-cover"
              />
              <LightboxImage loading="lazy" decoding="async"
                src="/images/gary3.jpg"
                alt="Gary Lang Sample Piece 3"
                className="w-full h-full object-cover"
              />
              <LightboxImage loading="lazy" decoding="async"
                src="/images/gary4.jpg"
                alt="Gary Lang Sample Piece 4"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Gary Lang Description */}
            <motion.div 
              className="space-y-4 flex flex-col justify-center"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                GARY LANG SAMPLE
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    THE PROJECT
                  </h3>
                  <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Created a sample for a Gary Lang art piece, involving 29 intricately machined aluminum strips. These strips were grouped into four finish categories: bead-blasted, polished, 180 red-grey, and 180 red. After finishing, they were anodized in various vibrant shades and colors to create a dynamic visual effect. Finally, the components were assembled onto a backplate to form a cohesive design aligned with the artist's vision.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    MY ROLE
                  </h3>
                  <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Designed 3D models for CNC manufacturing, actively participated in machining, finishing, anodizing, and final assembly. The role involved overseeing precision manufacturing, ensuring intricate details and finishes met standards, and required both technical expertise and creative input to fulfill the artist's vision and adhere to high craftsmanship standards.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="border-t border-gray-200"></div>
        </motion.div>

        {/* 220 Art Installation Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* 220 Art Images */}
            <motion.div 
              className="space-y-4 flex flex-col justify-center"
              variants={imageVariants}
            >
              <div className="grid grid-cols-2 gap-4">
                <LightboxImage loading="lazy" decoding="async"
                  src="/images/2201.jpg"
                  alt="220 Art Installation 1"
                  className="w-full h-80 object-contain"
                />
                <div>
                  <LightboxImage loading="lazy" decoding="async"
                    src="/images/2202.jpg"
                    alt="220 Art Installation 2"
                    className="w-full h-80 object-contain"
                  />
                  <p className="text-center text-sm text-gray-600 font-medium mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    1/4 of fully assembled piece
                  </p>
                </div>
              </div>
              <LightboxImage loading="lazy" decoding="async"
                src="/images/2203.jpeg"
                alt="220 Art Installation 3"
                className="w-full h-80 object-contain"
              />
            </motion.div>

            {/* 220 Art Description */}
            <motion.div 
              className="space-y-4 flex flex-col justify-start"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                220 ART INSTALLATION
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    THE PROJECT
                  </h3>
                  <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                    For a home in New York's 220 building, we built a 15-foot installation of 234 custom panels. Each required two CNC milling operations (~3 hours per piece) plus precise finishing and anodizing for a seamless, ocean-inspired look.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    MY ROLE
                  </h3>
                  <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                    I managed production end-to-end, from CAD to assembly, while contributing with CNC milling to boost efficiency. I tracked and contributed to all 234 panels through modeling, machining, finishing, and assembly, ensuring the job got done on time.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    CHALLENGES
                  </h3>
                  <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Tight tolerances meant very little margin for error in both modeling and machining each piece. Many parts were coming off the CNC with vibration and scratches, which affected assembly and the smooth surface we had engineered for. With limited time, I ran a series of statistical analyses to calculate how much time we needed and how much we could save by identifying the bottleneck. Once we discovered our fixture plates were causing the scratches and vibration, we followed a planned timeline for each piece and delivered the final product to New York on time.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="border-t border-gray-200"></div>
        </motion.div>

        {/* PGA Championship Trophy Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* PGA Trophy Images */}
            <motion.div 
              className="space-y-4 flex flex-col justify-center"
              variants={imageVariants}
            >
              <LightboxImage loading="lazy" decoding="async"
                src="/images/pga1.jpeg"
                alt="PGA Championship Trophy"
                className="w-full h-80 object-contain"
              />
              <div className="grid grid-cols-2 gap-4">
                <LightboxImage loading="lazy" decoding="async"
                  src="/images/pga2.jpeg"
                  alt="PGA Trophy CAD Model 1"
                  className="w-full h-64 object-contain"
                />
                <LightboxImage loading="lazy" decoding="async"
                  src="/images/pga3.jpeg"
                  alt="PGA Trophy CAD Model 2"
                  className="w-full h-64 object-contain"
                />
              </div>
              <p className="text-center text-sm text-gray-600 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                First CAD Models
              </p>
            </motion.div>

            {/* PGA Trophy Description */}
            <motion.div 
              className="space-y-4 flex flex-col justify-start"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                PGA CHAMPIONSHIP TROPHY
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    THE PROJECT
                  </h3>
                  <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                    The Procore Championship Golf Trophy needed to be lightweight, easy to manufacture, and completed in a week. The design went through multiple iterations, with a significant focus on designing for manufacturability, including mounting and tool path specifics on CNC mills. The trophy was ultimately divided into three press-fit parts—two halves and a base—assembled using pins. Precision machining and tight tolerances were crucial for structural integrity and assembly. The final trophy was awarded to the first-place winner at the PGA Tour Procore Championship in Napa Valley, CA.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    MY ROLE
                  </h3>
                  <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                    I created 3D models for the trophy and was assigned to make it lightweight, easy to manufacture, and finished within the one-week deadline. I had a blast working through the design process, ensuring machinability while meeting both time and quality demands.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NealFeayPage;
