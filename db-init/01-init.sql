-- Create tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  "dateOfBirth" DATE NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Diary entries table
CREATE TABLE IF NOT EXISTS diary_entries (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Connections table
CREATE TABLE IF NOT EXISTS connections (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "connectedUserId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "sharedPatterns" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE("userId", "connectedUserId")
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_diary_entries_user_id ON diary_entries("userId");
CREATE INDEX IF NOT EXISTS idx_diary_entries_date ON diary_entries(date);
CREATE INDEX IF NOT EXISTS idx_connections_user_id ON connections("userId");
CREATE INDEX IF NOT EXISTS idx_connections_connected_user_id ON connections("connectedUserId");

-- Create functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW."updatedAt" = NOW();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create triggers
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_diary_entries_updated_at
BEFORE UPDATE ON diary_entries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_connections_updated_at
BEFORE UPDATE ON connections
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();