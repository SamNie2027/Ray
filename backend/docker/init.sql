-- Init schema for Ray (minimal)
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

-- Seed a couple of orgs
INSERT INTO orgs (name, description, website, donation_url, cause, zip, city, state, country)
VALUES
('Helping Hands', 'Local community support', 'https://helping.example', 'https://donate.example/help', 'Community', '12345', 'Townsville', 'TS', 'USA'),
('Green Earth', 'Environmental NGO', 'https://green.example', 'https://donate.example/green', 'Environment', '67890', 'Greenville', 'GR', 'USA')
ON DUPLICATE KEY UPDATE name = VALUES(name);
