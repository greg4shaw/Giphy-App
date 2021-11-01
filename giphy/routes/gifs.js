import express from 'express'
import Gif from '../models/Gif.js';
import axios from 'axios'
// DIFFERENCE
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router()

// CRUD
//Create
router.post('/', (req, res) => {
    //console.log(req.user)
    Gif.create({ user: req.user.id, url: req.body.url }, (err, gif) => {
        if (err) {
            console.log(err);
            res.send('creation error')
        } else {
            res.send('successful create');
        }
    })
});

// READ
router.get('/', (req, res) => {
    Gif.find({ user: req.user.id },(err, gifs) => {
        if (err) {
            console.log(err);
            res.send('read error')
        } else {
            console.log(gifs);
            res.send(gifs);
        }
    })
});

//SEARCH - for backend to get GIHPY API key
//https://api.giphy.com/v1/gifs/search?api_key=o5Njzr7fPXxqk7r11TGllOa0Cqj9vMgG&q=${input}&limit=10
router.get('/search', (req,res) => {
    console.log(process.env.GIPHY_KEY)
    axios.get(`https://api.giphy.com/v1/gifs/search?&q=${req.query.input}&api_key=${process.env.GIPHY_KEY}&rating=g&limit=10`).then((giphyRes) => {
        res.json(giphyRes.data.data)
    }).catch((err) => {
        console.log(err);
        res.status(500);
    })
})

//UPDATE
router.put('/:id', (req, res) => {
    console.log(req.params.id)
    Gif.findByIdAndUpdate(req.params.id, { url: req.body.url }, (err, result) => {
        if (err) {
            console.log(err);
            res.send('update error')
        } else {
            console.log(result);
            res.send('successful update');
        }        
    })
});

// DELETE

router.delete('/:id', (req, res) => {
    Gif.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) {
            console.log(err);
            res.send('delete error')
        } else {
            console.log(result);
            res.send('successful delete');
        }        
    })
});

export default router;



// LOWDB REMOVED


// // Use JSON file for storage
// const file = path.join(path.resolve(), 'db.json')
// const adapter = new JSONFile(file)
// const db = new Low(adapter)

// await db.read();

// // LOWDB
// import path from 'path'
// import { Low, JSONFile } from 'lowdb'
// // import { fileURLToPath } from 'url'
// import { v4 as uuidv4 } from 'uuid'; 