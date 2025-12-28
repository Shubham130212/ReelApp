const Food = require('../models/foodModel');
const New_User = require('../models/userModel');
const storageService = require('../services/storageService');
const { v4: uuid } = require('uuid');

const createFoodItem = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const email = req.email; // Get email from authenticated request

        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'Video file is required' });
        }

        const food_partner = await New_User.findOne({ email: email });

        if (!food_partner || food_partner.user_type !== 'food_partner') {
            return res.status(403).json({ error: 'Only food partners can create food items.' });
        }

        const fileUploadResult = await storageService.uploadImage(req.file.buffer, uuid());

        const newFoodItem = new Food({
            name,
            video: fileUploadResult.url, // Get URL from uploaded file
            description,
            price,
            food_partner: food_partner._id
        });
        await newFoodItem.save();
        res.status(201).json({ message: 'Food item created successfully', foodItem: newFoodItem });
    } catch (error) {
        console.error('Error in createFoodItem controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getFoodItems = async (req, res) => {
    try {
        let foodItems;
        const email = req.email; // Get email from authenticated request
        const user = await New_User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ error: 'Food partner not found' });
        }

        if (user.user_type === 'user') {
            foodItems = await Food.find();
        }
        else {
            foodItems = await Food.find({ food_partner: user._id }).populate('food_partner', 'name email');
        }
        res.status(200).json({ foodItems });
    } catch (error) {
        console.error('Error in getFoodItems controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createFoodItem, getFoodItems };