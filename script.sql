CREATE DATABASE mirandahotel;
USE mirandahotel;
CREATE TABLE rooms (
    room_id varchar(120) NOT NULL,
    room_number int NOT NULL,
    room_photo varchar(2000) NOT NULL,
    room_type varchar(100) NOT NULL,
    room_amenities JSON,
    room_price int NOT NULL,
    room_offer int,
    room_status boolean NOT NULL,

    PRIMARY KEY(room_id)
)
ENGINE = InnoDB;

CREATE TABLE users (
    user_id varchar(120) NOT NULL,
    user_name varchar(120) NOT NULL,
    user_password varchar(200) NOT NULL,
    user_photo varchar(2000) NOT NULL,
    user_email varchar(100) NOT NULL,
    user_contact int,
    user_description varchar(120) NOT NULL,
    user_status boolean NOT NULL,

    PRIMARY KEY(user_id)
)
ENGINE = InnoDB;

CREATE TABLE contacts (
    contact_id varchar(120) NOT NULL,
    contact_customer JSON NOT NULL,
    contact_subject varchar(2000) NOT NULL,
    contact_comment varchar(100) NOT NULL,
    contact_status boolean,

    PRIMARY KEY(contact_id)
)
ENGINE = InnoDB;

CREATE TABLE bookings (
    booking_id varchar(120) NOT NULL,
    booking_photo varchar(2000) NOT NULL,
    booking_guest varchar(120) NOT NULL,
    booking_orderDate varchar(100) NOT NULL,
    booking_checkin varchar(100) NOT NULL,
    booking_checkout varchar(100) NOT NULL,
    room_id varchar(120) NOT NULL,
    booking_price int NOT NULL,
    booking_amenities JSON NOT NULL,
    booking_description varchar(120) NOT NULL,
    booking_specialRequest varchar(220),
    booking_status varchar(120) NOT NULL,

    PRIMARY KEY(booking_id),
    FOREIGN KEY(room_id) REFERENCES rooms(room_id)
)
ENGINE = InnoDB;