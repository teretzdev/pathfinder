import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection parameters
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
} = process.env;

// Initialize Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: console.log,
});

async function runMigrations() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Get all migration files
    const migrationsDir = path.join(__dirname, '..', 'db-migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.js'))
      .sort();
    
    // Create migrations table if it doesn't exist
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
    
    // Get executed migrations
    const [executedMigrations] = await sequelize.query(
      'SELECT name FROM migrations ORDER BY id ASC'
    );
    const executedMigrationNames = executedMigrations.map(m => m.name);
    
    // Run pending migrations
    for (const file of migrationFiles) {
      if (!executedMigrationNames.includes(file)) {
        console.log(`Running migration: ${file}`);
        
        // Import migration file
        const migrationPath = path.join(migrationsDir, file);
        const migration = await import(migrationPath);
        
        // Run migration in a transaction
        const transaction = await sequelize.transaction();
        try {
          await migration.up(sequelize.queryInterface, Sequelize);
          await sequelize.query(
            'INSERT INTO migrations (name) VALUES (:name)',
            {
              replacements: { name: file },
              transaction
            }
          );
          await transaction.commit();
          console.log(`Migration ${file} executed successfully.`);
        } catch (error) {
          await transaction.rollback();
          console.error(`Error executing migration ${file}:`, error);
          process.exit(1);
        }
      }
    }
    
    console.log('All migrations have been executed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

runMigrations();