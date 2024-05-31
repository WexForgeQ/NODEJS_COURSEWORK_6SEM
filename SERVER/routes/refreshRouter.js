const Router = require('express')
const router = new Router()
const refreshController = require('../controllers/refreshController')
const { model } = require('../db')

router.get("/refresh", refreshController.refreshCheck)

module.exports = router
