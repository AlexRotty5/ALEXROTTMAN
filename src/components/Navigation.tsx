import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

interface NavigationProps {
  currentPage?: string;
  isHeaderVisible?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentPage = 'home',
  isHeaderVisible = true 
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, width: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const menuItems = [
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: "Home"
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      label: "Projects",
      hasDropdown: true
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: "About Me"
    }
  ];

  const projectDropdownItems = [
    { label: "Physical", route: "/physical-projects" },
    { label: "Digital Dev", route: "/visual-projects" }
  ];

  const handleMenuClick = (index: number) => {
    if (index === 0) {
      router.push('/');
    } else if (index === 1) {
      // Projects button - do nothing on click, handled by hover
    } else if (index === 2) {
      router.push('/about');
    }
  };

  const handleProjectDropdownClick = (route: string) => {
    router.push(route);
    setShowProjectsDropdown(false);
  };

  const handleProjectsMouseEnter = () => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    // Set timeout to show dropdown after 0.2 seconds
    showTimeoutRef.current = setTimeout(() => {
      setShowProjectsDropdown(true);
    }, 200); // 0.2 seconds = 200ms
  };

  const handleProjectsMouseLeave = () => {
    // Clear any pending show timeout
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    
    // Hide dropdown immediately when leaving
    setShowProjectsDropdown(false);
  };

  const getActiveButtonIndex = () => {
    switch (currentPage) {
      case 'home':
        return 0;
      case 'projects':
      case 'physical-projects':
      case 'visual-projects':
        return 1;
      case 'about':
        return 2;
      default:
        return 0;
    }
  };

  // Update tooltip position when activeIndex changes
  useEffect(() => {
    if (activeIndex !== null && menuRef.current && tooltipRef.current) {
      const menuItem = menuRef.current.children[activeIndex] as HTMLElement;
      const menuRect = menuRef.current.getBoundingClientRect();
      const itemRect = menuItem.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
      const left = itemRect.left - menuRect.left + (itemRect.width - tooltipRect.width) / 2;
    
      setTooltipPosition({
        left: Math.max(0, Math.min(left, menuRect.width - tooltipRect.width)),
        width: tooltipRect.width
      });
    }
  }, [activeIndex]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  if (!isHeaderVisible) {
    return null;
  }

  return (
    <div className="fixed top-8 right-6 z-50">
      <AnimatePresence>
        {activeIndex !== null && activeIndex !== 1 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-[41px] pointer-events-none z-50"
          >
            <motion.div
              ref={tooltipRef}
              className="h-7 px-3 rounded-lg inline-flex justify-center items-center overflow-hidden bg-white/95 backdrop-blur border border-gray-200/50 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
              initial={{ x: tooltipPosition.left }}
              animate={{ x: tooltipPosition.left }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ width: "auto" }}
            >
              <p className="text-[13px] font-medium leading-tight whitespace-nowrap uppercase tracking-[-0.1em] text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                {menuItems[activeIndex].label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Dropdown */}
      <AnimatePresence>
        {showProjectsDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute right-0 top-[41px] pointer-events-auto z-50"
            ref={dropdownRef}
            onMouseEnter={handleProjectsMouseEnter}
            onMouseLeave={handleProjectsMouseLeave}
          >
            <div className="bg-white/95 backdrop-blur border border-gray-200/50 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden min-w-[140px]">
              {projectDropdownItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 text-left text-[13px] font-medium uppercase tracking-[-0.1em] text-gray-900 hover:bg-gray-100/80 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  onClick={() => handleProjectDropdownClick(item.route)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div 
        ref={menuRef}
        className="h-10 px-1.5 inline-flex justify-center items-center gap-[3px] overflow-hidden z-10 rounded-full bg-white/95 backdrop-blur border border-gray-200/50 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.1)]"
      >
        {menuItems.map((item, index) => (
          <button 
            key={index}
            className={`w-8 h-8 px-3 py-1 rounded-full flex justify-center items-center gap-2 transition-colors ${
              index === getActiveButtonIndex() ? 'bg-blue-100' : 'hover:bg-gray-100/80'
            }`}
            onMouseEnter={() => {
              if (index === 1) {
                // Projects button - show dropdown after 0.2s hover
                handleProjectsMouseEnter();
              } else {
                // Other buttons - show tooltip immediately
                setActiveIndex(index);
              }
            }}
            onMouseLeave={() => {
              if (index === 1) {
                // Projects button - hide dropdown immediately
                handleProjectsMouseLeave();
              } else {
                // Other buttons - hide tooltip immediately
                setActiveIndex(null);
              }
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMenuClick(index);
            }}
          >
            <div className="flex justify-center items-center">
              <div className="w-[18px] h-[18px] flex justify-center items-center overflow-hidden">
                <item.icon className={`w-full h-full ${
                  index === getActiveButtonIndex() ? 'text-blue-600' : 'text-gray-700'
                }`} />
              </div>
            </div>
            <span className="sr-only">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
