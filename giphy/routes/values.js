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

// //Create
// router.post('/', (req, res) => {
//     console.log('ROUTE ' + req.body.username)
//     //User.create({ user: req.user.id, balance: req.body.value }, (err, value) => {
//     User.findOneAndUpdate({ username: req.username.id }, { balance: 99 }, (err, value) => {
//         if (err) {
//             console.log(err);
//             res.send('value creation error')
//         } else {
//             res.send('successful value add');
//             console.log(req.user.id)
//         }
//     })
// });

// // REPLACE

// router.post('/replace', (req, res) => {
// User.replaceOne({ user: req.user.id, value: req.body.value }, (err, value) => {
//     if (err) {
//         console.log(err);
//         res.send('value creation error')
//     } else {
//         res.send('successful value add');
//     }
// })
// });

