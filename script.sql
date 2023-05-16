CREATE DATABASE mirandahotel;
USE mirandahotel;
CREATE TABLE rooms (
    id varchar(120) NOT NULL,
    `number` int NOT NULL,
    photo varchar(2000) NOT NULL,
    `type` varchar(100) NOT NULL,
    amenities JSON,
    price int NOT NULL,
    offer int,
    `status` boolean NOT NULL,

    PRIMARY KEY(id)
)
ENGINE = InnoDB;

CREATE TABLE users (
    id varchar(120) NOT NULL,
    `name` varchar(120) NOT NULL,
    `password` varchar(200) NOT NULL,
    photo varchar(2000) NOT NULL,
    email varchar(100) NOT NULL,
    contact int,
    `description` varchar(120) NOT NULL,
    `status` boolean NOT NULL,

    PRIMARY KEY(id)
)
ENGINE = InnoDB;

CREATE TABLE contacts (
    id varchar(120) NOT NULL,
    customer JSON NOT NULL,
    `subject` varchar(2000) NOT NULL,
    comment varchar(100) NOT NULL,
    `status` boolean,

    PRIMARY KEY(id)
)
ENGINE = InnoDB;

CREATE TABLE bookings (
    id varchar(120) NOT NULL,
    photo varchar(2000) NOT NULL,
    guest varchar(120) NOT NULL,
    orderDate datetime NOT NULL,
    checkin datetime NOT NULL,
    checkout datetime NOT NULL,
    room_id varchar(120) NOT NULL,
    price int NOT NULL,
    amenities JSON NOT NULL,
    `description` varchar(120) NOT NULL,
    specialRequest varchar(220),
    `status` varchar(120) NOT NULL,

    PRIMARY KEY(id),
    FOREIGN KEY(room_id) REFERENCES rooms(id) ON DELETE CASCADE
)
ENGINE = InnoDB;