const mongoose = require('mongoose')
const { Schema } = mongoose

const newUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        enum: ['user', 'food_partner'],
        default: 'user'
    }
}, { timestamps: true })

const New_User = mongoose.model('New_User', newUserSchema)
module.exports = New_User;