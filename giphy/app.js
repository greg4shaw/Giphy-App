//const express = require('express');
import express from 'express';
//import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
//import dotenv from 'dotenv';

import gifRouter from './routes/gifs.js'
import authRouter from './routes/auth.js'
import authenticateJWT from './middleware/authenticateJWT.js'
//dotenv.config();
//console.log(process.env.MONGO_STRING)
mongoose.connect(process.env.MONGO_STRING, { useNewUrlParser: true});

const app = express();
// below process.env is used because we are using Heroku to deploy
const PORT = process.env.PORT || 3001;

app.use(express.json());
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