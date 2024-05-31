create table _User(
	id int primary key,
	email varchar(100),
	password varchar(30),
	role int,
	refresh_token varchar(200),
	acess_token varchar(200)
)
create table _UserProfile(
	id int primary key foreign key references _User(id),
	FIO varchar(100),
	Phone varchar(30),
	Registraton_Date date
)

create table _Car(
	number varchar(15) primary key,
	capacity int,
	type varchar(30),
	driver_id int foreign key references _User(id),
)

create table _Cargo(
	id int primary key,
	weight int,
	name varchar(100),
	quantity int,
	owner_id int foreign key references _User(id)
)

create table _Order(
	id int primary key,
	car_id varchar(15) foreign key references _Car(number),
	customer_id int foreign key references _User(id),
	order_date date,
	departure_point varchar(30),
	destination_point varchar(30),
	order_status varchar(25),
	price int
)

create table _OrderCargo(
id int primary key,
Cargo_id int foreign key references _Cargo(id),
Order_id int foreign key references _Order(id)
)

drop table _Order;