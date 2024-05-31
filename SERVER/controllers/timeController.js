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

class TimeController{
    async Notification(){
      try{

      
        const today = new Date();
        const fiveDaysAhead = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000); // Дата, отстоящая на 5 дней вперед
        const oneDayAhead = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000); // Дата, отстоящая на 1 день вперед
        oneDayAhead.setHours(0, 0, 0, 0);
        console.log(oneDayAhead)
        const orders = await Orders.findAll({
            where: {
              order_status: 'Забронирован',
              order_date: {
                [Op.gte]: oneDayAhead, // Больше или равно значению oneDayAhead
                [Op.lt]: new Date(oneDayAhead.getTime() + 24 * 60 * 60 * 1000) // Меньше значения oneDayAhead + 1 день
              }
            },
            include: [User]
    });
    orders.forEach(async (order) => {
        let mailOptions;
        mailOptions = {
        from: 'alltransbatura@gmail.com',
        to: 'anavarich29@gmail.com',
        subject: 'Напоминание о заказе',
        html: `<h1>Напоминаем о заказе:</h1><h2>${order.id}</h2><h2>Дата заказа: ${order.order_date}</h2>`
      };
      transporter.sendMail(mailOptions, (error, info) => {
      });
      });
    }catch(error){
      console.log("ВНУТРЕННЯЯ ОШИБКА: " + error.message)
    }
    }
}
module.exports = new TimeController