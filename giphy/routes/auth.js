//const express = require('express');
import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
// DIFFERENCE
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router()

const accessTokenSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH;
let refreshTokens = [];
// console.log(process.env.JWT_SECRET)
// console.log(process.env.JWT_REFRESH)

// AUTH ROUTES

// LOGIN ROUTE

router.post('/login', (req, res) => {
    // read username and password from request body
    const { username, password } = req.body;
    //console.log(req.body)

    User.findOne({ username: username }, (err, user) => {
        if(err || !user) {
            console.log('Auth/Sign in error' + err);
            res.status(401).json('user does not exist');
        } else {
            user.comparePassword(password, (error, isMatch) => {
                if(error) {
                    console.log(error);
                }
                if(isMatch) {
                    const accessToken = jwt.sign({ id: user._id, username: user.username}, accessTokenSecret, { expiresIn: '120m' });
                    const refreshToken = jwt.sign({ id: user._id, username: user.username}, refreshTokenSecret);
            
                    refreshTokens.push(refreshToken);
            
                    res.json({
                        accessToken,
                        refreshToken
                    });
                } else {
                    res.status(400).json('invalid credentials')
                }
            })
        }
    })
});

// TOKEN ROUTE

router.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username}, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
});

// LOGOUT ROUTE

router.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);

    res.send("Logout successful");
});

// SIGNUP ROUTE

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    
    User.findOne({username: username}).then((user) => {
        if(user) {
            res.status(500).json('user exists');
        } else {
            User.create({
                username,
                password
            })

            res.status(200).json('user created');
        }
    })
});


export default router;