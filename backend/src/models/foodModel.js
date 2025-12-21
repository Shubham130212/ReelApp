const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    food_partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'New_User',
        required: true
    }
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;