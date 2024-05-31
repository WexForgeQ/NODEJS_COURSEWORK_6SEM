const { DATE } = require('sequelize');
const { User, UserProfile, Orders, Car} = require('../models/models');
const bcrypt = require('bcrypt');
const ApiError = require('../error/ApiError');
class UserController{

    async getUserInfo(req, res, next) {
        const userId = req.get('USERID');
        try {
          const userinfo = await User.findOne({
            where: { id: userId },
            include: UserProfile,
            attributes: {
              exclude: ['role','refresh_token', 'access_token', 'password', 'id']
            },
          });
          if(!userinfo){
            return next(ApiError.badRequest("Ошибка получения профиля"))
          }
          const count = await Orders.count({
            where: {
              customer_id: userId
            }
          })
          return res.status(200).json({userinfo});
        } catch (error) {
          return next(ApiError.internal("Внутренняя ошибка"))
        }
    }
    async updateUserInfo(req, res, next){
      const userId = req.get('USERID');
      const {fio, login, phone} = req.body
      try {
      const usertest = await User.findOne({
          where: { id: userId },
          include: UserProfile,
          attributes: {
            exclude: ['role','refresh_token', 'access_token', 'password', 'id']
          },
        });
      if(!usertest){
          return next(ApiError.badRequest("Ошибка получения профиля"))
        }
      await User.update({login: login},
          {where: {id: userId}}
        ) 
        await UserProfile.update({phone: phone, fio: fio},
          {where: {id: userId}}
        )
        const userinfo = await User.findOne({
          where: { id: userId },
          include: UserProfile,
          attributes: {
            exclude: ['role','refresh_token', 'access_token', 'password', 'id']
          },
        });
        return res.status(200).json({userinfo});
      } catch (error) {
        return next(ApiError.internal("Внутренняя ошибка"))
      }
    }
    async createDriverCar(req, res, next) {
      try {
        const { email, login, password, car_number, weight, type } = req.body;
        const hashPassword = await bcrypt.hash(password, 2);
    
        // Проверяем, существует ли водитель с таким email
        const driverT = await User.findOne({ where: { email: email } });
        if (driverT) {
          return next(ApiError.badRequest('Водитель с таким email уже существует.'));
        }
        // Проверяем, существует ли машина с таким номером
        const carT = await Car.findOne({ where: { number: car_number } });
        if (carT) {
          return next(ApiError.badRequest('Машина с таким номером уже существует.'));
        }
    
        // Создаем водителя
        const driver = await User.create({
          login: login,
          email: email,
          password: hashPassword,
          role: 1,
        });
    
        // Создаем профиль водителя
        const dt = new Date(Date.now());
        const formattedDate = dt.toISOString();
        await UserProfile.create({
          id: driver.id,
          fio: "default",
          phone: "default",
          registration_date: formattedDate,
        });
    
        // Создаем машину
        const car = await Car.create({
          number: car_number,
          capacity: weight,
          type: type,
          driver_id: driver.id,
        });
    
        res.status(200).json(123);
      } catch (e) {
        // Если возникла ошибка, удаляем водителя и его профиль
        await User.destroy({ where: { id: driver.id } });
        await UserProfile.destroy({ where: { id: driver.id } });
        return next(ApiError.badRequest("Внутренняя ошибка"));
      }
    }
}

module.exports = new UserController();
