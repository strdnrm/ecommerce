BEGIN

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID not null PRIMARY KEY,
    name VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255) not null UNIQUE,
    phone_number VARCHAR(20),
    password_hash VARCHAR(128) not null
);

CREATE TABLE employee (
    id UUID not null PRIMARY KEY,
    name VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255) not null UNIQUE,
    phone_number VARCHAR(20),
    password_hash VARCHAR(128) not null,
    role VARCHAR(30)
);

CREATE TABLE orders (
    id UUID not null PRIMARY KEY,
    date TIMESTAMP,
    status VARCHAR(30),
    totalprice int,
    id_user UUID references users(id)
);

CREATE TABLE product (
    id UUID not null PRIMARY KEY,
    image bytea,
    name VARCHAR(255),
    description TEXT,
    price float,
    quantity int, 
    category VARCHAR(255)
);

CREATE TABLE order_detail (
    id_order UUID references orders(id),
    id_product UUID references product(id)
);

CREATE TABLE support (
    id_user UUID REFERENCES users(id),
    id_employee UUID REFERENCES employee(id),
    request_date TIMESTAMP,
    theme VARCHAR(256),
    request_text TEXT,
    status VARCHAR(128)
);

END;