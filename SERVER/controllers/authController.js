const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, UserProfile, GenerationKey} = require('../models/models')
const { access } = require('fs')
const ApiError = require('../error/ApiError')
const sequelize = require('../db')
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'alltransbatura@gmail.com', 
      pass: 'gpdfozzaxvohzqmi' 
    }
  });

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

const generateKey = () => {
  return Math.floor(Math.random() * (999999-111111) + 111111); 
}

class AuthController {
    async registration(req, res, next){
        try{
            const {email, username, password} = req.body
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует.'))
        }
        const hashPassword = await bcrypt.hash(password, 2)
        const user = await User.create({
            email: email,
            login: username,
            password: hashPassword,
            role: 2
            }
        )
        const key = await GenerationKey.create({
            userid: user.id,
            key: generateKey(),
        })
        let mailOptions;
          mailOptions = {
          from: 'alltransbatura@gmail.com',
          to: 'anavarich29@gmail.com',
          subject: 'Изменение статуса заказа',
          html: `<h1>Ваш код подтверждения:</h1><h2>${key.key}</h2>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
        });
        return res.status(200).json({userid: user.id})
        }
        catch(error){
            return next(ApiError.internal("Внутренняя ошибка"))
        }   
    }

    async emailverification(req, res, next){
        try{
            const {userid, code} = req.body
        const gen = await GenerationKey.findOne({
            where: {
                userid: userid
            }
        })
        if(!gen){
            return next(ApiError.badRequest('Пользователь(userid) не существует'))
        }
        if(gen.key != code){
            return next(ApiError.badRequest('Неверный код подтверждения'))
        }
        else
        {
            await GenerationKey.destroy({
                where: {
                    userid: userid,
                }
            })
            const user = await User.findOne({
                where: {
                    id: userid
                }
            })
            const tokens = generateJwt(user.email, user.role);
            await User.update({access_token: tokens.access_token, refresh_token: tokens.refresh_token},{
                where: {
                    id: userid
                }
            })
            await UserProfile.create({
                id: user.id,
                fio: "default",
                phone: "default",
                registration_date: sequelize.literal("CURRENT_TIMESTAMP")
            })
            return res.status(200).json({tokens, userid: user.id, role: user.role})
        }
        }
        catch(error){
            return next(ApiError.internal("Внутренняя ошибка"))
        }  
        

    }

    async login(req, res, next){
        try{
            const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest("Неверный пароль"))
        }
        const tokenData = generateJwt(email, 2);
        await User.update({access_token: tokenData.access_token, refresh_token: tokenData.refresh_token},{
            where: {
                id: user.id
            }
        })
        return res.status(200).json({tokenData, userid: user.id, role: user.role})
        }
        catch(error){
            return next(ApiError.internal("Внутренняя ошибка"))
        }  
        
    }

    async logout(req, res, next){
        try{
        const {access} = req.body;
        const user = await User.findOne({where:{access_token: access}})
        if(!user){
            return next(ApiError.Unauthorized("Не залогинен"))
        }
        else{
            await User.update({access_token: null, refresh_token: null},{
                where:{access_token: access}
            })
            res.status(200).json(access)
        }
    }
    catch(error){
        return next(ApiError.internal("Внутренняя ошибка"))
        }  
    }

    async getRole(req, res, next){
        const {access} = req.body;
        const user = await User.findOne({where:{access_token: access}})
        if(!user){
            return next(ApiError.badRequest("Пользователь не найден"))
        }
        else{
            res.status(200).json({role: user.role})
        }

    }

    
}
    

module.exports = new AuthController
