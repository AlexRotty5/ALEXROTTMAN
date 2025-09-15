import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

// Custom hook for image hover effects
export const useImageHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
};

// Custom hook for slider pause functionality
export const useSliderPause = () => {
  const [isPaused, setIsPaused] = useState(false);

  const pauseSlider = () => setIsPaused(true);
  const resumeSlider = () => setIsPaused(false);

  return { isPaused, pauseSlider, resumeSlider };
};

// Mouse Icon Component
const MouseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
    />
  </svg>
);

// Cursor Component
const Cursor = ({ 
  children, 
  className = "", 
  variants, 
  transition,
  attachToParent = false 
}: {
  children: React.ReactNode;
  className?: string;
  variants?: any;
  transition?: any;
  attachToParent?: boolean;
}) => {
  return (
    <motion.div
      className={`absolute z-50 pointer-events-none ${className}`}
      variants={variants}
      transition={transition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export function EstokoAppCursor() {
  const router = useRouter();
  const { handleMouseEnter, handleMouseLeave } = useImageHover();
  const { pauseSlider, resumeSlider } = useSliderPause();
  
  return (
    <div className="pt-0 pb-32 flex items-center justify-center min-h-screen">
      <div className="flex items-start gap-10 max-w-5xl">
        <img
          src="/images/estokocover.jpg"
          alt="Estoko App"
          className="h-[500px] w-[600px] rounded-[8px] object-cover shadow-2xl"
          onMouseEnter={() => { handleMouseEnter(); pauseSlider(); }}
          onMouseLeave={() => { handleMouseLeave(); resumeSlider(); }}
        />
        
        <div className="flex flex-col justify-start">
          <h2 className="text-6xl font-bold text-gray-900 mb-4 uppercase tracking-[-0.1em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Estoko App
          </h2>
          <h3 className="text-2xl font-medium text-gray-600 mb-6 uppercase tracking-[-0.05em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Mobile Application
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-lg mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            A mobile application designed to streamline the shopping experience with innovative features and intuitive user interface.
          </p>
          <button 
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={() => { handleMouseEnter(); pauseSlider(); }}
            onMouseLeave={() => { handleMouseLeave(); resumeSlider(); }}
            onClick={() => router.push('/projects/estoko')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function PhysicalProjectsCursor() {
  const router = useRouter();
  const { handleMouseEnter, handleMouseLeave } = useImageHover();
  const { pauseSlider, resumeSlider } = useSliderPause();
  
  return (
    <div className="pt-0 pb-32 flex items-center justify-center min-h-screen">
      <div className="flex items-start gap-10 max-w-5xl">
        <img
          src="/images/retinac.jpg"
          alt="Retinac"
          className="h-[500px] w-[600px] rounded-[8px] object-cover shadow-2xl"
          onMouseEnter={() => { handleMouseEnter(); pauseSlider(); }}
          onMouseLeave={() => { handleMouseLeave(); resumeSlider(); }}
        />
        
        <div className="flex flex-col justify-start">
          <h2 className="text-6xl font-bold text-gray-900 mb-4 uppercase tracking-[-0.1em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Retinac
          </h2>
          <h3 className="text-2xl font-medium text-gray-600 mb-6 uppercase tracking-[-0.05em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Stanford Biodesign
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-lg mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            Co-founder and Product Engineer for Retinac, a developing medical device out of Stanford University.
          </p>
          <button 
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={() => { handleMouseEnter(); pauseSlider(); }}
            onMouseLeave={() => { handleMouseLeave(); resumeSlider(); }}
            onClick={() => router.push('/projects/retinac')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function EggHolderCursor() {
  const router = useRouter();
  const { handleMouseEnter, handleMouseLeave } = useImageHover();
  const { pauseSlider, resumeSlider } = useSliderPause();
  
  return (
    <div className="pt-0 pb-32 flex items-center justify-center min-h-screen">
      <div className="flex items-start gap-10 max-w-5xl">
        <img
          src="/images/eggcover.jpg"
          alt="Le Coquetier"
          className="h-[500px] w-[600px] rounded-[8px] object-cover shadow-2xl"
          onMouseEnter={() => { handleMouseEnter(); pauseSlider(); }}
          onMouseLeave={() => { handleMouseLeave(); resumeSlider(); }}
        />
        
        <div className="flex flex-col justify-start">
          <h2 className="text-6xl font-bold text-gray-900 mb-4 uppercase tracking-[-0.1em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Le Coquetier
          </h2>
          <h3 className="text-2xl font-medium text-gray-600 mb-6 uppercase tracking-[-0.05em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Product Manufacturing
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-lg mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            An egg holder, designed, engineered, and fully hand manufactured for my ME 103 final project. Chosen as a showcase item at the Stanford Engineering Department's 100th Anniversary Event.
          </p>
          <button 
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={() => { handleMouseEnter(); pauseSlider(); }}
            onMouseLeave={() => { handleMouseLeave(); resumeSlider(); }}
            onClick={() => router.push('/projects/eggholder')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function GaryLangCursor() {
  const router = useRouter();
  const { handleMouseEnter, handleMouseLeave } = useImageHover();
  const { pauseSlider, resumeSlider } = useSliderPause();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleGaryMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    handleMouseEnter();
    pauseSlider();
  };
  
  const handleGaryMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      handleMouseLeave();
      resumeSlider();
      timeoutRef.current = null;
    }, 100);
  };
  
  return (
    <div className="pt-0 pb-32 flex items-center justify-center min-h-screen">
      <div className="flex items-start gap-10 max-w-5xl">
        <img
          src="/images/nealfeay.jpg"
          alt="Neal Feay Internship"
          className="h-[500px] w-[600px] rounded-[8px] object-cover shadow-2xl cursor-pointer"
          onMouseEnter={handleGaryMouseEnter}
          onMouseLeave={handleGaryMouseLeave}
        />
        
        <div className="flex flex-col justify-start">
          <h2 className="text-6xl font-bold text-gray-900 mb-4 uppercase tracking-[-0.1em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Neal Feay
          </h2>
          <h3 className="text-2xl font-medium text-gray-600 mb-6 uppercase tracking-[-0.05em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Engineer Intern Summer 2024
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-lg mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            Engineer Intern at Neal Feay, specializing in CAD modeling, precision machining, and project management tasks.
          </p>
          <button 
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={handleGaryMouseEnter}
            onMouseLeave={handleGaryMouseLeave}
            onClick={() => router.push('/projects/nealfeay')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function GearTrainsCursor() {
  const { handleMouseEnter, handleMouseLeave } = useImageHover();
  const { pauseSlider, resumeSlider } = useSliderPause();
  
  return (
    <div className="pt-0 pb-32 flex items-center justify-center min-h-screen">
      <div className="flex items-start gap-10 max-w-5xl">
        <img
          src="/images/gear-trains.jpg"
          alt="Gear Trains"
          className="h-[500px] w-[600px] rounded-[8px] object-cover shadow-2xl"
          onMouseEnter={() => { handleMouseEnter(); pauseSlider(); }}
          onMouseLeave={() => { handleMouseLeave(); resumeSlider(); }}
        />
        
        <div className="flex flex-col justify-start">
          <h2 className="text-6xl font-bold text-gray-900 mb-4 uppercase tracking-[-0.1em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Gear Trains
          </h2>
          <h3 className="text-2xl font-medium text-gray-600 mb-6 uppercase tracking-[-0.05em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            ME 102 Final Project
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-lg mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            A comprehensive gear train system designed and manufactured as part of ME 102 coursework, demonstrating mechanical engineering principles and precision manufacturing techniques.
          </p>
          <button 
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={() => { handleMouseEnter(); pauseSlider(); }}
            onMouseLeave={() => { handleMouseLeave(); resumeSlider(); }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function ReleafAppCursor() {
  const { handleMouseEnter, handleMouseLeave } = useImageHover();
  const { pauseSlider, resumeSlider } = useSliderPause();
  
  return (
    <div className="pt-0 pb-32 flex items-center justify-center min-h-screen">
      <div className="flex items-start gap-10 max-w-5xl">
        <img
          src="/images/releafcover.jpg"
          alt="Releaf App"
          className="h-[500px] w-[600px] rounded-[8px] object-cover shadow-2xl"
          onMouseEnter={() => { handleMouseEnter(); pauseSlider(); }}
          onMouseLeave={() => { handleMouseLeave(); resumeSlider(); }}
        />
        
        <div className="flex flex-col justify-start">
          <h2 className="text-6xl font-bold text-gray-900 mb-4 uppercase tracking-[-0.1em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Releaf App
          </h2>
          <h3 className="text-2xl font-medium text-gray-600 mb-6 uppercase tracking-[-0.05em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Mobile Application
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-lg mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            A mobile application focused on providing relief and wellness solutions through innovative digital experiences.
          </p>
          <button 
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={() => { handleMouseEnter(); pauseSlider(); }}
            onMouseLeave={() => { handleMouseLeave(); resumeSlider(); }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
