// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { ProjectDetailBackNav } from '@/components/ProjectDetailBackNav';
import { ProjectSkillPills } from '@/components/ui/skill-pill';
import { LightboxImage } from '@/components/ImageLightbox';

const RETINAC_SKILLS = [
  'Startup Dev',
  'Needfinding',
  'Product Design/Engineering',
  'Innovation',
];

const RetinacPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const handleViewOnePager = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleExpandToFullScreen = () => {
    window.open('/Biodesign DR One Pager.pdf', '_blank');
    setShowPopup(false);
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
            RETINAC
          </motion.h1>
          <motion.div 
            className="space-y-1"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p className="text-2xl font-semibold text-gray-900">Co-founder and lead product engineer for developing medical device startup out of Stanford's Biodesign program</p>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-8">
            <ProjectSkillPills labels={RETINAC_SKILLS} />
          </motion.div>
        </motion.div>

        {/* The Team Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Team Photo */}
            <motion.div 
              className="relative"
              variants={imageVariants}
            >
              <LightboxImage
                fetchPriority="high"
                loading="eager"
                decoding="async"
                src="/retinac1.jpg"
                alt="The Team"
                className="w-full h-80 object-cover"
              />
            </motion.div>

            {/* Team Description */}
            <motion.div 
              className="space-y-4 flex flex-col justify-center"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                THE TEAM
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  A team of 7 Stanford Biodesign Students came together to create a more efficient and accessible diagnostic for diabetic retinopathy.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Driven by a passion for medical device innovation, I joined Stanford's Biodesign program to deepen my expertise in health technology. Studying Product Design with a focus on health technology made this opportunity a natural fit.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Our Mission Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Audio Player */}
            <motion.div 
              className="relative"
              variants={imageVariants}
            >
              <div className="relative bg-gray-900/80 rounded-lg p-6 h-full flex flex-col justify-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white text-center mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  DR Elevator Pitch
                </h3>
                <audio 
                  controls 
                  className="w-full"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <source src="/elevator_pitch.m4a" type="audio/mp4" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </motion.div>

            {/* Mission Description */}
            <motion.div 
              className="space-y-4 flex flex-col justify-center"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                OUR MISSION
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Retinac received Stanford's Biodesign Most Compelling Idea Award at the startup showcase in 2024.
                </p>
                
                {/* One Pager Button */}
                <motion.button
                  onClick={handleViewOnePager}
                  className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white uppercase tracking-wide bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View One Pager
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Our Product Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Product Description */}
            <motion.div 
              className="space-y-4 flex flex-col justify-center"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                OUR PRODUCT
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Our solution is a tool that uses tear-based protein analysis through rapid-ELISA. Tears are analyzed for VEGF concentration to determine risk of diabetic retinopathy. Recent papers have shown promising data for VEGF in determining diabetic retinopathy risk.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  We have completed two rounds of 3-D printed prototypes. Our latest prototype (shown on the right) incorporates a snap-fit shell that collects tear fluid and transfers it onto the collection pad, where the main body performs the ELISA test.
                </p>
              </div>
            </motion.div>

            {/* Product Images */}
            <motion.div 
              className="space-y-6 flex flex-col justify-center"
              variants={imageVariants}
            >
              {/* Physical Prototypes */}
              <LightboxImage loading="lazy" decoding="async"
                src="/retinac2.jpg"
                alt="Physical Prototypes"
                className="max-w-full max-h-64 object-contain"
              />
              
              {/* Technical Drawings */}
              <LightboxImage loading="lazy" decoding="async"
                src="/retinac3.jpg"
                alt="Technical Drawings"
                className="max-w-full max-h-64 object-contain"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* My Role Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* First Prototype Image */}
            <motion.div 
              className="relative flex flex-col justify-center items-center mt-8"
              variants={imageVariants}
            >
              <LightboxImage loading="lazy" decoding="async"
                src="/retinac4.jpg"
                alt="First Prototype"
                className="max-w-full max-h-80 object-contain"
              />
              <p className="text-center mt-4 text-sm text-gray-600 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                First Prototype
              </p>
            </motion.div>

            {/* Role Description */}
            <motion.div 
              className="space-y-4 flex flex-col justify-center"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                MY ROLE
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Based on my experience in Product Design and Engineering, my role was to develop physical prototypes and eventually the final product.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  The main challenge was the painful extraction of tear fluid for patients, and the goal was to create an effective and pain-free collection method through diligent design.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  We developed the first prototype and are continuing to refine it to produce a functional prototype capable of extracting 5-7 µL of tear fluid.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Popup Overlay */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dimmed Background */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClosePopup}
            />

            {/* Popup Widget */}
            <motion.div
              className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Biodesign DR One Pager
                </h3>
                <div className="flex items-center space-x-2">
                  {/* Expand Button */}
                  <motion.button
                    onClick={handleExpandToFullScreen}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Expand to full screen"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </motion.button>
                  
                  {/* Close Button */}
                  <motion.button
                    onClick={handleClosePopup}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* PDF Content */}
              <div className="p-6">
                <iframe
                  src="/Biodesign DR One Pager.pdf"
                  className="w-full h-96 border-0"
                  title="Biodesign DR One Pager"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RetinacPage;
