-- SQL script to create the users table for local MySQL
-- Run: mysql -u root -p raydb < backend/create_tables.sql

CREATE DATABASE IF NOT EXISTS raydb;
USE raydb;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(100),
  -- store a password hash (bcrypt/argon2) in real usage; for local testing this can be plain text
  password_hash VARCHAR(255) NOT NULL,
  giving_location_pref VARCHAR(50),
  daily_streak INT DEFAULT 0,
  orgs_given_before JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample user for quick testing (password_hash is 'password123')
INSERT INTO users (name, email, username, password_hash, giving_location_pref)
VALUES ('Test User', 'test@example.com', 'testuser', 'password123', 'online')
ON DUPLICATE KEY UPDATE email = email;
