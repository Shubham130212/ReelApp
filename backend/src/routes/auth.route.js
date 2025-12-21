const express = require('express');
const authController = require('../controllers/authController.js');
const validateData = require('../middlewares/validation.js');
const authenicateJwt = require('../middlewares/authentication.js');

const router = express.Router();

router.post('/signup', validateData, authController.signup);
router.post('/login', authController.login);
router.post('/logout',authenicateJwt, authController.logout);
module.exports = router;
