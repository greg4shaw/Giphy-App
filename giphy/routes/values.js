import express from 'express'
import Amount from '../models/Amount.js';
// import axios from 'axios'
// // DIFFERENCE
// import dotenv from 'dotenv';
// dotenv.config();

const router = express.Router()

// CRUD
//Create
router.post('/', (req, res) => {
    //console.log(req.user)
    Amount.create({ user: req.user.id, value: req.body.value }, (err, value) => {
        if (err) {
            console.log(err);
            res.send('value creation error')
        } else {
            res.send('successful value add');
        }
    })
});

// READ
router.get('/', (req, res) => {
    Amount.find( { user: req.user.id }, (err, values) => {
        if (err) {
            console.log(err);
            res.send('read value error')
        } else {
            console.log(values);
            res.send(values);
        }
    })
});

//UPDATE
router.put('/', (req, res) => {
    //     Amount.findByIdAndUpdate(req.user.id, { value: (value + req.body.value) }, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         res.send('update value error')
    //     } else {
    //         console.log(result);
    //         console.log(value);
    //         res.send('successful value update');
    //     }        
    // })
});

// // DELETE

// router.delete('/:id', (req, res) => {
//     Gif.findByIdAndDelete(req.params.id, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.send('delete error')
//         } else {
//             console.log(result);
//             res.send('successful delete');
//         }        
//     })
// });

export default router;

