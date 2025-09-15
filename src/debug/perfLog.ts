interface PerfData {
  tag: string;
  heapMB?: number;
  domNodes: number;
  time: string;
  timestamp: number;
}

export function logPerf(tag: string): void {
  const perfData: PerfData = {
    tag,
    domNodes: document.getElementsByTagName('*').length,
    time: new Date().toISOString(),
    timestamp: performance.now()
  };

  // Get JS heap size if available
  if ((performance as any).memory) {
    perfData.heapMB = Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024);
  }

  console.log('🔍 Performance Log:', perfData);
  
  // Also log to performance timeline if available
  if (performance.mark) {
    performance.mark(`perf-${tag}-${Date.now()}`);
  }
}

// Global registry for tracking cleanup items
export const cleanupRegistry = {
  rafIds: new Set<number>(),
  intervals: new Set<NodeJS.Timeout>(),
  timeouts: new Set<NodeJS.Timeout>(),
  listeners: new Set<{ target: EventTarget; type: string; listener: EventListener; options?: boolean | AddEventListenerOptions }>(),
  observers: new Set<{ observer: IntersectionObserver | ResizeObserver | MutationObserver }>(),
  gsapContexts: new Set<any>(),
  threeRenderers: new Set<any>(),
  lenisInstances: new Set<any>()
};

export function trackRAF(fn: FrameRequestCallback): number {
  const id = requestAnimationFrame(fn);
  cleanupRegistry.rafIds.add(id);
  return id;
}

export function trackInterval(fn: (...args: any[]) => void, ms: number): NodeJS.Timeout {
  const id = setInterval(fn, ms);
  cleanupRegistry.intervals.add(id);
  return id;
}

export function trackTimeout(fn: (...args: any[]) => void, ms: number): NodeJS.Timeout {
  const id = setTimeout(fn, ms);
  cleanupRegistry.timeouts.add(id);
  return id;
}

export function trackListener(target: EventTarget, type: string, listener: EventListener, options?: boolean | AddEventListenerOptions): void {
  target.addEventListener(type, listener, options);
  cleanupRegistry.listeners.add({ target, type, listener, options });
}

export function trackObserver(observer: IntersectionObserver | ResizeObserver | MutationObserver): void {
  cleanupRegistry.observers.add({ observer });
}

export function trackGSAPContext(context: any): void {
  cleanupRegistry.gsapContexts.add(context);
}

export function trackThreeRenderer(renderer: any): void {
  cleanupRegistry.threeRenderers.add(renderer);
}

export function trackLenisInstance(instance: any): void {
  cleanupRegistry.lenisInstances.add(instance);
} 