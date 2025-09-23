// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Navigation from '@/components/Navigation';

const EstokoPage = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Logo */}
      <motion.div 
        className="fixed top-8 left-8 z-50"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img 
          src="/whitelogo.png" 
          alt="Alex Rottman" 
          className="h-12 w-auto brightness-110 hue-rotate-15 saturate-75 transition-all duration-300 ease-out hover:scale-105 cursor-pointer" 
          onClick={() => router.push("/")} 
        />
      </motion.div>

      {/* Navigation */}
      <Navigation currentPage="projects" isHeaderVisible={true} />

      {/* Main Content */}
      <motion.div
        className="pt-32 pb-24 px-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Project Header */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-7xl md:text-9xl font-black text-emerald-600 mb-6 tracking-tight leading-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ESTOKO
          </motion.h1>
          <motion.div 
            className="space-y-1"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p className="text-2xl font-semibold text-gray-900">App Development Intern</p>
            <p className="text-lg text-gray-500">Barcelona, Spain — Summer 2026</p>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Side - Project Image */}
          <motion.div 
            className="relative"
            variants={imageVariants}
          >
            <div className="relative overflow-hidden bg-gray-50">
              {/* Project Image Placeholder */}
              <div className="aspect-[4/5] bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center relative">
                {/* Team Photo Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-emerald-200/30"></div>
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-white rounded-lg mx-auto mb-6 flex items-center justify-center shadow-sm border border-gray-200">
                    <div className="w-12 h-12 bg-emerald-500 rounded-sm"></div>
                  </div>
                  <p className="text-emerald-800 font-semibold text-lg">Team Photo</p>
                  <p className="text-emerald-600 text-sm">Barcelona Office</p>
                </div>
                
                {/* Estoko Banner Mockup */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">K</span>
                    </div>
                    <span className="text-emerald-600 font-bold text-xl">estoxo</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 font-medium">Warehousing-as-a-Service</p>
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Todos los almacenes de España a tu disposición.
                  </p>
                  <p className="text-xs text-gray-600">
                    Dinos dónde y cuándo quieres almacenar tus cosas, nosotros lo hacemos posible.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Project Description */}
          <motion.div 
            className="space-y-12"
            variants={itemVariants}
          >
            <motion.div 
              className="bg-white border border-gray-200 p-10"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                Project Overview
              </h2>
              <div className="space-y-8 text-gray-700 leading-relaxed">
                <p className="text-xl">
                  I was tasked with developing a fully new <span className="font-bold text-emerald-600">web app</span> for <span className="font-bold text-emerald-600">Estoko</span>. A startup that makes logistics easier as a third party to clients and warehouses.
                </p>
                
                <p className="text-xl">
                  I designed new <span className="font-bold text-emerald-600">UI/UX</span> through tools like Figma, Sketch, and UIWizard.
                </p>
                
                <p className="text-xl">
                  I developed the <span className="font-bold text-emerald-600">frontend code</span> with JavaScript, React, NextJS, Framer, and Tailwind CSS.
                </p>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div 
              className="bg-emerald-50 border border-emerald-200 p-10"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-emerald-900 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                Technologies Used
              </h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { name: "React", color: "bg-blue-50 border-blue-200 text-blue-800" },
                  { name: "Next.js", color: "bg-gray-50 border-gray-200 text-gray-800" },
                  { name: "TypeScript", color: "bg-blue-50 border-blue-200 text-blue-800" },
                  { name: "Tailwind CSS", color: "bg-cyan-50 border-cyan-200 text-cyan-800" },
                  { name: "Framer Motion", color: "bg-purple-50 border-purple-200 text-purple-800" },
                  { name: "Figma", color: "bg-pink-50 border-pink-200 text-pink-800" }
                ].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className={`${tech.color} border rounded-sm p-4 text-center hover:shadow-sm transition-all duration-200`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="font-semibold text-sm">{tech.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Key Features */}
            <motion.div 
              className="bg-white border border-gray-200 p-10"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                Key Achievements
              </h3>
              <div className="space-y-6">
                {[
                  "Developed responsive web application from scratch",
                  "Created intuitive user interface for warehouse management",
                  "Implemented real-time logistics tracking system",
                  "Optimized for mobile and desktop experiences"
                ].map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-emerald-500 mt-3 flex-shrink-0"></div>
                    <p className="text-gray-700 text-lg leading-relaxed">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Back Button */}
        <motion.div 
          className="text-center mt-20"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => router.back()}
            className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-gray-900 uppercase tracking-wide bg-white border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Back to Projects
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EstokoPage;
