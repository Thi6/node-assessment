const mongoose = require("mongoose");
let Schema = mongoose.Schema;

// create item schema
let itemSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

//create item model from the schema
let item = mongoose.model('Item', itemSchema);

//export the item model
module.exports = item;