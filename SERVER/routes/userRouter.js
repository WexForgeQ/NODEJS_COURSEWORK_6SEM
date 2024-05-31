const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const ErrorHandlingMiddleware = require('../middleware/ErrorHandlingMiddleware')
const router = express.Router();

router.get('/userinfo', authMiddleware, userController.getUserInfo, ErrorHandlingMiddleware);
router.patch('/userinfo',authMiddleware, userController.updateUserInfo, ErrorHandlingMiddleware);
router.post('/driver', authMiddleware, userController.createDriverCar, ErrorHandlingMiddleware)
module.exports = router;
