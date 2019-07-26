const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    passwordCheck: {
        type: String,
        required: true
    }

});

//create user model from the schema
let User = mongoose.model('users', userSchema);

module.exports = User;