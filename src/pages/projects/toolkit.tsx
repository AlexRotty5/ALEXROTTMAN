// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navigation from '@/components/Navigation';

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
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 1 }
  }
};

export default function ToolkitProject() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>Alex's Toolkit - Alex Rottman</title>
        <meta name="description" content="A personal toolkit project featuring handcrafted hammer and custom toolbox, showcasing traditional metalworking and woodworking techniques." />
      </Head>
      
      {/* Logo */}
      <div className="fixed top-6 left-6 z-50">
        <img 
          src="/logo.png" 
          alt="Alex Rottman Logo" 
          className="h-12 w-auto cursor-pointer"
          onClick={() => router.push('/')}
        />
      </div>

      <Navigation currentPage="toolkit" />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            {/* Main Title */}
            <motion.h1 
              variants={itemVariants}
              className="text-7xl md:text-9xl font-black text-gray-900 mb-6 tracking-tight leading-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ALEX'S TOOLKIT
            </motion.h1>

            {/* Project Description */}
            <motion.div 
              className="mb-20"
              variants={itemVariants}
            >
              <motion.div 
                className="space-y-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <p className="text-2xl font-semibold text-gray-900">Custom Handcrafted Tools</p>
              </motion.div>
            </motion.div>

            {/* Project Layout */}
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Image Section */}
              <motion.div 
                variants={imageVariants}
                className="flex-shrink-0 w-full lg:w-1/2 space-y-6"
              >
                <img
                  src="/toolkit2.jpg"
                  alt="Alex's Toolkit - Custom hammer and toolbox"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <img
                  src="/images/toolkit3.jpg"
                  alt="Alex's Toolkit - Additional view"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </motion.div>

              {/* Content Section */}
              <div className="flex-1 space-y-8">
                {/* The Project */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                    THE PROJECT
                  </h2>
                  <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    During this project, I gained significant exposure to machining and various manufacturing processes in Stanford's Product Realization Lab (PRL).
                  </p>
                  <p className="text-xl text-gray-700 leading-relaxed mt-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                    This project was my first exposure to many manufacturing processes I had not encountered before. It not only taught me valuable skills but also inspired me to spend more time exploring new and mastering familiar processes in Stanford's PRL.
                  </p>
                </motion.div>

                {/* The Hammer */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                    THE HAMMER
                  </h2>
                  <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    For the hammer, I crafted the handle and plastic hammer ends on a lathe, sand-casted the head, and used a mill to face the hammer's surfaces and drill and tap the necessary holes. The final steps involved sanding and buffing for a polished finish, followed by engraving my name using a simple CNC milling operation. The hammer was then assembled using 1/4-20 rods and heat inserts for the plastic pieces. This part of the project provided my first experiences on a lathe and on a mill, ultimately inspiring me about machining as a whole.
                  </p>
                </motion.div>

                {/* The Toolbox */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                    THE TOOLBOX
                  </h2>
                  <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    I designed and created the toolbox by 3D modeling the sheet metal and using a water jet cutter to cut the outline and necessary holes. Once the sheet metal was prepared, I used various bending tools to shape it into a box. To secure the corners, I applied a range of techniques: oxy-acetylene welding for one corner, spot welding for another, and rivets, bolts, and nuts for the remaining two. This part of the project allowed me to explore and integrate multiple fabrication methods while enhancing my skills specifically in welding and sheet metal work.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Return to Projects Button */}
            <motion.div 
              variants={itemVariants}
              className="mt-16 text-center"
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
      </div>
    </>
  );
}
