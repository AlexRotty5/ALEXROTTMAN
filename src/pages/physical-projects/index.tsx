import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { PhysicalProjectsCursor, EggHolderCursor, GaryLangCursor, GearTrainsCursor } from '@/components/ui/cursor';
import { ScrollProgress } from '@/components/ui/scroll-progress-1';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import Navigation from "@/components/Navigation";
const PhysicalProjects = () => {
  const router = useRouter();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [activeProject, setActiveProject] = useState(1); // 0: Neal Feay, 1: Retinac, 2: Le Coquetier, 3: Gear Trains
  const sliderRef = useRef<any>(null);

  // Prevent vertical scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  // Handle position changes from the InfiniteSlider
  const handlePositionChange = (position: number) => {
    const windowWidth = window.innerWidth;
    const projectWidth = windowWidth;
    
    // Calculate which project is currently in the center-right area
    // Since the slider moves from 0 to negative values, we need to handle the offset
    const adjustedPosition = Math.abs(position);
    const projectIndex = Math.round(adjustedPosition / projectWidth) % 4;
    
    setActiveProject(projectIndex);
  };

  // Handle clicking on project names
  const handleProjectClick = (projectIndex: number) => {
    console.log('Project clicked:', projectIndex);
    const windowWidth = window.innerWidth;
    const targetPosition = -(projectIndex * windowWidth);
    console.log('Target position:', targetPosition);
    console.log('Slider ref:', sliderRef.current);
    
    // Set the slider position to the target project
    if (sliderRef.current && sliderRef.current.setPosition) {
      console.log('Setting position to:', targetPosition);
      sliderRef.current.setPosition(targetPosition);
    } else {
      console.log('Slider ref or setPosition method not available');
    }
    
    setActiveProject(projectIndex);
  };

  const getProjectNameStyle = (projectIndex: number) => {
    return `text-sm font-medium uppercase tracking-[-0.05em] transition-colors duration-300 cursor-pointer hover:text-gray-800 ${
      activeProject === projectIndex 
        ? 'text-gray-900' 
        : 'text-gray-400'
    }`;
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      <div className="fixed top-6 left-6 z-50">
        <img src="/logo.png" alt="Alex Rottman" className="h-16 w-auto transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer" onClick={() => router.push("/")} />
      </div>

      {/* Fixed Project Names Header */}
      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex gap-8">
          <span 
            className={getProjectNameStyle(0)} 
            style={{ fontFamily: "'Inter', sans-serif" }}
            onClick={() => handleProjectClick(0)}
          >
            Neal Feay
          </span>
          <span 
            className={getProjectNameStyle(1)} 
            style={{ fontFamily: "'Inter', sans-serif" }}
            onClick={() => handleProjectClick(1)}
          >
            Retinac
          </span>
          <span 
            className={getProjectNameStyle(2)} 
            style={{ fontFamily: "'Inter', sans-serif" }}
            onClick={() => handleProjectClick(2)}
          >
            Le Coquetier
          </span>
          <span 
            className={getProjectNameStyle(3)} 
            style={{ fontFamily: "'Inter', sans-serif" }}
            onClick={() => handleProjectClick(3)}
          >
            Gear Trains
          </span>

        </div>
      </div>

      <Navigation currentPage="physical-projects" isHeaderVisible={isHeaderVisible} />

      {/* Infinite Slider for Projects */}
      <div className="pt-20 pb-32">
                  <InfiniteSlider 
            ref={sliderRef}
            duration={30} 
            onPositionChange={handlePositionChange}
          >
          <div className="flex-shrink-0 w-screen px-4 sm:px-6 lg:px-8 py-0">
            <GaryLangCursor />
          </div>
          <div className="flex-shrink-0 w-screen px-4 sm:px-6 lg:px-8 py-0">
            <PhysicalProjectsCursor />
          </div>
          <div className="flex-shrink-0 w-screen px-4 sm:px-6 lg:px-8 py-0">
            <EggHolderCursor />
          </div>
          <div className="flex-shrink-0 w-screen px-4 sm:px-6 lg:px-8 py-0">
            <GearTrainsCursor />
          </div>

        </InfiniteSlider>
      </div>
    </div>
  );
};

export default PhysicalProjects; 