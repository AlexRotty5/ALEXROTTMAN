import React, { useEffect, useState } from 'react';
import { logPerf, trackRAF, trackInterval, trackTimeout, trackListener } from '../../debug/perfLog';

export default function DebugPage() {
  const [testCount, setTestCount] = useState(0);

  useEffect(() => {
    logPerf('debug-page-mounted');

    // Create some test effects that need cleanup
    const rafId = trackRAF(() => {
      setTestCount(prev => prev + 1);
    });

    const intervalId = trackInterval(() => {
      console.log('Test interval running...');
    }, 1000);

    const timeoutId = trackTimeout(() => {
      console.log('Test timeout completed');
    }, 5000);

    const handleScroll = () => {
      console.log('Test scroll event');
    };

    trackListener(window, 'scroll', handleScroll, { passive: true });

    // Cleanup function
    return () => {
      logPerf('debug-page-unmounting');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Performance Debug Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          <div className="space-y-4">
            <button
              onClick={() => logPerf('manual-button-click')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Log Performance (Manual)
            </button>
            
            <div className="text-sm text-gray-600">
              <p>Test Count: {testCount}</p>
              <p>Press 'P' key to log performance manually</p>
              <p>Check console for performance logs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Monitoring</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• This page creates test effects (rAF, interval, timeout, scroll listener)</p>
            <p>• Navigate away to test cleanup</p>
            <p>• Check console for cleanup logs</p>
            <p>• Monitor Chrome Performance tab for memory leaks</p>
          </div>
        </div>
      </div>
    </div>
  );
} 