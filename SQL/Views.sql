create view GetUserInfo as select
_User.id, FIO, email, phone, Registraton_Date from _User inner join _UserProfile on _User.id = _UserProfile.id

select * from GetUserInfo

create view GetAllUsers as select 
_User.id as UserID, FIO, email, role from _User inner join _UserProfile on _User.id = _UserProfile.id

select * from GetAllUsers

create view GetAllOrders as select
* from _Order inner join _Car on car_id = number 

select * from GetAllOrders