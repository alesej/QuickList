const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
    id: { type: Number, required: true, unique: true},
    items:[{
        quantity: { type: Number },
        item: { type: String },
        id: { type: Number }
    }]
})

module.exports = mongoose.model("list", listSchema);