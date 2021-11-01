import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const Amount = mongoose.model('Amount', Schema({
    value: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}));

export default Amount