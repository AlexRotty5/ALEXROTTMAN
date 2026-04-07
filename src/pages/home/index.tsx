import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import WovenLightHero from '../../components/WovenLightHero';
import IntroScreen from '@/components/IntroScreen';
import Navigation from '@/components/Navigation';

// Typewriter component
const Typewriter = ({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
  style,
}: {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    text,
  ]);

  return (
    <span className={className} style={style}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
};

const HomePage = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'intro'>('home');
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const id = window.setTimeout(() => {
      const section = new URLSearchParams(window.location.search).get('section');
      if (section === 'projects') {
        router.push('/physical-projects');
        window.history.replaceState({}, '', '/');
      }
    }, 10);
    return () => window.clearTimeout(id);
  }, [router]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResetHome = () => {
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('portfolio-reset-home', onResetHome);
    return () => window.removeEventListener('portfolio-reset-home', onResetHome);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {activeSection === 'home' && (
        <div className="fixed top-6 left-6 z-50">
          <img src="/whitelogo.png" alt="Alex Rottman" className="h-16 w-auto brightness-110 hue-rotate-15 saturate-75 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer" onClick={() => router.push("/")} />
        </div>
      )}

      <Navigation currentPage="home" isHeaderVisible={true} />

      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <WovenLightHero shouldAnimate={true} onIntroComplete={() => {}} showText={false} />
        </div>
        <div className="relative z-10 text-center px-4">
        <style jsx>{`
          .blue-gradient-text {
            background: linear-gradient(45deg, #3b82f6, #60a5fa, #1e40af);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientMove 3s ease-in-out infinite;
            padding: 0 2px;
            margin: 0 -2px;
          }
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
          <h1
            className="text-8xl font-bold text-white tracking-[-0.1em] uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.1em'
            }}
          >
            <Typewriter 
              text="Alex    Rottman" 
              speed={200}
              loop={true}
              delay={3000}
              className="text-white"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '-0.1em'
              }}
            /></h1>
          <p
            className="text-xl text-white mb-8 max-w-2xl mx-auto uppercase tracking-[-0.1em]"
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.1em'
            }}
          >
            <span className="blue-gradient-text">ENGINEERING PORTFOLIO</span>
          </p>
          
          <button
            onClick={() => setActiveSection('intro')}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 uppercase tracking-[-0.1em] bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.1em'
            }}
          >
            Enter
          </button>
        </div>
      </section>

      <IntroScreen 
        isActive={activeSection === 'intro'} 
        onComplete={() => router.push('/physical-projects')}
      />
    </div>
  );
};

export default HomePage;
