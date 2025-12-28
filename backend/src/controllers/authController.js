const New_User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const storageService = require('../services/storageService');
const { v4: uuid } = require('uuid');

// Signup Controller
const signup = async (req, res) => {
    try {
        const { email, name, password, user_type } = req.body;
        const existUser = await New_User.findOne({ email: email })
        if (existUser) {
            return res.status(400).json({ error: "Email is already registered" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new New_User({ email, name, password: hashedPassword, user_type })
        await newUser.save()

        const token = jwt.sign({ email: newUser.email }, process.env.SECRET_KEY, {
            expiresIn: '7d'
        })
        newUser.password = undefined // Hide password in response
        res.cookie("token", token)
        res.status(201).json({
            MESSAGE: 'User is registered', user: {
                _id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                user_type: newUser.user_type,
            }
        })
    }
    catch (error) {
        console.error('Error in signup controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await New_User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" })
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
            expiresIn: '7d'
        })
        res.cookie("token", token)

        res.status(200).json({
            MESSAGE: 'User is logged in', user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                token: token,
                user_type: user.user_type
            }
        })
    }
    catch (error) {
        console.error('Error in login controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getMyProfile = async (req, res) => {
    try {
        const email = req.email;
        if (!email) {
            return res.status(401).json({ error: "User not found" });
        }

        const user = await New_User.findOne({ email }).select('-password');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ MESSAGE: 'Profile fetched', user });
    } catch (error) {
        console.error('Error in getMyProfile controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { company_name, address, mobile } = req.body || {};

        const email = req.email;
        if (!email) {
            return res.status(401).json({ error: "User not found" })
        }

        const user = await New_User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const update = {};
        if (user.user_type === 'user') {
            if (mobile !== undefined) update.mobile = mobile;
            if (req.file) {
                const fileUploadResult = await storageService.uploadImage(req.file.buffer, uuid());
                update.image = fileUploadResult.url;
            }
        } else if (user.user_type === 'food_partner') {
            if (company_name !== undefined) update.company_name = company_name;
            if (address !== undefined) update.address = address;
            if (mobile !== undefined) update.mobile = mobile;
            if (req.file) {
                const fileUploadResult = await storageService.uploadImage(req.file.buffer, uuid());
                update.image = fileUploadResult.url;
            }
        } else {
            return res.status(400).json({ error: 'Invalid user type' });
        }

        if (Object.keys(update).length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }

        await New_User.findByIdAndUpdate(user._id, { $set: update }, { new: true }).select('-password');

        res.status(200).json({ MESSAGE: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error in profile controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ MESSAGE: "User logged out successfully" });
}

module.exports = { signup, login, logout, updateProfile, getMyProfile };