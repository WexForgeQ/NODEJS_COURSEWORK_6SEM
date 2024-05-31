CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email varchar(100),
    password varchar(30),
    role int,
    refresh_token varchar(200),
    access_token varchar(200)
);

CREATE TABLE UserProfiles (
    id int PRIMARY KEY REFERENCES Users(id),
    FIO varchar(100),
    Phone varchar(30),
    Registration_Date timestamp
);

CREATE TABLE Cars (
    number varchar(15) PRIMARY KEY,
    capacity int,
    type varchar(30),
    driver_id int REFERENCES Users(id)
);

CREATE TABLE Cargos (
    id SERIAL PRIMARY KEY,
    weight int,
    name varchar(100),
    quantity int,
    owner_id int REFERENCES Users(id)
);

CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    car_id varchar(15) REFERENCES Cars(number),
    customer_id int REFERENCES Users(id),
    order_date timestamp,
    departure_point varchar(30),
    destination_point varchar(30),
    order_status varchar(25),
    price int
);

CREATE TABLE OrderCargos (
    id SERIAL PRIMARY KEY,
    cargo_id int REFERENCES Cargos(id),
    order_id int REFERENCES Orders(id)
);

CREATE TABLE GenerationKeys (
    id SERIAL PRIMARY KEY,
    user_id int REFERENCES Users(id),
    key int
);