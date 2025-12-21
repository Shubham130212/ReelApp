const express = require('express');
const authenicateJwt = require('../middlewares/authentication.js');
const { uploadFile, handleMulterError } = require('../middlewares/multer.js');
const foodController = require('../controllers/foodController.js');
const router = express.Router();

router.post('/add-food', authenicateJwt, uploadFile, handleMulterError, foodController.createFoodItem);
router.get('/get-food-items', authenicateJwt, foodController.getFoodItems);

module.exports = router;