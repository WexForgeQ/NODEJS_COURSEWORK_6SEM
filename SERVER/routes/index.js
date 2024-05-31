const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const authRouter = require('./authRouter')
const orderRouter = require("./ordersRouter")
const refresh = require("./refreshRouter")


router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/orders', orderRouter);
router.use('/', refresh);
module.exports = router;