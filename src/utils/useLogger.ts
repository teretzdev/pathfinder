import { useContext, createContext } from 'react';
import frontendLogger, { createContextLogger } from './logger';

// Create a context for the logger
const LoggerContext = createContext(frontendLogger);

/**
 * Hook to access the logger with component context
 * @param componentName - Optional component name to include in logs
 * @returns Logger instance with component context
 */
export const useLogger = (componentName?: string) => {
  const contextLogger = useContext(LoggerContext);
  
  if (componentName) {
    return contextLogger.child({ component: componentName });
  }
  
  return contextLogger;
};

/**
 * Provider component for the logger context
 */
export const LoggerProvider = ({ children, context = {} }: { 
  children: React.ReactNode;
  context?: Record<string, unknown>;
}) => {
  const logger = createContextLogger(context);
  
  return (
    <LoggerContext.Provider value={logger}>
      {children}
    </LoggerContext.Provider>
  );
};

export default useLogger;