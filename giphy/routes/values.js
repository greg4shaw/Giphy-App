import express from 'express'
import User from '../models/User.js';

const router = express.Router()

// READ
router.get('/', (req, res) => {
    User.findById( req.user.id , (err, values) => {
        if (err) {
            res.send('read value error')
        } else {
            res.send(values);
        }
    })
});

//UPDATE
router.post('/update', (req, res) => {
    User.findByIdAndUpdate(req.user.id, { balance: req.body.balance }, (err, result) => {
        if (err) {
            res.send('update error')
        } else {
            res.send('successful update');
        }        
    })
});

// // DELETE
router.delete('/delete', (req, res) => {
    User.findByIdAndDelete(req.user.id, (err, result) => {
        if (err) {
            res.send('delete error')
        } else {
            res.send('successful delete');
        }        
    })
});

export default router;
