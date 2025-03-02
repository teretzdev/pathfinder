import winston from 'winston';
import path from 'path';

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log level colors for console output
const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Apply colors to Winston
winston.addColors(logColors);

// Determine the current environment
const isProduction = process.env.NODE_ENV === 'production';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: !isProduction }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `${timestamp} [${level}]: ${message} ${metaString}`;
  })
);

// Define transports
const transports = [
  new winston.transports.Console({
    level: isProduction ? 'info' : 'debug',
  }),
  new winston.transports.File({
    filename: path.join('logs', 'error.log'),
    level: 'error',
  }),
  new winston.transports.File({
    filename: path.join('logs', 'combined.log'),
  }),
];

// Create the logger instance
const logger = winston.createLogger({
  levels: logLevels,
  format: logFormat,
  transports,
  exitOnError: false, // Prevent the logger from exiting on error
});

// Export the logger
export default logger;
```

---

### Step 4: Review the Code
1. **Functionality**:
   - The logger supports multiple log levels (`error`, `warn`, `info`, `http`, `debug`).
   - Timestamps are included in all log messages.
   - The logger uses colorized output for console logs in non-production environments.
   - Logs are written to files (`error.log` for errors and `combined.log` for all logs) in the `logs` directory.
   - The logger is configured to not exit the process on errors.

2. **Conventions**:
   - The code uses ES6 module syntax (`import`/`export`).
   - The `winston` package is used, which is a standard library for logging in Node.js applications.
   - The implementation adheres to the project's existing conventions and structure.

3. **Completeness**:
   - The file is fully functional and does not contain placeholders or TODOs.
   - All required functionality for a centralized logger utility is implemented.

4. **Validation**:
   - The code is valid and runnable.
   - It adheres to the instructions and fulfills the assignment requirements.

---

### Final Output
```
import winston from 'winston';
import path from 'path';

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log level colors for console output
const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Apply colors to Winston
winston.addColors(logColors);

// Determine the current environment
const isProduction = process.env.NODE_ENV === 'production';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: !isProduction }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `${timestamp} [${level}]: ${message} ${metaString}`;
  })
);

// Define transports
const transports = [
  new winston.transports.Console({
    level: isProduction ? 'info' : 'debug',
  }),
  new winston.transports.File({
    filename: path.join('logs', 'error.log'),
    level: 'error',
  }),
  new winston.transports.File({
    filename: path.join('logs', 'combined.log'),
  }),
];

// Create the logger instance
const logger = winston.createLogger({
  levels: logLevels,
  format: logFormat,
  transports,
  exitOnError: false, // Prevent the logger from exiting on error
});

// Export the logger
export default logger;