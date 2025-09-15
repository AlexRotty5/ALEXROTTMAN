import { cleanupRegistry } from '../debug/perfLog';

export function globalCleanup(): void {
  console.log('🧹 Running global cleanup...');

  // Cancel all tracked rAF calls
  cleanupRegistry.rafIds.forEach(id => {
    cancelAnimationFrame(id);
  });
  cleanupRegistry.rafIds.clear();

  // Clear all tracked intervals
  cleanupRegistry.intervals.forEach(id => {
    clearInterval(id);
  });
  cleanupRegistry.intervals.clear();

  // Clear all tracked timeouts
  cleanupRegistry.timeouts.forEach(id => {
    clearTimeout(id);
  });
  cleanupRegistry.timeouts.clear();

  // Remove all tracked event listeners
  cleanupRegistry.listeners.forEach(({ target, type, listener, options }) => {
    target.removeEventListener(type, listener, options);
  });
  cleanupRegistry.listeners.clear();

  // Disconnect all tracked observers
  cleanupRegistry.observers.forEach(({ observer }) => {
    observer.disconnect();
  });
  cleanupRegistry.observers.clear();

  // Cleanup GSAP contexts
  cleanupRegistry.gsapContexts.forEach(context => {
    if (context && typeof context.revert === 'function') {
      context.revert();
    }
  });
  cleanupRegistry.gsapContexts.clear();

  // Kill all GSAP ScrollTriggers if GSAP is available
  if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
    const ScrollTrigger = (window as any).ScrollTrigger;
    ScrollTrigger.getAll().forEach((trigger: any) => {
      trigger.kill(true);
    });
  }

  // Clear GSAP global timeline if available
  if (typeof window !== 'undefined' && (window as any).gsap) {
    const gsap = (window as any).gsap;
    gsap.globalTimeline.clear();
  }

  // Cleanup Three.js renderers
  cleanupRegistry.threeRenderers.forEach(renderer => {
    if (renderer) {
      // Dispose of all materials
      if (renderer.scene) {
        renderer.scene.traverse((child: any) => {
          if (child.geometry) {
            child.geometry.dispose();
          }
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((material: any) => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
      
      // Dispose renderer
      renderer.dispose();
      renderer.forceContextLoss();
      
      // Remove canvas from DOM
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }
  });
  cleanupRegistry.threeRenderers.clear();

  // Cleanup Lenis instances
  cleanupRegistry.lenisInstances.forEach(instance => {
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
    }
  });
  cleanupRegistry.lenisInstances.clear();

  // Clear any global instances
  if (typeof window !== 'undefined') {
    // Clear any global animation frames
    if ((window as any).__rafIds) {
      (window as any).__rafIds.forEach((id: number) => cancelAnimationFrame(id));
      (window as any).__rafIds = [];
    }

    // Clear any global intervals
    if ((window as any).__intervals) {
      (window as any).__intervals.forEach((id: NodeJS.Timeout) => clearInterval(id));
      (window as any).__intervals = [];
    }

    // Clear any global timeouts
    if ((window as any).__timeouts) {
      (window as any).__timeouts.forEach((id: NodeJS.Timeout) => clearTimeout(id));
      (window as any).__timeouts = [];
    }

    // Clear any global listeners
    if ((window as any).__listeners) {
      (window as any).__listeners.forEach(({ target, type, listener, options }: any) => {
        target.removeEventListener(type, listener, options);
      });
      (window as any).__listeners = [];
    }
  }

  console.log('✅ Global cleanup completed');
} 