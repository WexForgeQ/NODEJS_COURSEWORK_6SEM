const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, UserProfile, GenerationKey} = require('../models/models')
const { access } = require('fs')
const ApiError = require('../error/ApiError')
const sequelize = require('../db')
const nodemailer = require('nodemailer');
const { DATE } = require('sequelize')


const generateJwt = (email, role) => {
    const access_token = jwt.sign(
        {email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: 10}
    )
    const refresh_token = jwt.sign(
        {email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
    const data = {access_token, refresh_token}
    return data;
}

class RefreshController {
    async refreshCheck(req, res, next) {
    try {
        if(!req.headers.authorization) {
            return next(ApiError.badRequest('Пользователь (userid) не существует'));
        }
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return next(ApiError.badRequest('Пользователь (userid) не существует'));
        }
        const tk = jwt.decode(token, process.env.SECRET_KEY);
        const user = await User.findOne({
          where: { email: tk.email }
        });
        if (!user) {
          res.status(400).json({ message: 'Нет пользователя' });
        }
        const data = generateJwt(user.email, user.role);
        const rt = jwt.verify(user.refresh_token, process.env.SECRET_KEY);
        await User.update({ access_token: data.access_token }, {
          where: {
            access_token: token
          }
        });
        res.status(200).json(data.access_token);
      } 
      catch (e) {
        res.status(400).json();
      }
    }
  }

module.exports = new RefreshController