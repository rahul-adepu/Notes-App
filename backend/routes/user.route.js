const express = require('express');
const User = require('../models/user.model');
const validatePassword = require('../middlewares/password.middleware')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();


const userRouter = express.Router();


userRouter.post('/register', validatePassword, async (req, res) => {
    const { name, email, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) return res.send("Error occured while hashing password");
            const creatingNewUser = new User({ name, email, password: hash })
            await creatingNewUser.save();
        });
        return res.json({ msg: "User Registered Successfully", userDetails: req.body })
    } catch (error) {
        console.log(error)
        res.json({ error: error.message })
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const findingUser = await User.findOne({ email });
        if (findingUser) {
            bcrypt.compare(password, findingUser.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ userID: findingUser._id, name: findingUser.name }, process.env.JWT_SECRET);
                    res.json({ msg: "Login Successfull", token, user: findingUser.name })
                } else {
                    res.json({ msg: "Wrong Credentials" })
                }
            });
        }
        else {
            res.json({ msg: "User Not Found" })
        }
    } catch (error) {
        res.json({ msg: error.message })
    }
})

module.exports = userRouter;