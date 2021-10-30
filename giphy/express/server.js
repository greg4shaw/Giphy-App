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

//app.use(express.urlencoded());

//Create
app.get('/post', (req, res) => {
    db.data.gifs.push({id: uuidv4(), url: 'some string'})
    db.write();
    res.send('added')
});

app.get('/read', (req, res) => {
    res.json(db.data.gifs)
});

app.get('/delete/:id', (req, res) => {
    db.data.gifs = db.data.gifs.filter((gifs) => gifs.id !== req.params.id)
    db.write();
    res.send(`removed ${req.params.id}`)
});


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});