"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { DraggableSticker } from '@/components/ui/draggable-sticker';
import { useImageLightbox } from '@/components/ImageLightbox';

const RESUME_IMAGE_SRC =
  '/images/ALEX%20ROTTMAN%20RESUME%202026%20(2).png';

const AboutPage = () => {
  const router = useRouter();
  const { open: openLightbox } = useImageLightbox();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [showDragText, setShowDragText] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showResumeModal, setShowResumeModal] = useState(false);

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

  // Show drag text after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDragText(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Prevent text selection during drag operations
  useEffect(() => {
    const preventSelection = (e: Event) => {
      e.preventDefault();
    };
    
    const preventDragStart = (e: Event) => {
      e.preventDefault();
    };
    
    // Add event listeners
    document.addEventListener('selectstart', preventSelection);
    document.addEventListener('dragstart', preventDragStart);
    document.addEventListener('mousedown', preventSelection);
    
    return () => {
      document.removeEventListener('selectstart', preventSelection);
      document.removeEventListener('dragstart', preventDragStart);
      document.removeEventListener('mousedown', preventSelection);
    };
  }, []);

  useEffect(() => {
    if (!showResumeModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowResumeModal(false);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [showResumeModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Logo - with scroll-based visibility */}
      <div 
        className={`fixed top-6 left-6 z-50 transition-all duration-300 ease-in-out ${
          isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <img 
          src="/logo.png" 
          alt="Alex Rottman" 
          className="h-16 w-auto transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer" 
          onClick={() => router.push("/")} 
        />
      </div>

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
          <div className="flex flex-col md:flex-row md:items-start gap-6 sm:gap-8 lg:gap-12 xl:gap-16 w-full">
            {/* Photo + stickers column — left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full md:w-auto flex-shrink-0 order-1 flex flex-col gap-6"
            >
              <div className="relative">
                <div
                  className="w-64 h-80 sm:w-80 sm:h-[400px] md:w-96 md:h-[500px] lg:w-[400px] lg:h-[600px] xl:w-[450px] xl:h-[650px] rounded-lg overflow-hidden shadow-2xl bg-gray-200 relative cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    openLightbox('/images/alex-profile.jpg', 'Alex Rottman')
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox('/images/alex-profile.jpg', 'Alex Rottman');
                    }
                  }}
                >
                  <Image
                    src="/images/alex-profile.jpg"
                    alt="Alex Rottman"
                    fill
                    className="object-cover pointer-events-none"
                    onLoad={() => {}}
                    onError={(e) => console.error('Image failed to load:', e)}
                  />
                </div>
              </div>

              <div className="w-full max-w-[min(100%,28rem)] sm:max-w-sm md:max-w-md lg:max-w-[400px] xl:max-w-[450px]">
                <div className="flex flex-wrap gap-2 justify-start">
                  {['CAD Modeling', 'CAM/CNC', 'Prototyping', 'Manufacturing Processes', 'Product Design', 'Tolerancing & Dimensioning', 'DFM/DFA', 'Materials Science', 'Solution-Oriented', 'Process Optimization (PFMEA/ DOE)', 'Project Management'].map((skill, index) => (
                    <DraggableSticker
                      key={skill}
                      skill={skill}
                      index={index}
                    />
                  ))}
                </div>
                {showDragText && (
                  <p className="text-sm text-gray-600 mt-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Drag the stickers!
                  </p>
                )}
              </div>
            </motion.div>

            {/* Text + contact — right of photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex-1 min-w-0 space-y-4 sm:space-y-6 order-2 md:pl-2"
            >
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-[-0.1em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  About Me
                </h2>
              </div>

              <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed">
                <p className="text-[13px] sm:text-[15px]">
                  Growing up in Santa Barbara, California, I was shaped by two things: the outdoors and building. Whether I was surfing, backpacking, or kayaking with friends, or in the garage piecing together cardboard arcade machines, skateboards, and surfboards — I was happiest when I was either out in the world or making something with my hands.
                </p>

                <p className="text-[13px] sm:text-[15px]">
                  Now, as a senior at Stanford pursuing a B.S. in Product Design with a focus in physical products and manufacturing, that love for building has only grown. Alongside my studies, I've spent the last four years competing as a Division I volleyball player at Stanford and representing USA volleyball internationally. My undergrad has been defined by learning the full design process — from software tools to everything the machine shop has to offer — and gaining real industry experience manufacturing at scale.
                </p>

                <p className="text-[13px] sm:text-[15px]">
                  As my volleyball career winds down, I'm excited to dive into a new chapter. I've become genuinely excited to contribute to the defense industry — from researching BLDC motors for drone propulsion systems to exploring robotics and control systems more broadly. Next year, I'll be pursuing a Master's in Mechanical Engineering at UC Berkeley with a focus in robotics, and I'm hoping to gain industry experience before then. After grad school, I want to keep building — with a much more developed skillset.
                </p>
              </div>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                className="flex flex-row flex-wrap gap-3 sm:gap-6 pt-6 items-center"
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

                <button
                  type="button"
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-stone-300/90 bg-white text-stone-700 text-xs sm:text-sm font-medium uppercase tracking-[-0.05em] shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.02] transition-[color,background-color,border-color,box-shadow,ring-color] duration-200 ease-out hover:border-sky-400/45 hover:bg-sky-400/[0.09] hover:text-sky-800/90 hover:shadow-[0_4px_14px_rgba(14,165,233,0.12)] hover:ring-sky-300/30 w-fit"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  onClick={() => setShowResumeModal(true)}
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Resume</span>
                </button>

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

      {showResumeModal ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          className="fixed inset-0 z-[220] flex items-center justify-center bg-black/85 p-3 sm:p-6"
          onClick={() => setShowResumeModal(false)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-3xl overflow-auto rounded-xl bg-white p-2 pb-3 shadow-2xl ring-1 ring-black/10 sm:p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="resume-modal-title" className="sr-only">
              Resume
            </h2>
            <button
              type="button"
              className="absolute right-2 top-2 z-10 rounded-lg border border-stone-200 bg-white/95 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-stone-600 shadow-sm backdrop-blur-sm transition hover:border-sky-400/45 hover:bg-sky-400/[0.09] hover:text-sky-800 sm:right-3 sm:top-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={() => setShowResumeModal(false)}
            >
              Close
            </button>
            <img
              src={RESUME_IMAGE_SRC}
              alt="Alex Rottman resume"
              className="mx-auto block h-auto w-full max-w-full rounded-lg"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AboutPage;
