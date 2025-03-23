import frontendLogger from './logger';

interface PerformanceMetrics {
  timeToFirstByte?: number;
  domContentLoaded?: number;
  windowLoaded?: number;
  firstPaint?: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  timeToInteractive?: number;
  totalBlockingTime?: number;
  cumulativeLayoutShift?: number;
  memoryUsage?: {
    jsHeapSizeLimit?: number;
    totalJSHeapSize?: number;
    usedJSHeapSize?: number;
  };
  navigationTiming?: Record<string, number>;
  resourceTiming?: Array<{
    name: string;
    duration: number;
    transferSize: number;
    initiatorType: string;
  }>;
}

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = (): void => {
  const logger = frontendLogger.child({ component: 'PerformanceMonitoring' });
  
  // Log initial page load metrics
  window.addEventListener('load', () => {
    // Wait for all metrics to be available
    setTimeout(() => {
      const metrics = collectPerformanceMetrics();
      logger.info('Page load performance metrics', metrics);
    }, 1000);
  });
  
  // Monitor for layout shifts
  if ('PerformanceObserver' in window) {
    try {
      // Layout shifts
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const lastEntry = entries[entries.length - 1];
          if (lastEntry.value > 0.1) {
            logger.warn('Large layout shift detected', {
              value: lastEntry.value,
              sources: lastEntry.sources || [],
              url: window.location.href
            });
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      
      // Long tasks
      const longTaskObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (entry.duration > 100) {
            logger.warn('Long task detected', {
              duration: entry.duration,
              startTime: entry.startTime,
              url: window.location.href
            });
          }
        });
      });
      longTaskObserver.observe({ type: 'longtask', buffered: true });
      
      // Resource loading
      const resourceObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (entry.duration > 1000) {
            logger.warn('Slow resource load', {
              name: entry.name,
              duration: entry.duration,
              transferSize: (entry as any).transferSize,
              initiatorType: (entry as any).initiatorType,
              url: window.location.href
            });
          }
        });
      });
      resourceObserver.observe({ type: 'resource', buffered: true });
    } catch (e) {
      logger.error('Error setting up performance observers', { error: e });
    }
  }
};

/**
 * Collect performance metrics
 */
export const collectPerformanceMetrics = (): PerformanceMetrics => {
  const metrics: PerformanceMetrics = {};
  
  try {
    // Navigation timing
    if (performance.timing) {
      const timing = performance.timing;
      
      metrics.timeToFirstByte = timing.responseStart - timing.requestStart;
      metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
      metrics.windowLoaded = timing.loadEventEnd - timing.navigationStart;
      
      // Collect all navigation timing metrics
      metrics.navigationTiming = {};
      for (const key in timing) {
        if (typeof timing[key] === 'number') {
          metrics.navigationTiming[key] = timing[key];
        }
      }
    }
    
    // Paint timing
    if (window.performance && performance.getEntriesByType) {
      const paintMetrics = performance.getEntriesByType('paint');
      paintMetrics.forEach(entry => {
        if (entry.name === 'first-paint') {
          metrics.firstPaint = entry.startTime;
        }
        if (entry.name === 'first-contentful-paint') {
          metrics.firstContentfulPaint = entry.startTime;
        }
      });
      
      // Resource timing
      const resourceEntries = performance.getEntriesByType('resource');
      metrics.resourceTiming = resourceEntries.map(entry => ({
        name: entry.name,
        duration: entry.duration,
        transferSize: (entry as any).transferSize || 0,
        initiatorType: (entry as any).initiatorType || 'unknown'
      }));
    }
    
    // Memory usage
    if (performance.memory) {
      metrics.memoryUsage = {
        jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / (1024 * 1024)),
        totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / (1024 * 1024)),
        usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / (1024 * 1024))
      };
    }
    
    // Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      if (lcpEntries.length > 0) {
        metrics.largestContentfulPaint = lcpEntries[lcpEntries.length - 1].startTime;
      }
      
      // CLS
      let cumulativeLayoutShift = 0;
      const layoutShiftEntries = performance.getEntriesByType('layout-shift');
      layoutShiftEntries.forEach(entry => {
        if (!(entry as any).hadRecentInput) {
          cumulativeLayoutShift += (entry as any).value;
        }
      });
      metrics.cumulativeLayoutShift = parseFloat(cumulativeLayoutShift.toFixed(4));
      
      // TBT
      let totalBlockingTime = 0;
      const longTaskEntries = performance.getEntriesByType('longtask');
      longTaskEntries.forEach(entry => {
        totalBlockingTime += entry.duration - 50; // Only count time beyond 50ms
      });
      metrics.totalBlockingTime = totalBlockingTime;
    }
  } catch (error) {
    frontendLogger.error('Error collecting performance metrics', { error });
  }
  
  return metrics;
};

/**
 * Track route change performance
 */
export const trackRouteChangePerformance = (route: string): void => {
  const startTime = performance.now();
  const logger = frontendLogger.child({ component: 'RoutePerformance', route });
  
  // Mark the route change start
  performance.mark(`route-change-start:${route}`);
  
  // Wait for the next frame to measure render time
  requestAnimationFrame(() => {
    // Wait a bit more to ensure all components have rendered
    setTimeout(() => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Mark the route change end
      performance.mark(`route-change-end:${route}`);
      
      // Measure between the marks
      performance.measure(
        `route-change:${route}`,
        `route-change-start:${route}`,
        `route-change-end:${route}`
      );
      
      logger.info('Route change performance', {
        duration: `${duration.toFixed(2)}ms`,
        route,
        timestamp: new Date().toISOString()
      });
      
      // Collect memory usage if available
      if (performance.memory) {
        logger.debug('Memory usage after route change', {
          jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / (1024 * 1024)) + 'MB',
          totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / (1024 * 1024)) + 'MB',
          usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / (1024 * 1024)) + 'MB'
        });
      }
    }, 100);
  });
};

export default {
  initPerformanceMonitoring,
  collectPerformanceMetrics,
  trackRouteChangePerformance
};