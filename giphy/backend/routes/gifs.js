import express from 'express'
// LOWDB
import path from 'path'
import { Low, JSONFile } from 'lowdb'
// import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'; 

const router = express.Router()

// Use JSON file for storage
const file = path.join(path.resolve(), 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read();

// CRUD
//Create
router.post('/', (req, res) => {
    db.data.gifs.push({id: uuidv4(), url: req.body.url})
    db.write();
    res.send('added')
});

// READ
router.get('/', (req, res) => {
    console.log('working')
    res.json(db.data.gifs)
});

//Update
router.put('/:id', (req, res) => {
    const recordToUpdate = db.data.gifs.find((gif) => gif.id === req.params.id)
    recordToUpdate.url = req.body.url
    db.write();
    res.send(`edited ${req.params.id}`)
});

// DELETE

router.delete('/:id', (req, res) => {
    db.data.gifs = db.data.gifs.filter((gif) => gif.id !== req.params.id)
    db.write();
    res.send(`removed ${req.params.id}`)
});

export default router;
