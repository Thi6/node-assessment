const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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

//Apply the uniqueValidator plugin to userSchema
userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

//create user model from the schema
let User = mongoose.model('users', userSchema);

module.exports = User;