'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { globalCleanup } from '../lib/cleanup';
import { logPerf } from '../debug/perfLog';

export default function RouteLifecycle() {
  const pathname = usePathname();

  useEffect(() => {
    // Log performance when route changes
    logPerf(`route-change-${pathname}`);

    // Cleanup function runs when component unmounts or pathname changes
    return () => {
      globalCleanup();
    };
  }, [pathname]);

  // Add keyboard shortcut for manual performance logging
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'p' || event.key === 'P') {
        logPerf('manual-keyboard');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return null; // This component doesn't render anything
} 