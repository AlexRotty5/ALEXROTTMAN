"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';

interface WovenLightHeroProps {
  shouldAnimate?: boolean;
  onIntroComplete?: (complete: boolean) => void;
  showText?: boolean;
}

// --- Main Hero Component ---
export const WovenLightHero: React.FC<WovenLightHeroProps> = ({ shouldAnimate = false, onIntroComplete, showText = true }) => {
  const textControls1 = useAnimation();
  const textControls2 = useAnimation();
  const textControls3 = useAnimation();
  const textControls4 = useAnimation();
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  useEffect(() => {
    // Add Inter font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
        document.head.removeChild(link);
    }
  }, []);

  useEffect(() => {
    if (shouldAnimate) {
      // Staggered animation sequence
      const animateText = async () => {
        // Reset all animations first
        await Promise.all([
          textControls1.start({ opacity: 0, y: 30 }),
          textControls2.start({ opacity: 0, y: 30 }),
          textControls3.start({ opacity: 0, y: 30 }),
          textControls4.start({ opacity: 0, x: 30 })
        ]);

        // Row 1 appears first
        await textControls1.start({
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.2,
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9]
          }
        });

        // Row 2 appears second
        await textControls2.start({
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.1,
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9]
          }
        });

        // Row 3 appears third
        await textControls3.start({
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.1,
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9]
          }
        });

        // Right side text appears last
        await textControls4.start({
          opacity: 1,
          x: 0,
          transition: {
            delay: 0.2,
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9]
          }
        });

        // Mark intro as complete
        setIntroComplete(true);
        if (onIntroComplete) {
          onIntroComplete(true);
        }
      };

      animateText();
    } else {
      // Reset animations when not visible
      textControls1.start({ opacity: 0, y: 30 });
      textControls2.start({ opacity: 0, y: 30 });
      textControls3.start({ opacity: 0, y: 30 });
      textControls4.start({ opacity: 0, x: 30 });
      setIntroComplete(false);
      if (onIntroComplete) {
        onIntroComplete(false);
      }
    }
  }, [shouldAnimate, textControls1, textControls2, textControls3, textControls4]);

  // Prevent scrolling on first visit until intro is complete
  useEffect(() => {
    if (isFirstVisit && !introComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFirstVisit, introComplete]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black dark:bg-white">
      <WovenCanvas />
      {showText && (
        <div className="relative z-10 flex justify-between items-center px-8 py-12 w-full max-w-7xl mx-auto">
        <style jsx>{`
          .gradient-text {
            background: linear-gradient(45deg, #22c55e, #15803d, #22c55e);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientMove 3s ease-in-out infinite;
          }
          .blue-gradient-text {
            background: linear-gradient(45deg, #3b82f6, #60a5fa, #1e40af);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientMove 3s ease-in-out infinite;
          }
          .purple-gradient-text {
            background: linear-gradient(45deg, #a855f7, #ec4899, #7c3aed);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientMove 3s ease-in-out infinite;
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
            animate={textControls1}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white dark:text-slate-900"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.1em'
            }}
          >
            I <span className="gradient-text">DESIGN</span>
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={textControls2}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white dark:text-slate-900"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.1em'
            }}
          >
            I <span className="blue-gradient-text">ENGINEER</span>
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={textControls3}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white dark:text-slate-900"
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
          animate={textControls4}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white dark:text-slate-900 max-w-lg text-right"
          style={{ 
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.1em'
          }}
        >
          PRODUCTS IN PHYSICAL AND DIGITAL WORLDS
        </motion.h1>
      </div>
      )}
    </div>
  );
};

// --- Three.js Canvas Component ---
const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const geometryRef = useRef<THREE.BufferGeometry>();
  const materialRef = useRef<THREE.PointsMaterial>();
  const pointsRef = useRef<THREE.Points>();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    mountRef.current.appendChild(renderer.domElement);

    // Store refs for cleanup
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // --- Woven Silk ---
    const particleCount = 50000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    for (let i = 0; i < particleCount; i++) {
        const vertexIndex = i % torusKnot.attributes.position.count;
        const x = torusKnot.attributes.position.getX(vertexIndex);
        const y = torusKnot.attributes.position.getY(vertexIndex);
        const z = torusKnot.attributes.position.getZ(vertexIndex);
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        originalPositions[i * 3] = x;
        originalPositions[i * 3 + 1] = y;
        originalPositions[i * 3 + 2] = z;

        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.8, isDarkMode ? 0.5 : 0.7);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        velocities[i * 3] = 0;
        velocities[i * 3 + 1] = 0;
        velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        blending: isDarkMode ? THREE.NormalBlending : THREE.AdditiveBlending,
        transparent: true,
        opacity: isDarkMode ? 1.0 : 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Store refs for cleanup
    geometryRef.current = geometry;
    materialRef.current = material;
    pointsRef.current = points;

    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0);

        for (let i = 0; i < particleCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            const currentPos = new THREE.Vector3(positions[ix], positions[iy], positions[iz]);
            const originalPos = new THREE.Vector3(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
            const velocity = new THREE.Vector3(velocities[ix], velocities[iy], velocities[iz]);

            const dist = currentPos.distanceTo(mouseWorld);
            if (dist < 1.5) {
                const force = (1.5 - dist) * 0.01;
                const direction = new THREE.Vector3().subVectors(currentPos, mouseWorld).normalize();
                velocity.add(direction.multiplyScalar(force));
            }

            // Return to original position
            const returnForce = new THREE.Vector3().subVectors(originalPos, currentPos).multiplyScalar(0.001);
            velocity.add(returnForce);
            
            // Damping
            velocity.multiplyScalar(0.95);

            positions[ix] += velocity.x;
            positions[iy] += velocity.y;
            positions[iz] += velocity.z;
            
            velocities[ix] = velocity.x;
            velocities[iy] = velocity.y;
            velocities[iz] = velocity.z;
        }
        geometry.attributes.position.needsUpdate = true;

        points.rotation.y = elapsedTime * 0.05;
        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        // Cancel animation frame
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        // Remove event listeners
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);

        // Cleanup Three.js resources
        if (geometryRef.current) {
            geometryRef.current.dispose();
        }
        if (materialRef.current) {
            materialRef.current.dispose();
        }
        if (rendererRef.current) {
            rendererRef.current.dispose();
            rendererRef.current.forceContextLoss();
        }

        // Remove canvas from DOM
        if (mountRef.current && rendererRef.current?.domElement) {
            mountRef.current.removeChild(rendererRef.current.domElement);
        }

        // Clear refs
        sceneRef.current = undefined;
        cameraRef.current = undefined;
        rendererRef.current = undefined;
        geometryRef.current = undefined;
        materialRef.current = undefined;
        pointsRef.current = undefined;
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default WovenLightHero; 