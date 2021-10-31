//const express = require('express');
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import gifRouter from './routes/gifs.js'
import authRouter from './routes/auth.js'

const accessTokenSecret = 'somerandomaccesstoken';

mongoose.connect('mongodb+srv://admin:admin@cluster0.xdi5v.mongodb.net/gifsDB?retryWrites=true&w=majority');

// MIDDLEWARE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}


const app = express();
// below process.env is used because we are using Heroku to deploy
const PORT = process.env.PORT || 3001;

// use body to read the data from postman which doesnt have to be part of the URL
app.use(express.urlencoded({ extended: true }));
// Passing in our gif routes & the JWT token here only
app.use('/auth', authRouter )
app.use('/gifs', authenticateJWT, gifRouter )

// DEFAULT
app.get('/', (req, res) => {
    res.send('Login to access API')
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});




// LOWDB CODE REMOVED

// import { Low, JSONFile } from 'lowdb'
// // import { fileURLToPath } from 'url'
// import { v4 as uuidv4 } from 'uuid'; 

// // LOWDB
// import path from 'path'

// // Use JSON file for storage
// const file = path.join(path.resolve(), 'db.json')
// const adapter = new JSONFile(file)
// const db = new Low(adapter)


// await db.read();

// // If file.json doesn't exist, db.data will be null
// // Set default data // If no DB exists make a new array
// if(!db.data) db.data = { gifs: [] }