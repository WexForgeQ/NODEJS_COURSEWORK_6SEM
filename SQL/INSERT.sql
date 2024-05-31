insert into _User
values
(1, 'anavarich29@gmail.com', '123', 0, '123', '123'),
(2, 'user1@gmail.com', '123', 2, '123', '123'),
(3, 'user2@gmail.com', '123', 2, '123', '123'),
(4, 'user3@gmail.com', '123', 2, '123', '123'),
(5, 'driver1@gmail.com', '123', 1, '123', '123'),
(6, 'driver2@gmail.com', '123', 1, '123', '123'),
(7, 'driver3@gmail.com', '123', 1, '123', '123')

select * from _User

insert into _UserProfile
values
(1, '������� ������ ����������', '+123', SYSDATETIME()),
(2, '������ ���� ���������', '+123', SYSDATETIME()),
(3, '������ ���� ��������', '+123', SYSDATETIME()),
(4, '������� ������ ���������', '+123', SYSDATETIME()),
(5, '������� ���� ��������', '+123', SYSDATETIME()),
(6, '������ ����� ��������', '+123', SYSDATETIME()),
(7, '������� ������ ���������', '+123', SYSDATETIME())

select * from _UserProfile inner join _User on _UserProfile.id = _User.id;

INSERT INTO _CAR
VALUES
  ('�124��', 2000, '��������', 5),
  ('�997��', 500, '�����', 6),
  ('A2905M', 400, '�����', 7)

select * from _Car inner join _UserProfile on driver_id = id


INSERT INTO _Cargo
VALUES
  (1, 1000, '���� 1', 2 , 2),
  (2, 1000, '���� 3', 3, 3),
  (3, 2000, '���� 2', 2, 4),
  (4, 2000, '���� 4', 1, 2),
  (5, 2000, '���� 5', 4, 3),
  (6, 2000, '���� 5',10, 4)

select * from _Cargo inner join _UserProfile on owner_id = _UserProfile.id

INSERT INTO _Order
VALUES
    (1, '�124��', 2, '2024-03-10', '����� ����������� 1', '����� ���������� 1', '��������', 200),
    (2, '�124��', 2, '2024-03-22', '����� ����������� 2', '����� ���������� 2', '�� ��������', 300),
    (6, '�997��', 3, '2023-01-01', '����� ����������� 6', '����� ���������� 6',  '��������', 50),
    (7, '�997��', 3, '2023-09-10', '����� ����������� 7', '����� ���������� 7', '�� ��������', 300),
    (11, 'A2905M', 4,'2024-05-01', '����� ����������� 11', '����� ���������� 11', '��������', 100),
    (12, 'A2905M', 4,'2024-04-01', '����� ����������� 12', '����� ���������� 12', '�� ��������', 150)


delete from _Order

INSERT INTO _OrderCargo
VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 6),
(4, 4, 7),
(5, 5, 11),
(6, 6, 12)