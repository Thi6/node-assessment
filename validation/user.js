const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateUser(data) {

let errors = {};

data.username = !isEmpty(data.username) ? data.username : "";
data.email = !isEmpty(data.email) ? data.email : "";
data.password = !isEmpty(data.password) ? data.password : "";
data.passwordCheck = !isEmpty(data.passwordCheck) ? data.passwordCheck : "";

//item validation rules
if (!Validator.isAlphanumeric(data.username)) {
    errors.username = "Username field is invalid, must only include numbers and letters";
}

if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
}

if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
}

if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
}

if (!Validator.equals(data.password, data.passwordCheck)) {
    errors.password = "Passwords do not match";
}

if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
}

return {
    errors,
    isValid: isEmpty(errors)
};


};