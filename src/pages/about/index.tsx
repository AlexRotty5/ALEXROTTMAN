"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from "framer-motion";
// import { SplashCursor } from '../../components/ui/splash-cursor';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

const AboutPage = () => {
  const router = useRouter();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);



  // Scroll handler for hiding/showing header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header if at top, hide if scrolling down more than 50px
      if (currentScrollY <= 50) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);





  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Logo - with scroll-based visibility */}
      <div 
        className={`fixed top-6 left-6 z-50 transition-all duration-300 ease-in-out ${
          isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <img src="/logo.png" alt="Alex Rottman" className="h-16 w-auto transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer" onClick={() => router.push("/")} />
      </div>
      {/* <SplashCursor 
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={512}
        CAPTURE_RESOLUTION={256}
        DENSITY_DISSIPATION={2}
        VELOCITY_DISSIPATION={1.5}
        PRESSURE={0.05}
        PRESSURE_ITERATIONS={10}
        CURL={2}
        SPLAT_RADIUS={0.15}
        SPLAT_FORCE={3000}
        SHADING={false}
        COLOR_UPDATE_SPEED={5}
      /> */}

      {/* Navigation Component */}
      <Navigation currentPage="about" isHeaderVisible={isHeaderVisible} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8" style={{ paddingTop: '120px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-7xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start w-full">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <div className="relative">
                <div className="w-64 h-80 sm:w-80 sm:h-[400px] md:w-96 md:h-[500px] lg:w-[400px] lg:h-[600px] xl:w-[450px] xl:h-[650px] rounded-lg overflow-hidden shadow-2xl bg-gray-200 relative">
                  <Image 
                    src="/images/alex-profile.jpg" 
                    alt="Alex Rottman" 
                    fill
                    className="object-cover"
                    onLoad={() => {}}
                    onError={(e) => console.error('Image failed to load:', e)}
                  />
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex-1 space-y-4 sm:space-y-6"
            >
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-[-0.1em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  About Me
                </h2>
              </div>

              <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed">
                <p className="text-sm sm:text-base">
                  Growing up in the small town of Santa Barbara, surrounded by breathtaking natural landscapes, I developed a deep appreciation for creating functional and aesthetically pleasing designs. Now, as a Stanford University student pursuing a B.S. in Physical Design and Manufacturing with a focus on medical technology, I am channeling that inspiration into engineering and design.
                </p>
                
                <p className="text-sm sm:text-base">
                  Over the past three years as a student-athlete, I have cultivated a deeper passion for designing and manufacturing purposeful, innovative, and visually striking products. Through design, I've built a strong foundation in design thinking and manufacturing processes. Additionally, I've honed my technical skills with engineering 3D models and fabricating products in Stanford's Product Realization Lab, where I've brought ideas to life through hands-on prototyping and machining.
                </p>

                <p className="text-sm sm:text-base">
                  My enthusiasm for engineering has been further amplified by class projects and my internship at Neal Feay, where I gained valuable experience in precision modeling and manufacturing.
                </p>

                <p className="text-sm sm:text-base">
                  Looking ahead, I aim to explore new frontiers in product design, manufacturing, and mechanical engineering. My goal is to contribute to advancing technology development, making manufacturing processes more efficient and innovative while ensuring products are both functional and beautifully designed.
                </p>
              </div>

              {/* Skills/Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                {['Product Design', 'Industrial Design', 'Software Development', 'Prototyping', 'User Experience', '3D Modeling', 'Frontend Development', 'Design Systems'].map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                className="flex flex-col gap-2 sm:gap-3 pt-2"
              >
                {/* LinkedIn Button */}
                <a
                  href="https://www.linkedin.com/in/alex-rottman-a07875255/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl w-fit"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="font-medium uppercase tracking-[-0.05em] text-sm">LinkedIn</span>
                </a>

                {/* Email Display */}
                <div className="group relative">
                  <div 
                    className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    onClick={() => {
                      navigator.clipboard.writeText('alexrott@stanford.edu');
                      // You could add a toast notification here if you want
                    }}
                  >
                    <span className="font-medium text-sm sm:text-base">alexrott@stanford.edu</span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage; 