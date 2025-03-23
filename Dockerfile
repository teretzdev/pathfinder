# Use Node.js LTS as the base image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the frontend
RUN npm run build:frontend

# Production image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --production

# Copy built frontend and backend code
COPY --from=build /app/dist ./dist
COPY --from=build /app/backend ./backend

# Create logs directory
RUN mkdir -p logs

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "backend/server.js"]