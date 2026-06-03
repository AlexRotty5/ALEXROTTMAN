import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import '../styles/text-pressure.css';
import { ImageLightboxProvider } from '@/components/ImageLightbox';
import { globalCleanup } from '../lib/cleanup';
import { logPerf } from '../debug/perfLog';

export default function App({ Component, pageProps }: any) {
  const router = useRouter();

  useEffect(() => {
    logPerf('app-mounted');
  }, []);

  // Only clean up when navigating away — not on mount/unmount (Strict Mode
  // fake unmount was nuking GSAP/animations and breaking hydration → white screen).
  useEffect(() => {
    const onRouteChangeStart = () => {
      globalCleanup();
    };
    router.events.on('routeChangeStart', onRouteChangeStart);
    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
    };
  }, [router.events]);

  return (
    <ImageLightboxProvider>
      <Component {...pageProps} />
    </ImageLightboxProvider>
  );
} 