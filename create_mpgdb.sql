-- Remove any existing database and user.
DROP DATABASE IF EXISTS mpg;
DROP USER IF EXISTS mpg_user@localhost;

-- Create mpg database and user. Ensure Unicode is fully supported.
CREATE DATABASE mpg CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER mpg_user@localhost IDENTIFIED WITH mysql_native_password BY 'mpg';
GRANT ALL PRIVILEGES ON mpg.* TO mpg_user@localhost;