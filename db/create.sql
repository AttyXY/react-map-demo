CREATE DATABASE IF NOT EXISTS entities;
USE entities;

CREATE TABLE IF NOT EXISTS provider (
    name           VARCHAR(128) NOT NULL,
    latitude       DECIMAL(10, 8) NOT NULL,
    longitude      DECIMAL(11, 8) NOT NULL,
    last_updated   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    details        VARCHAR(256) NOT NULL,

    PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS user (
    email       VARCHAR(50) NOT NULL,
    latitude    DECIMAL(10, 8) NOT NULL,
    longitude   DECIMAL(11, 8) NOT NULL,

    PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS subscription (
    provider_name    VARCHAR(128) NOT NULL,
    user_email      VARCHAR(50) NOT NULL,

    PRIMARY KEY (provider_name, user_email),
    FOREIGN KEY (provider_name) REFERENCES provider(name),
    FOREIGN KEY (user_email) REFERENCES user(email)
);

INSERT INTO provider (name, latitude, longitude, details)
VALUES 	('provider1', 43.4610373, -80.5325973, 'CBT'),
		('provider2', 53.4610373, -90.5325973, 'DBT').
		('provider3', 53.4610373, -80.5325973, 'ACT'),
		('provider4', 43.4610373, -90.5325973, 'gestalt');

INSERT INTO user (email, latitude, longitude)
VALUES 	('jimmy@gmail.com', 43.4610373, -80.5325973),
		('jimbo@gmail.com', 43.4610373, -80.5325973),
		('johnny@gmail.com', 43.4610373, -80.5325973);

INSERT INTO subscription (provider_name, user_email)
VALUES 	('provider1', 'jimbo@gmail.com'),
		('provider2', 'jimbo@gmail.com');
