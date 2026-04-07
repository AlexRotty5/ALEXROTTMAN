import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { SplashCursor } from '@/components/ui/splash-cursor';

interface IntroScreenProps {
  isActive: boolean;
  onComplete: () => void;
}

const IntroScreen = ({ isActive, onComplete }: IntroScreenProps) => {
  const introRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (isActive) {
      if (introRef.current) {
        introRef.current.style.transform = 'translateX(0%)';
        setShouldAnimate(true);
      }
    } else {
      if (introRef.current) {
        introRef.current.style.transform = 'translateX(100%)';
        setShouldAnimate(false);
      }
    }
  }, [isActive]);

  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    if (introComplete && isActive) {
      const timer = setTimeout(() => {
        setShowArrow(true);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [introComplete, isActive]);

  const handleArrowClick = () => {
    onComplete();
  };

  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => {
        setIntroComplete(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      setIntroComplete(false);
    }
  }, [shouldAnimate]);

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
      className="fixed top-0 left-0 w-full h-screen z-20 transition-[transform] duration-500 ease-out bg-blue-900"
      style={{ transform: 'translateX(100%)' }}
    >
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
          @media (prefers-reduced-motion: reduce) {
            .gradient-text, .blue-gradient-text, .purple-gradient-text {
              animation: none;
              background-position: 0% 50%;
            }
          }
        `}</style>
        
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
          PRODUCTS IN THE PHYSICAL WORLD
        </motion.h1>
      </div>

      {isActive && !reduceMotion && (
        <SplashCursor
          SIM_RESOLUTION={48}
          DYE_RESOLUTION={384}
          CAPTURE_RESOLUTION={256}
          DENSITY_DISSIPATION={2}
          VELOCITY_DISSIPATION={1.5}
          PRESSURE={0.05}
          PRESSURE_ITERATIONS={8}
          CURL={2}
          SPLAT_RADIUS={0.15}
          SPLAT_FORCE={2600}
          SHADING={false}
          COLOR_UPDATE_SPEED={5}
          maxPixelRatio={1.35}
        />
      )}
      
      <AnimatePresence>
        {showArrow && (
          <motion.div
            className="absolute bottom-10 left-1/2 z-50 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              type="button"
              aria-label="Continue to projects"
              onClick={handleArrowClick}
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] text-white shadow-[0_4px_24px_-4px_rgba(15,23,42,0.45)] backdrop-blur-md transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:border-white/35 hover:bg-white/[0.12] hover:shadow-[0_8px_32px_-6px_rgba(30,58,138,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
              {...(!reduceMotion
                ? {
                    animate: { y: [0, 4, 0] },
                    transition: {
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }
                : {})}
            >
              <svg
                className="h-5 w-5 translate-y-px opacity-90 transition-opacity duration-200 group-hover:opacity-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 10l5 5 5-5" />
              </svg>
            </motion.button>
            <span
              className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/45"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Projects
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="fixed top-6 left-6 z-50">
        <img src="/whitelogo.png" alt="Alex Rottman" className="h-16 w-auto brightness-110 hue-rotate-15 saturate-75" />
      </div>
    </div>
  );
};

export default IntroScreen;
