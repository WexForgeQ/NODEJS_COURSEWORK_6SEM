const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const ErrorHandlingMiddleware = require('../middleware/ErrorHandlingMiddleware')

router.post('/registration', authController.registration, ErrorHandlingMiddleware)
router.post('/login', authController.login, ErrorHandlingMiddleware)
router.post('/emailverif', authController.emailverification, ErrorHandlingMiddleware)
router.post('/logout', authMiddleware, authController.logout, ErrorHandlingMiddleware)
router.post('/role', authMiddleware, authController.getRole, ErrorHandlingMiddleware)
module.exports = router