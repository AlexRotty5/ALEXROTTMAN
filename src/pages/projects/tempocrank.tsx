// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { ProjectDetailBackNav } from '@/components/ProjectDetailBackNav';
import { ProjectSkillPills } from '@/components/ui/skill-pill';

const TEMPO_CRANK_SKILLS = [
  'Concept Development',
  'CAD Modeling',
  'CAM/CNC',
  'Manufacturing',
  'Mechanical Assembly',
];

const TempoCrankPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [selectedDrawing, setSelectedDrawing] = useState<{
    src: string;
    title: string;
  } | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!videoRef) return;
    videoRef.playbackRate = 1.2;
  }, [videoRef]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9 },
    },
  };

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <ProjectDetailBackNav />
      <Navigation currentPage="projects" isHeaderVisible={true} />

      <motion.div
        className="pt-32 pb-24 px-8 max-w-6xl mx-auto w-full min-w-0"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
      >
        <motion.div className="mb-20" variants={itemVariants}>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <motion.h1
                className="text-6xl sm:text-7xl md:text-8xl font-black text-gray-900 mb-6 tracking-tight leading-none uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Tempo Crank
              </motion.h1>
              <div className="space-y-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                <p className="text-base sm:text-lg text-gray-700 max-w-4xl">
                  I built this mechanical system using 35 individual hardware components, including two bevel gears and two spur gears configured with a 1:2 gear ratio to increase rotational speed and reduce setup time.
                </p>
                <p className="text-base sm:text-lg text-gray-700 max-w-4xl">
                  I designed, programmed, CNC machined, and manufactured this entire system end-to-end. The project required careful attention to tolerances, hardware integration, and manufacturability to ensure the mechanism operated reliably under repeated daily use.
                </p>
              </div>
              <motion.div variants={itemVariants} className="mt-8">
                <ProjectSkillPills labels={TEMPO_CRANK_SKILLS} />
              </motion.div>
            </div>

            <motion.div variants={imageVariants} className="w-full max-w-[24rem] justify-self-center md:-ml-2 md:mt-12">
              <video
                ref={setVideoRef}
                autoPlay
                muted
                loop
                preload="metadata"
                playsInline
                src="/images/crank.MOV"
                className="w-full h-auto max-h-[30rem] object-contain rounded-2xl"
                onClick={() => {
                  setSelectedDrawing(null);
                  setSelectedVideo('/images/crank.MOV');
                }}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mb-20" variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div className="space-y-4" variants={imageVariants}>
              <div className="grid grid-cols-2 gap-4">
                <img loading="lazy" decoding="async" src="/images/paper1.jpg" alt="Concept sketch page 1" className="w-full h-64 object-cover rounded-md" />
                <img loading="lazy" decoding="async" src="/images/Paper2.jpg" alt="Concept sketch page 2" className="w-full h-64 object-cover rounded-md" />
                <img loading="lazy" decoding="async" src="/images/Paper3.jpg" alt="Concept sketch page 3" className="w-full h-64 object-cover rounded-md" />
                <img loading="lazy" decoding="async" src="/images/Paper4.jpg" alt="Concept sketch page 4" className="w-full h-64 object-cover rounded-md" />
              </div>
            </motion.div>

            <motion.div className="space-y-4 flex flex-col justify-start" variants={itemVariants}>
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                CONCEPT SKETCHES
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  I spent time sketching and evaluating different mechanical systems that could make the net cranking motion easier or faster. I explored mechanisms such as a rack and pinion, a Scotch yoke, and other motion-conversion concepts, calculating the mechanical advantage and tradeoffs of each design.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Through this process, I realized the greatest improvement would come from increasing speed rather than reducing effort, which led me to implement a geared transmission system with a 1:2 gear ratio.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mb-20" variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div className="space-y-4" variants={imageVariants}>
              <div className="grid grid-cols-2 gap-4">
                <img loading="lazy" decoding="async" src="/images/Iteration2.jpg" alt="Tempo crank iteration 2" className="w-full h-64 object-cover rounded-md" />
                <img loading="lazy" decoding="async" src="/images/Iteration3.jpg" alt="Tempo crank iteration 3" className="w-full h-64 object-cover rounded-md" />
                <img loading="lazy" decoding="async" src="/images/Iteration4.jpg" alt="Tempo crank iteration 4" className="w-full h-64 object-cover rounded-md" />
                <img loading="lazy" decoding="async" src="/images/Iteration1.jpg .png" alt="Tempo crank iteration 1" className="w-full h-64 object-cover rounded-md" />
              </div>
            </motion.div>

            <motion.div className="space-y-4 flex flex-col justify-start" variants={itemVariants}>
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                ITERATIONS
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  I began prototyping using 3D prints and laser-cut components, including a fully functional 3D-printed version of my gear train. During this phase, I worked through the positioning and spacing constraints of the pole, which ultimately required a change in gear direction and led to the use of bevel gears.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  I experimented with different gear ratios, initially optimizing for easier cranking with a 2:1 compound gear system. After multiple iterations, I simplified the design to a 1:2 gear ratio using four total gears, which better balanced speed, reliability, and manufacturability. Assembling my functional prototype also highlighted how critical tolerancing would be to ensure my hand calculations and torque assumptions matched real-world performance.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mb-20" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
            THREE PARTS
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div variants={imageVariants} className="rounded-xl border border-stone-200 bg-stone-50 p-4 sm:p-5">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 uppercase tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                1. Handle
              </h3>
              <img
                loading="lazy"
                decoding="async"
                src="/images/ENGINEERINGDRAWING3.jpg"
                alt="Handle engineering drawing"
                className="w-full h-72 object-contain rounded-lg bg-white p-2 cursor-zoom-in"
                onClick={() =>
                  setSelectedDrawing({
                    src: '/images/ENGINEERINGDRAWING3.jpg',
                    title: '1. HANDLE',
                  })
                }
              />
            </motion.div>
            <motion.div variants={imageVariants} className="rounded-xl border border-stone-200 bg-stone-50 p-4 sm:p-5">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 uppercase tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                2. Housing
              </h3>
              <img
                loading="lazy"
                decoding="async"
                src="/images/ENGINEERINGDRAWING2.jpg"
                alt="Housing engineering drawing"
                className="w-full h-72 object-contain rounded-lg bg-white p-2 cursor-zoom-in"
                onClick={() =>
                  setSelectedDrawing({
                    src: '/images/ENGINEERINGDRAWING2.jpg',
                    title: '2. HOUSING',
                  })
                }
              />
            </motion.div>
            <motion.div variants={imageVariants} className="rounded-xl border border-stone-200 bg-stone-50 p-4 sm:p-5">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 uppercase tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                3. Insert
              </h3>
              <img
                loading="lazy"
                decoding="async"
                src="/images/insertdrawing.jpg"
                alt="Insert engineering drawing"
                className="w-full h-72 object-contain rounded-lg bg-white p-2 cursor-zoom-in"
                onClick={() =>
                  setSelectedDrawing({
                    src: '/images/insertdrawing.jpg',
                    title: '3. INSERT',
                  })
                }
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mb-20" variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={imageVariants}>
              <img
                loading="lazy"
                decoding="async"
                src="/images/ENGINEERINGDRAWING1.jpg"
                alt="Tempo crank exploded assembly engineering drawing"
                className="w-full h-[24rem] sm:h-[28rem] object-contain rounded-xl bg-stone-100 p-3 cursor-zoom-in"
                onClick={() =>
                  setSelectedDrawing({
                    src: '/images/ENGINEERINGDRAWING1.jpg',
                    title: 'ASSEMBLY EXPLODED VIEW',
                  })
                }
              />
            </motion.div>

            <motion.div className="space-y-4 flex flex-col justify-start" variants={itemVariants}>
              <h2 className="text-4xl font-bold text-gray-900 uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                ONE ASSEMBLY
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Exploded-view drawing showing how the handle, housing, and insert integrate with shafts, gears, and hardware.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  This assembly consists of 3 CNC machined parts and 35 different pieces of hardware requiring extremely tight tolerances.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mb-20" variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div className="space-y-4" variants={imageVariants}>
              <div className="grid grid-cols-2 gap-4">
                <img loading="lazy" decoding="async" src="/images/CAD1.jpg" alt="CAD assembly study 1" className="w-full h-60 object-contain rounded-md" />
                <img loading="lazy" decoding="async" src="/images/CAD2.jpg" alt="CAD assembly study 2" className="w-full h-60 object-cover rounded-md" />
                <div className="rounded-md ring-2 ring-stone-300 ring-offset-2 ring-offset-white">
                  <img loading="lazy" decoding="async" src="/images/CAM1.jpg" alt="CAM setup and simulation 1" className="w-full h-60 object-contain rounded-md" />
                </div>
                <div className="rounded-md ring-2 ring-stone-300 ring-offset-2 ring-offset-white">
                  <img loading="lazy" decoding="async" src="/images/CAM2.jpg" alt="CAM setup and simulation 2" className="w-full h-60 object-cover rounded-md" />
                </div>
              </div>
            </motion.div>

            <motion.div className="space-y-4 flex flex-col justify-start" variants={itemVariants}>
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                CAD + CAM
              </h2>
              <div className="space-y-8 text-gray-700 leading-relaxed">
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  In CAD, I spent most of my time sourcing and modeling compatible hardware in McMaster and Fusion, navigating tight constraints and limited part compatibility.
                </p>
                <div className="flex gap-4 items-start">
                  <svg
                    className="mt-1.5 h-5 w-14 shrink-0 text-stone-400"
                    viewBox="0 0 56 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M54 10H10M16 4l-6 6 6 6" />
                  </svg>
                  <p className="text-xl flex-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                    In CAM, I continuously iterated my design, tooling, and workholding to reduce machining time. My original handle design required nearly four hours of machine time, and with a constraint of ten total hours across all three parts, I redesigned the component to be machined more efficiently.
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <svg
                    className="mt-1.5 h-5 w-14 shrink-0 text-stone-400"
                    viewBox="0 0 56 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M54 10H10M16 4l-6 6 6 6" />
                  </svg>
                  <p className="text-xl flex-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                    I carefully measured tools and input accurate speeds and feeds into CAM. For the housing, I kept tool stickout in mind while drilling deep central holes, using a reamer for deeper features and verifying all tool dimensions to ensure reliable machining.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mb-20" variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div className="space-y-4" variants={imageVariants}>
              <div className="grid grid-cols-2 gap-4">
                <img loading="lazy" decoding="async" src="/images/Housing1.jpg" alt="Housing machining 1" className="w-full h-64 object-cover rounded-md" />
                <img loading="lazy" decoding="async" src="/images/Housing2.jpg" alt="Housing machining 2" className="w-full h-64 object-cover rounded-md" />
                <img loading="lazy" decoding="async" src="/images/Insert1.jpg" alt="Insert machining detail" className="w-full h-64 object-cover rounded-md" />
                <img loading="lazy" decoding="async" src="/images/Handle1.jpg" alt="Handle machining detail" className="w-full h-64 object-cover rounded-md" />
              </div>
            </motion.div>

            <motion.div className="space-y-4 flex flex-col justify-start" variants={itemVariants}>
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                MACHINING
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  My machining process was generally straightforward. My workholding was simple and secure in the vise, and my handle used tabs to minimize part flips and maintain stability. The housing required the most complexity, with seven different setups, and I consistently probed the same stock reference point to avoid large offsets when working with hardware.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  One challenge occurred during my final operation while tapping a 4-40 set screw hole in steel. Using a small, heavily used shop tap, the tap broke in the hole, and I initially thought the part was ruined. However, I used an arbor press to push a rotary shaft through an intersecting hole, which dislodged the broken tap and allowed me to re-drill and tap the insert on the manual mill.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mb-10" variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div className="space-y-4 min-w-0 max-w-full" variants={imageVariants}>
              <div className="grid grid-cols-2 gap-4">
                <img loading="lazy" decoding="async" src="/images/Post1.jpg" alt="Post-machining sanding step" className="w-full h-60 object-cover rounded-md" />
                <img loading="lazy" decoding="async" src="/images/Post2.jpg" alt="Post-machining cleanup" className="w-full h-60 object-cover rounded-md" />
                <img loading="lazy" decoding="async" src="/images/Post3.jpg" alt="Post-machining hardware retention" className="w-full h-60 object-cover rounded-md" />
                <img loading="lazy" decoding="async" src="/images/Post4.jpg" alt="Assembly process image" className="w-full h-60 object-cover rounded-md" />
              </div>
            </motion.div>

            <motion.div className="space-y-4 flex flex-col justify-start" variants={itemVariants}>
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                POST PROCESS, ASSEMBLY & TESTING
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Belt sanded rotary shafts to create flats for set screws.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Sanded and removed tabs from my handle. Applied Loctite to bearings to ensure reliable long-term retention under radial loads.
                </p>
                <p className="text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  I also spent significant time iterating with hardware to achieve optimal gear meshing.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mb-10" variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div className="min-w-0 max-w-full" variants={imageVariants}>
              <img
                loading="lazy"
                decoding="async"
                src="/images/post6.jpg"
                alt="Tempo crank post-process or final assembly detail"
                className="w-full max-w-full h-auto rounded-md object-contain"
              />
            </motion.div>
            <motion.div className="min-w-0 max-w-full flex items-start" variants={itemVariants}>
              <h3
                className="text-2xl font-semibold text-black leading-tight"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Test and set up the net for a big game against BYU!
              </h3>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {selectedDrawing && (
        <div
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedDrawing(null)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedDrawing(null)}
              className="absolute -top-12 right-0 text-white text-sm uppercase tracking-wide hover:text-gray-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Close
            </button>
            <div className="bg-white rounded-xl p-4 sm:p-6">
              <h3
                className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {selectedDrawing.title}
              </h3>
              <img
                src={selectedDrawing.src}
                alt={`${selectedDrawing.title} engineering drawing enlarged`}
                className="w-full max-h-[80vh] object-contain rounded-lg bg-stone-100"
              />
            </div>
          </div>
        </div>
      )}

      {selectedVideo && (
        <div
          className="fixed inset-0 z-[140] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white text-sm uppercase tracking-wide hover:text-gray-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Close
            </button>

            <div className="bg-black rounded-xl overflow-hidden">
              <video
                src={selectedVideo}
                playsInline
                autoPlay
                className="w-full max-h-[80vh] object-contain"
                onLoadedMetadata={(e) => {
                  e.currentTarget.playbackRate = 1.2;
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TempoCrankPage;
