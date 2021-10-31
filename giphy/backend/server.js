//const express = require('express');
import express from 'express';

// LOWDB
import path from 'path'
import { Low, JSONFile } from 'lowdb'
// import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'; 


// Use JSON file for storage
const file = path.join(path.resolve(), 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read();

// If file.json doesn't exist, db.data will be null
// Set default data // If no DB exists make a new array
if(!db.data) db.data = { gifs: [] }

const app = express();
const PORT = 3001;

//const someArray = [{name: 'Tim', age: 27, job: "software developer"}]
// use body to read the data from postman which doesnt have to be part of the URL
app.use(express.urlencoded());

//Create
app.post('/post', (req, res) => {
    db.data.gifs.push({id: uuidv4(), url: req.body.url})
    db.write();
    res.send('added')
});

app.get('/read', (req, res) => {
    res.json(db.data.gifs)
});

//Update
app.get('/update/:id/:url', (req, res) => {
    const recordToUpdate = db.data.gifs.find((gif) => gif.id === req.params.id)
    recordToUpdate.url = req.params.url
    db.write();
    res.send(`edited ${req.params.id}`)
});


app.get('/delete/:id', (req, res) => {
    db.data.gifs = db.data.gifs.filter((gif) => gif.id !== req.params.id)
    db.write();
    res.send(`removed ${req.params.id}`)
});


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});