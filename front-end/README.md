# My Capstone Project

This is my capstone project for the database management step.

## API Link
[Book Api](https://example-data.draftbit.com/books?_limit=240)

## Schema Design File

-- users table
CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);
