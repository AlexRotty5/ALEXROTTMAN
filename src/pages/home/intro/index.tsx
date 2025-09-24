import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { SplashCursor } from '../../../components/ui/splash-cursor';

interface IntroScreenProps {
  isActive: boolean;
  activeSection: string;
  onBack: () => void;
  onComplete: () => void;
}

const IntroScreen = ({ isActive, activeSection, onBack, onComplete }: IntroScreenProps) => {
  const introRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Slide in from right when active
      if (introRef.current) {
        introRef.current.style.transform = 'translateX(0%)';
        setShouldAnimate(true);
      }
    } else if (activeSection === 'intro-projects') {
      // Keep intro visible when transitioning to ProductNav
      if (introRef.current) {
        introRef.current.style.transform = 'translateX(0%)';
        setShouldAnimate(false);
      }
    } else {
      // Slide out to right when not active
      if (introRef.current) {
        introRef.current.style.transform = 'translateX(100%)';
        setShouldAnimate(false);
      }
    }
  }, [isActive, activeSection]);

  const [showArrow, setShowArrow] = useState(false);

  // Show arrow when intro animations complete
  useEffect(() => {
    if (introComplete && isActive) {
      // Show arrow immediately when animations complete
      const timer = setTimeout(() => {
        setShowArrow(true);
      }, 0); // No delay - show arrow immediately after animations complete
      
      return () => clearTimeout(timer);
    }
  }, [introComplete, isActive]);

  const handleArrowClick = () => {
    onComplete();
  };

  // Trigger completion after text animations
  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => {
        setIntroComplete(true);
      }, 2000); // Wait for all text animations to complete (reduced timing)
      
      return () => clearTimeout(timer);
    } else {
      setIntroComplete(false);
    }
  }, [shouldAnimate]);

  // Prevent scrolling when intro is visible and not complete
  useEffect(() => {
    if (shouldAnimate && !introComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [shouldAnimate, introComplete]);

  return (
    <div 
      ref={introRef}
      className="fixed top-0 left-0 w-full h-screen z-20 transition-transform duration-500 ease-out bg-blue-900"
      style={{ transform: 'translateX(100%)' }}
    >
      {/* Intro Text Content */}
      <div className="relative z-10 flex justify-between items-center px-8 py-12 w-full max-w-7xl mx-auto h-full">
        <style jsx>{`
          .gradient-text {
            background: linear-gradient(45deg, #22c55e, #15803d, #22c55e);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientMove 3s ease-in-out infinite;
            padding: 0 2px;
            margin: 0 -2px;
          }
          .blue-gradient-text {
            background: linear-gradient(45deg, #3b82f6, #60a5fa, #1e40af);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientMove 3s ease-in-out infinite;
            padding: 0 2px;
            margin: 0 -2px;
          }
          .purple-gradient-text {
            background: linear-gradient(45deg, #a855f7, #ec4899, #7c3aed);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientMove 3s ease-in-out infinite;
            padding: 0 2px;
            margin: 0 -2px;
          }
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        
        {/* Left side - Three short rows */}
        <div className="flex flex-col space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.2, 0.65, 0.3, 0.9]
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.1em'
            }}
          >
            I <span className="gradient-text">DESIGN</span>
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: [0.2, 0.65, 0.3, 0.9]
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.1em'
            }}
          >
            I <span className="blue-gradient-text">ENGINEER</span>
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: [0.2, 0.65, 0.3, 0.9]
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.1em'
            }}
          >
            I <span className="purple-gradient-text">BUILD</span>
          </motion.h1>
        </div>

        {/* Right side - Longer text */}
        <motion.h1 
          initial={{ opacity: 0, x: 30 }}
          animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9]
          }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-lg text-right"
          style={{ 
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.1em'
          }}
        >
          PRODUCTS IN PHYSICAL AND DIGITAL WORLDS
        </motion.h1>
      </div>

      <SplashCursor 
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
      />
      
      {/* Downward Arrow */}
      <AnimatePresence>
        {showArrow && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={handleArrowClick}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Logo */}
      <div className="fixed top-6 left-6 z-50">
        <img src="/whitelogo.png" alt="Alex Rottman" className="h-16 w-auto brightness-110 hue-rotate-15 saturate-75" />
      </div>
    </div>
  );
};

export default IntroScreen;
