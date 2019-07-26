const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateItem(data) {
// create errors object that will populate and return if there are any errors
let errors = {};

data.username = !isEmpty(data.username) ? data.username : "";
data.password = !isEmpty(data.password) ? data.password : "";

//item validation rules
if (!Validator.isAlphanumeric(data.username)) {
    errors.username = "Username field is invalid, must only include numbers and letters";
}

if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
}

if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
}

return {
    errors,
    isValid: isEmpty(errors)
};


};

