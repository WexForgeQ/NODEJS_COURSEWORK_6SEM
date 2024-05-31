INSERT INTO Users (id, email, password, role, refresh_token, access_token)
VALUES
  (1, 'anavarich29@gmail.com', '123', 0, '123', '123'),
  (2, 'user1@gmail.com', '123', 2, '123', '123'),
  (3, 'user2@gmail.com', '123', 2, '123', '123'),
  (4, 'user3@gmail.com', '123', 2, '123', '123'),
  (5, 'driver1@gmail.com', '123', 1, '123', '123'),
  (6, 'driver2@gmail.com', '123', 1, '123', '123'),
  (7, 'driver3@gmail.com', '123', 1, '123', '123');


INSERT INTO UserProfiles (id, FIO, Phone, Registration_Date)
VALUES
  (1, 'Наварич Андрей Евгеньевич', '+123', CURRENT_TIMESTAMP),
  (2, 'Иванов Иван Иваннович', '+123', CURRENT_TIMESTAMP),
  (3, 'Петров Петр Петрович', '+123', CURRENT_TIMESTAMP),
  (4, 'Сергеев Сергей Сергеевич', '+123', CURRENT_TIMESTAMP),
  (5, 'Семенов Семён Семёнович', '+123', CURRENT_TIMESTAMP),
  (6, 'Павлов Павел Павлович', '+123', CURRENT_TIMESTAMP),
  (7, 'Андреев Андрей Андреевич', '+123', CURRENT_TIMESTAMP);

INSERT INTO Cars (number, capacity, type, driver_id)
VALUES
  ('А124ВС', 2000, 'Грузовик', 5),
  ('У997ХХ', 500, 'Седан', 6),
  ('A2905M', 400, 'Седан', 7);

INSERT INTO Cargos (id, weight, name, quantity, owner_id)
VALUES
  (1, 1000, 'Ящик 1', 2, 2),
  (2, 1000, 'Ящик 3', 3, 3),
  (3, 2000, 'Ящик 2', 2, 4),
  (4, 2000, 'Ящик 4', 1, 2),
  (5, 2000, 'Ящик 5', 4, 3),
  (6, 2000, 'Ящик 5', 10, 4);

INSERT INTO Orders (id, car_id, customer_id, order_date, departure_point, destination_point, order_status, price)
VALUES
  (1, 'А124ВС', 2, '2024-03-10', 'Точка отправления 1', 'Точка назначения 1', 'Выполнен', 200),
  (2, 'А124ВС', 2, '2024-03-22', 'Точка отправления 2', 'Точка назначения 2', 'Не выполнен', 300),
  (6, 'У997ХХ', 3, '2023-01-01', 'Точка отправления 6', 'Точка назначения 6', 'Выполнен', 50),
  (7, 'У997ХХ', 3, '2023-09-10', 'Точка отправления 7', 'Точка назначения 7', 'Не выполнен', 300),
  (11, 'A2905M', 4, '2024-05-01', 'Точка отправления 11', 'Точка назначения 11', 'Выполнен', 100),
  (12, 'A2905M', 4, '2024-04-01', 'Точка отправления 12', 'Точка назначения 12', 'Не выполнен', 150);

INSERT INTO OrderCargos (id, cargo_id, order_id)
VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 6),
(4, 4, 7),
(5, 5, 11),
(6, 6, 12);

drop table _cars;