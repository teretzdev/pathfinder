# Pathfinder

Pathfinder is your ultimate tool for seamless navigation and synchronization.

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

3. **Start the production server**:
   ```
   npm run start:prod
   ```

### Docker Deployment

1. **Build and run with Docker**:
   ```
   docker build -t pathfinder .
   docker run -p 5000:5000 --env-file .env.production pathfinder
   ```

2. **Using Docker Compose**:
   ```
   docker-compose up -d
   ```

## Features

- **Dashboard**: View your biorhythms, human design insights, and daily transits
- **Diary**: Log and track synchronicities in your life
- **Dark Theme**: Enjoy a sleek, dark-themed interface
- **Comprehensive Logging**: Advanced logging system for debugging and monitoring

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
├── .env.development     # Development environment variables
├── .env.production      # Production environment variables
├── vite.config.ts       # Vite configuration
└── package.json         # Project dependencies
```

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, Sequelize ORM
- **Database**: PostgreSQL
- **Logging**: Winston
- **Authentication**: JWT