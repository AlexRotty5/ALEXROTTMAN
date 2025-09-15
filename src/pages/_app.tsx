import React, { useEffect } from 'react'
import '../styles/globals.css'
import '../styles/text-pressure.css'
import RouteLifecycle from '../components/RouteLifecycle'
import { logPerf } from '../debug/perfLog'
 
export default function App({ Component, pageProps }: any) {
  useEffect(() => {
    // Log performance when app mounts
    logPerf('app-mounted');
  }, []);

  return (
    <>
      <RouteLifecycle />
      <Component {...pageProps} />
    </>
  )
} 