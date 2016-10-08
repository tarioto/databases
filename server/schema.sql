CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  text VARCHAR(150) NULL DEFAULT NULL,
  user_id INTEGER NULL DEFAULT NULL,
  room_id INTEGER NULL DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

/* Create other tables and define schemas for them here! */

CREATE TABLE rooms (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  name VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  name VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE messages ADD FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE messages ADD FOREIGN KEY (room_id) REFERENCES rooms (id);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
