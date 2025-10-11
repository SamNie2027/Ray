-- Migrations / initial schema for Ray
-- This file is used by backend/scripts/runMigrations.cjs when running `npm run migrate`

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  giving_location_pref VARCHAR(50),
  daily_streak INT DEFAULT 0,
  orgs_given_before JSON DEFAULT JSON_ARRAY(),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orgs (
  org_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  website VARCHAR(255),
  donation_url VARCHAR(255),
  cause VARCHAR(255),
  zip VARCHAR(20),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100)
);

-- seed
INSERT INTO orgs (name, description, website, donation_url, cause, zip, city, state, country)
VALUES
('Helping Hands', 'Local community support', 'https://helping.example', 'https://donate.example/help', 'Community', '12345', 'Townsville', 'TS', 'USA'),
('Green Earth', 'Environmental NGO', 'https://green.example', 'https://donate.example/green', 'Environment', '67890', 'Greenville', 'GR', 'USA')
ON DUPLICATE KEY UPDATE name = VALUES(name);
-- SQL script to create the users table for local MySQL
-- Run: mysql -u root -p raydb < backend/create_tables.sql

CREATE DATABASE IF NOT EXISTS raydb;
USE raydb;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(100),
  -- store password (for local testing this may be plain text). In production use a hashed password.
  password VARCHAR(255) DEFAULT NULL,
  giving_location_pref VARCHAR(50),
  daily_streak INT DEFAULT 0,
  orgs_given_before JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample user for quick testing (password_hash is 'password123')
-- If an older schema used `password_hash`, add the `password` column if missing, migrate data, and drop the old column.
SET @has_col = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'users' AND column_name = 'password');
SET @sql = IF(@has_col = 0, 'ALTER TABLE users ADD COLUMN password VARCHAR(255) DEFAULT NULL', 'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- If password_hash exists, copy it into password where password is empty
SET @has_old = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'users' AND column_name = 'password_hash');
SET @sql = IF(@has_old > 0, 'UPDATE users SET password = password_hash WHERE (password IS NULL OR password = "")', 'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Drop the old column if it exists
SET @sql = IF(@has_old > 0, 'ALTER TABLE users DROP COLUMN password_hash', 'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

INSERT INTO users (name, email, username, password, giving_location_pref)
VALUES ('Test User', 'test@example.com', 'testuser', 'password123', 'online')
ON DUPLICATE KEY UPDATE email = email;

-- Orgs table to match org DTO (uses org_id)
CREATE TABLE IF NOT EXISTS orgs (
  org_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  website VARCHAR(255),
  donation_url VARCHAR(255),
  cause VARCHAR(100),
  zip VARCHAR(20),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- sample org
INSERT INTO orgs (name, description, website, donation_url, cause, zip, city, state, country)
VALUES ('Org 1', 'Sample org', 'https://org1.example', 'https://donate.org1', 'health', '02139', 'Cambridge', 'MA', 'USA')
ON DUPLICATE KEY UPDATE name = name;

-- Additional seed orgs
INSERT INTO orgs (name, description, website, donation_url, cause, zip, city, state, country)
VALUES
('Helping Hands', 'Provides community support and shelter', 'https://helpinghands.example', 'https://donate.helpinghands', 'community', '10001', 'New York', 'NY', 'USA'),
('GreenEarth', 'Environmental conservation initiatives', 'https://greenearth.example', 'https://donate.greenearth', 'environment', '94105', 'San Francisco', 'CA', 'USA'),
('Education Now', 'Supports education for underprivileged children', 'https://educationnow.example', 'https://donate.educationnow', 'education', '60601', 'Chicago', 'IL', 'USA')
ON DUPLICATE KEY UPDATE name = name;
