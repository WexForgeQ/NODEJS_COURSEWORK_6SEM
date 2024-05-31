const Router = require('express')
const router = new Router()
const ordersController  = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const ErrorHandlingMiddleware = require('../middleware/ErrorHandlingMiddleware')

router.post('/',authMiddleware, ordersController.GetOrders, ErrorHandlingMiddleware)
router.post('/add',authMiddleware, ordersController.addOrder, ErrorHandlingMiddleware)
router.get('/singleOrder',authMiddleware, ordersController.getSingleOrder, ErrorHandlingMiddleware)
router.post('/cars',authMiddleware, ordersController.getCars, ErrorHandlingMiddleware)
router.patch('/singleOrder',authMiddleware, ordersController.changeStatusOrder, ErrorHandlingMiddleware)

module.exports = router