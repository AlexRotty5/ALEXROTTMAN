'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
  onPositionChange?: (position: number) => void;
};

export const InfiniteSlider = forwardRef<{ setPosition: (position: number) => void }, InfiniteSliderProps>(({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
  onPositionChange,
}, ref) => {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [measureRef, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedPosition, setPausedPosition] = useState<number | null>(null);
  const [manualPosition, setManualPosition] = useState<number | null>(null);

  // Expose setPosition method to parent component
  useImperativeHandle(ref, () => ({
    setPosition: (position: number) => {
      console.log('InfiniteSlider setPosition called with:', position);
      
      // Start from far right (positive position) and animate to target
      const startFromRight = window.innerWidth;
      translation.set(startFromRight);
      
      // Animate to the target position
      animate(translation, position, {
        duration: 1.5,
        ease: "easeOut",
        onComplete: () => {
          // After animation completes, set the manual position to continue normal flow
          setManualPosition(position);
          setKey(prev => prev + 1);
        }
      });
    },
  }));

  // Listen for custom pause/resume events
  useEffect(() => {
    const handlePause = () => {
      console.log('Slider pause triggered');
      const currentPos = translation.get();
      setPausedPosition(currentPos);
      setIsPaused(true);
    };
    const handleResume = () => {
      console.log('Slider resume triggered');
      setIsPaused(false);
    };
    
    window.addEventListener('slider-pause', handlePause);
    window.addEventListener('slider-resume', handleResume);
    
    return () => {
      window.removeEventListener('slider-pause', handlePause);
      window.removeEventListener('slider-resume', handleResume);
    };
  }, [translation]);

  // Track position changes and notify parent
  useEffect(() => {
    const unsubscribe = translation.on('change', (latest) => {
      if (onPositionChange) {
        onPositionChange(latest);
      }
    });
    
    return unsubscribe;
  }, [translation, onPositionChange]);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    // Don't animate if paused
    if (isPaused) {
      return;
    }

    // Handle manual position changes
    if (manualPosition !== null) {
      translation.set(manualPosition);
      setManualPosition(null);
      return;
    }

    // Always get current position to resume from where we left off
    const currentPosition = translation.get();
    const startPosition = isNaN(currentPosition) ? from : currentPosition;
    
    // Calculate duration to maintain consistent speed
    const remainingDistance = Math.abs(to - startPosition);
    const totalDistance = Math.abs(to - from);
    const durationRatio = remainingDistance / totalDistance;
    const adjustedDuration = currentDuration * durationRatio;
    
    // Create a continuous animation without loops
    controls = animate(translation, [startPosition, to], {
      ease: 'linear',
      duration: adjustedDuration,
      onComplete: () => {
        // When animation completes, start the next cycle seamlessly
        translation.set(from);
        // Trigger the next animation cycle
        setKey(prev => prev + 1);
      },
    });

    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    direction,
    reverse,
    isPaused,
    manualPosition,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={measureRef}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
});

InfiniteSlider.displayName = 'InfiniteSlider';
