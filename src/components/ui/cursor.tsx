import React from 'react';
import { useRouter } from 'next/router';

export function EstokoAppCursor() {
  const router = useRouter();
  
  return (
    <div className="pt-0 pb-32 flex items-center justify-center min-h-screen">
      <div className="flex items-start gap-10 max-w-5xl">
        <img
          src="/images/estokocover.jpg"
          alt="Estoko App"
          className="h-[500px] w-[600px] rounded-[8px] object-cover shadow-2xl"
          onMouseEnter={() => window.dispatchEvent(new CustomEvent("slider-pause"))}
          onMouseLeave={() => window.dispatchEvent(new CustomEvent("slider-resume"))}
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
            onMouseEnter={() => window.dispatchEvent(new CustomEvent("slider-pause"))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent("slider-resume"))}
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
  
  return (
    <div className="pt-0 pb-32 flex items-center justify-center min-h-screen">
      <div className="flex items-start gap-10 max-w-5xl">
        <img
          src="/images/retinac.jpg"
          alt="Retinac"
          className="h-[500px] w-[600px] rounded-[8px] object-cover shadow-2xl cursor-pointer"
          onMouseEnter={() => window.dispatchEvent(new CustomEvent("slider-pause"))}
          onMouseLeave={() => window.dispatchEvent(new CustomEvent("slider-resume"))}
          onClick={() => router.push('/projects/retinac')}
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
            onMouseEnter={() => window.dispatchEvent(new CustomEvent("slider-pause"))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent("slider-resume"))}
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

export function GaryLangCursor() {
  const router = useRouter();
  
  return (
    <div className="pt-0 pb-32 flex items-center justify-center min-h-screen">
      <div className="flex items-start gap-10 max-w-5xl">
        <img
          src="/images/nealfeay.jpg"
          alt="Neal Feay Internship"
          className="h-[500px] w-[600px] rounded-[8px] object-cover shadow-2xl cursor-pointer"
          onMouseEnter={() => window.dispatchEvent(new CustomEvent("slider-pause"))}
          onMouseLeave={() => window.dispatchEvent(new CustomEvent("slider-resume"))}
          onClick={() => router.push('/projects/nealfeay')}
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
            onMouseEnter={() => window.dispatchEvent(new CustomEvent("slider-pause"))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent("slider-resume"))}
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

export function EggHolderCursor() {
  const router = useRouter();
  
  return (
    <div className="pt-0 pb-32 flex items-center justify-center min-h-screen">
      <div className="flex items-start gap-10 max-w-5xl">
        <img
          src="/images/eggcover.jpg"
          alt="Le Coquetier"
          className="h-[500px] w-[600px] rounded-[8px] object-cover shadow-2xl cursor-pointer"
          onMouseEnter={() => window.dispatchEvent(new CustomEvent("slider-pause"))}
          onMouseLeave={() => window.dispatchEvent(new CustomEvent("slider-resume"))}
          onClick={() => router.push('/projects/eggholder')}
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
            onMouseEnter={() => window.dispatchEvent(new CustomEvent("slider-pause"))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent("slider-resume"))}
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

export function GearTrainsCursor() {
  const router = useRouter();
  
  return (
    <div className="pt-0 pb-32 flex items-center justify-center min-h-screen">
      <div className="flex items-start gap-10 max-w-5xl">
        <img
          src="/images/gear-trains.jpg"
          alt="Gear Trains"
          className="h-[500px] w-[600px] rounded-[8px] object-cover shadow-2xl cursor-pointer"
          onMouseEnter={() => window.dispatchEvent(new CustomEvent("slider-pause"))}
          onMouseLeave={() => window.dispatchEvent(new CustomEvent("slider-resume"))}
          onClick={() => router.push('/projects/geartrains')}
        />
        
        <div className="flex flex-col justify-start">
          <h2 className="text-6xl font-bold text-gray-900 mb-4 uppercase tracking-[-0.1em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Gear Trains
          </h2>
          <h3 className="text-2xl font-medium text-gray-600 mb-6 uppercase tracking-[-0.05em]" style={{ fontFamily: "'Inter', sans-serif" }}>
            PRODUCT MANUFACTURING
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-lg mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            A comprehensive gear train system designed and manufactured as part of ME 102 coursework, demonstrating mechanical engineering principles and manufacturing techniques.
          </p>
          <button 
            className="w-16 h-16 rounded-full bg-gray-900 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent("slider-pause"))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent("slider-resume"))}
            onClick={() => router.push('/projects/geartrains')}
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
  return (
    <div className="pt-0 pb-32 flex items-center justify-center min-h-screen">
      <div className="flex items-start gap-10 max-w-5xl">
        <img
          src="/images/releafcover.jpg"
          alt="Releaf App"
          className="h-[500px] w-[600px] rounded-[8px] object-cover shadow-2xl"
          onMouseEnter={() => window.dispatchEvent(new CustomEvent("slider-pause"))}
          onMouseLeave={() => window.dispatchEvent(new CustomEvent("slider-resume"))}
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
            onMouseEnter={() => window.dispatchEvent(new CustomEvent("slider-pause"))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent("slider-resume"))}
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
