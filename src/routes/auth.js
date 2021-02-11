const express = require('express')
const router = express.Router();

const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require("../models/user");
const jwt = require('jsonwebtoken');

// Signup page
router.get("/sign-up", (req, res) => {
    res.render("sign-up");
});

// Signup page
router.post("/sign-up", (req, res) => {
    // Create User and JWT
    const user = new User(req.body);

    user.save().then((user) => {
        var token = jwt.sign({
            _id: user._id
        }, process.env.SECRET, {
            expiresIn: "60 days"
        });
        res.cookie('nToken', token, {
            maxAge: 900000,
            httpOnly: true
        });
        res.redirect('/');
    });
});

// LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});

module.exports = router