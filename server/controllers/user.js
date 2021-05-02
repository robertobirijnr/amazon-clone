const User = require('../models/user')
const jwt = require('jsonwebtoken')


exports.signUp = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            message: "Please enter email or password"
        })
    } else {
        try {
            let user = new User();
            let {
                name,
                email,
                password
            } = req.body;
            user.name = name;
            user.email = email;
            user.password = password;

            await user.save()
            let token = jwt.sign(user.toJSON(), process.env.JWT_SECRETE, {
                expiresIn: process.env.JWT_Token_EXPIRES_IN
            })
            res.json({
                success: true,
                message: "User registered successfully",
                token: token,
                user

            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}

exports.signIn = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            res.status(403).json({
                success: false,
                message: "Authentication failed, User not found"
            })
        } else {
            if (user.comparePassword(req.body.password)) {
                let token = jwt.sign(user.toJSON(), process.env.JWT_SECRETE, {
                    expiresIn: '365d'
                })

                res.json({
                    success: true,
                    token
                })
            } else {
                res.status(403).json({
                    success: false,
                    message: "Authentication failed, wrong password"
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.userProfile = async (req, res) => {
    try {
        let userinfo = await User.findOne({
            _id: req.decoded._id
        }).populate('address').exec()
        if (userinfo) {
            res.json({
                success: true,
                user: userinfo
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        let user = await User.findOne({
            _id: req.decoded._id
        })
        if (user) {
            if (req.body.name) user.name = req.body.name;
            if (req.body.email) user.email = req.body.email;
            if (req.body.password) user.password = req.body.password;

            await user.save();
            res.json({
                success: true,
                message: "successfully updated"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}