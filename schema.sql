-- Create the devices table
CREATE TABLE devices (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  current_schedule_id UUID,
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (current_schedule_id) REFERENCES schedules(id)
);

-- Create the schedules table
CREATE TABLE schedules (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  layout JSONB NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL
);

-- Create the media_items table
CREATE TABLE media_items (
  id UUID PRIMARY KEY,
  type VARCHAR(50) CHECK(type IN ('image', 'video')),
  src VARCHAR(255) NOT NULL,
  duration INT NOT NULL
);

-- Create the users table (for admin purposes)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) CHECK(role IN ('admin', 'viewer')) NOT NULL
);
