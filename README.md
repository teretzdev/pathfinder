# Pathfinder

Pathfinder is your ultimate tool for seamless navigation and synchronization.

## Table of Contents

- [Development Setup](#development-setup)
- [Production Build](#production-build)
- [Testing](#testing)
- [Deployment Options](#deployment-options)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Performance Monitoring](#performance-monitoring)
- [Logging](#logging)

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- PostgreSQL (v14 or higher)

### Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/pathfinder.git
   cd pathfinder
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up environment variables**:
   ```
   cp .env.development .env
   ```
   Edit the `.env` file to match your local configuration.

4. **Start the development server**:
   ```
   npm run start:dev
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

## Production Build

### Building for Production

1. **Create production environment file**:
   ```
   cp .env.production.template .env.production
   ```
   Edit the `.env.production` file with your production values.

2. **Build the application**:
   ```
   npm run build:all
   ```

3. **Run database migrations**:
   ```
   npm run db:migrate
   ```

4. **Start the production server**:
   ```
   npm run start:prod
   ```

### Analyzing the Bundle

To analyze the production bundle size:

```
npm run analyze
```

This will generate a visualization of the bundle size in `dist/stats.html`.

## Testing

### Unit and Integration Tests

Run all tests:
```
npm test
```

Run tests in watch mode:
```
npm run test:watch
```

Generate test coverage report:
```
npm run test:coverage
```

### End-to-End Tests

Run E2E tests in headless mode:
```
npm run test:e2e
```

Open Cypress test runner:
```
npm run test:e2e:open
```

## Deployment Options

### Docker Deployment

1. **Build and run with Docker**:
   ```
   docker build -t pathfinder .
   docker run -p 5000:5000 --env-file .env.production pathfinder
   ```

2. **Using Docker Compose (without SSL)**:
   ```
   npm run docker:build
   npm run docker:up
   ```

3. **Using Docker Compose with SSL**:
   ```
   # Edit the domains in scripts/init-letsencrypt.sh
   npm run ssl:init
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Kubernetes Deployment

1. **Set up secrets and config**:
   ```
   # Replace placeholders with actual values
   export BASE64_JWT_SECRET=$(echo -n "your-jwt-secret" | base64)
   export BASE64_DB_USER=$(echo -n "postgres" | base64)
   export BASE64_DB_PASSWORD=$(echo -n "your-password" | base64)
   
   # Apply config and secrets
   envsubst < k8s/secrets.yaml | kubectl apply -f -
   kubectl apply -f k8s/configmap.yaml
   ```

2. **Deploy database**:
   ```
   kubectl apply -f k8s/postgres.yaml
   ```

3. **Deploy application**:
   ```
   export DOCKER_REGISTRY="your-registry"
   export IMAGE_TAG="latest"
   
   envsubst < k8s/deployment.yaml | kubectl apply -f -
   kubectl apply -f k8s/service.yaml
   kubectl apply -f k8s/ingress.yaml
   ```

### CI/CD Deployment

The GitHub Actions workflow will automatically build, test, and deploy the application when changes are pushed to the main branch. You'll need to set up the following secrets in your GitHub repository:

- `DOCKER_HUB_USERNAME`: Your Docker Hub username
- `DOCKER_HUB_TOKEN`: Your Docker Hub access token

## Project Structure

```
pathfinder/
├── backend/             # Backend server code
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Server entry point
├── src/                 # Frontend React code
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── public/              # Static files
├── dist/                # Build output
├── logs/                # Application logs
├── cypress/             # E2E tests
├── k8s/                 # Kubernetes configuration
├── nginx/               # Nginx configuration
├── scripts/             # Utility scripts
├── db-migrations/       # Database migrations
├── db-init/             # Database initialization
├── .env.development     # Development environment variables
├── .env.production      # Production environment variables
├── vite.config.ts       # Vite configuration
└── package.json         # Project dependencies
```

## Technologies Used

### Frontend
- React 18
- TypeScript
- React Router v6
- Tailwind CSS
- Vite
- Jest & Testing Library
- Cypress

### Backend
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- Winston (logging)
- JWT Authentication

### DevOps
- Docker & Docker Compose
- Kubernetes
- Nginx
- Let's Encrypt SSL
- GitHub Actions

## Performance Monitoring

Pathfinder includes built-in performance monitoring that tracks:

- Page load metrics
- Route change performance
- Resource loading times
- Layout shifts
- Long tasks
- Memory usage

Performance data is logged and can be viewed in the DevTools page (in non-production environments).

## Logging

The application uses a comprehensive logging system:

- Structured logging with Winston on the backend
- Browser-compatible logging on the frontend
- Log levels (error, warn, info, http, debug, trace)
- Context-based logging
- Log storage and export functionality
- Log viewer in the DevTools page

Logs can be exported in JSON or CSV format for analysis.