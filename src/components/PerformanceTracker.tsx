import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackRouteChangePerformance } from '../utils/performance';
import useLogger from '../utils/useLogger';

/**
 * Component that tracks performance metrics for route changes
 */
const PerformanceTracker: React.FC = () => {
  const location = useLocation();
  const logger = useLogger('PerformanceTracker');
  
  useEffect(() => {
    logger.debug('Route changed', { 
      pathname: location.pathname,
      search: location.search
    });
    
    // Track performance for this route change
    trackRouteChangePerformance(location.pathname);
    
    // Clean up any performance marks/measures when component unmounts
    return () => {
      try {
        performance.clearMarks(`route-change-start:${location.pathname}`);
        performance.clearMarks(`route-change-end:${location.pathname}`);
        performance.clearMeasures(`route-change:${location.pathname}`);
      } catch (e) {
        // Some browsers might not support these methods
      }
    };
  }, [location.pathname, location.search, logger]);
  
  // This component doesn't render anything
  return null;
};

export default PerformanceTracker;