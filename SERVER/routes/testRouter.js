const express = require('express');
const testController = require('../controllers/testController');
const router = express.Router();
const ErrorHandlingMiddleware = require('../middleware/ErrorHandlingMiddleware')

router.get('/', testController.getUsers);

module.exports = router;
