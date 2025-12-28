const express = require('express');
const authController = require('../controllers/authController.js');
const validateData = require('../middlewares/validation.js');
const authenicateJwt = require('../middlewares/authentication.js');
const { uploadFile, handleMulterError } = require('../middlewares/multer.js');

const router = express.Router();

router.post('/signup', validateData, authController.signup);
router.post('/login', authController.login);
router.put('/upadetProfile',authenicateJwt, uploadFile, handleMulterError, authController.updateProfile);
router.get('/myProfile',authenicateJwt,authController.getMyProfile);
router.post('/logout',authenicateJwt, authController.logout);
module.exports = router;
