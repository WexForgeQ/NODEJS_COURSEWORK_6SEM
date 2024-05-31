const {Orders, User, Car, UserProfile, Cargo, OrderCargo} = require('../models/models')
const { access } = require('fs')
const ApiError = require('../error/ApiError')
const sequelize = require('../db')
const nodemailer = require('nodemailer');
const { Op, where } = require('sequelize');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'alltransbatura@gmail.com', 
    pass: 'gpdfozzaxvohzqmi' 
  }
});

class OrdersController {
  async GetOrders(req, res, next) {
    try {
      const pageSize = 5;
      const userId = req.get('USERID');
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'));
      }
  
      const { page, activeFilter } = req.body;
      let whereCondition = {};
  
      if (user.role === 0) {
        if (activeFilter.id !== 1) {
          whereCondition.order_status = activeFilter.text;
        }
      } else if (user.role === 1) {
        const car = await Car.findOne({ where: { driver_id: userId } });
        if (!car) {
          return next(ApiError.badRequest('Не найдена машина'));
        }
        if (activeFilter.id !== 1) {
          whereCondition.order_status = activeFilter.text;
        }
        whereCondition.car_id = car.number;
      } else {
        if (activeFilter.id !== 1) {
          whereCondition.order_status = activeFilter.text;
        }
        whereCondition.customer_id = userId;
      }
  
      const totalCount = await Orders.count({ where: whereCondition });
  
      if (totalCount === 0) {
        const maxPage = 1;
        res.status(200).json({
          orders: [],
          maxPage
        });
      } else {
        const maxPage = Math.ceil(totalCount / pageSize);
        let currentPage = parseInt(page, 10) || 1;
        currentPage = currentPage > maxPage ? maxPage : currentPage;
        const offset = (currentPage - 1) * pageSize;
  
        const orders = await Orders.findAll({
          where: whereCondition,
          attributes: {
            exclude: ['customer_id']
          },
          limit: pageSize,
          offset: offset
        });
  
        res.status(200).json({
          orders,
          maxPage
        });
      }
    } catch (error) {
      return next(ApiError.internal("Внутренняя ошибка"));
    }
  }


    async getSingleOrder(req,res,next){
      try{
        const orderID = req.get('ID');

        const order = await Orders.findOne({
            where: {id: orderID},
        })
        const car = await Car.findOne({
            where: {number: order.car_id},
            attributes: {
                exclude: ['id', 'capacity', 'registration_date']
            }
        })
        const customer = await UserProfile.findOne({
            where: {id: order.customer_id},
            attributes: {
                exclude: ['id', 'registration_date']
            }
        })
        const driver = await UserProfile.findOne({
            where: {id: car.driver_id},
            attributes: {
                exclude: ['id', 'registration_date']
            }
        })
        const cargos = await Cargo.findAll({
            include: {
              model: OrderCargo,
              where: { order_id: orderID },
              attributes: []
            },
            attributes: ['weight', 'name', 'quantity']
          });
        res.status(200).json({
            order,
            car,
            driver,
            cargos,
            customer
          });
        }
        catch(error){
          return next(ApiError.internal("Внутренняя ошибка"))
        }
    }
    async changeStatusOrder(req, res, next){
        try{
        const orderID = req.get('ID');
        const {status} = req.body
        const order = await Orders.update({order_status: status},{
            where: {id: orderID},
        })
        let mailOptions;
        mailOptions = {
        from: 'alltransbatura@gmail.com',
        to: 'anavarich29@gmail.com',
        subject: 'Изменение статуса заказа',
        html: `<h1>Добрый день, статус заказа №!${orderID} изменён:${status}</h1><h2>BOXER</h2>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
        });
        mailOptions = {
        from: 'alltransbatura@gmail.com',
        to: 'anavarich29@gmail.com',
        subject: 'Изменение статуса заказа',
        html: `<h1>Добрый день, статус заказа №!${orderID} изменён:${status}</h1><h2>BOXER</h2>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
        });
        res.status(200).json(123);}
        catch(error){
          return next(ApiError.internal("Внутренняя ошибка"))
        }
    }

    async addOrder(req, res, next){
      try {
      const {destination_point, departure_point, car_id, price, order_date, cargo} = req.body
      const userId = req.get('USERID');
      const existingOrder = await Orders.findOne({
        where: {
          car_id: car_id,
          order_date: order_date,
          order_status: 'Ожидает подтверждения'
        }
      });
  
      if (existingOrder) {
        return next(ApiError.badRequest("Заказ на эту машину на эту дату уже существует"));
      }
      const order = await Orders.create({
        car_id: car_id,
        customer_id: userId,
        order_date: order_date,
        departure_point: departure_point,
        destination_point: destination_point,
        order_status: "Ожидает подтверждения",
        price: price
      })
      if(!order){
        return next(ApiError.badRequest("Ошибка добавления заказа"))
      }
      cargo.forEach(async (cargoItem) => {
        const { name, weight, quantity } = cargoItem;
        const cargo = await Cargo.create({
          name: name,
          weight: weight,
          quantity: quantity,
          owner_id: userId
        })
        const oc = await OrderCargo.create({
          cargo_id: cargo.id,
          order_id: order.id
        })
      })
      res.status(200).json(123)
    }catch(e){
      return next(ApiError.internal("Внутренняя ошибка"))
    }
    }
    async getCars(req, res, next){
    try{
      const {date} = req.body
      const cars = await Car.findAll({
        include: {
          model: Orders,
          where: {
            order_date: date
          },
          required: false
        },
        where: {
          '$orders.id$': null
        },
        attributes: {
          exclude: ['driver_id']
        }
      });
      res.status(200).json({cars})
    }catch(error){
      return next(ApiError.internal("Внутренняя ошибка"))
    }
    }
  }

module.exports = new OrdersController