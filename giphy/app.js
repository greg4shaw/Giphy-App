import express from 'express';
import mongoose from 'mongoose';
import { URL } from 'url';
import valueRouter from './routes/values.js'
import gifRouter from './routes/gifs.js'
import authRouter from './routes/auth.js'
import authenticateJWT from './middleware/authenticateJWT.js'

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
app.use('/values', authenticateJWT, valueRouter )

// GETTING SERVER TO SERVE FRONT END REACT FILES

// creating the build files and saving them under client
app.use(express.static(new URL('./client/build', import.meta.url).pathname))

// DEFAULT - any end point that is hit that is not /auth or /gifs then send a file back
// this is the index.html file created when the build is done so it wont do anything locally
app.get('*', (req, res) => {
    res.sendFile(new URL('./client/index.html', import.meta.url).pathname)
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});
