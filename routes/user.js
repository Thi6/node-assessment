const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validate = require("../validation/user");


// @route GET user/getAll
// @desc get all users
// access Public
router.get("/getAll", (req, res) => {
    const errors = {};
    User.find({}, '-_id -password -__v')
        .then(users => {
            res.json(users);
        })
        .catch(err => res.status(404).json({ noUsers: "There are no users" }));

});

// @route POST user/register
// @desc register a user
// access Public
router.post("/register", (req, res) => {
    const validateUser = validate(req.body);

    //
    if (!validateUser.isValid) {
        return res.status(400).json(validateUser.errors);
    }

    //new user
    const myUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordCheck: req.body.passwordCheck
    });

    //hashes password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(myUser.password, salt, (err, hash) => {
            if (err) throw err;
            myUser.password = hash;
            myUser.save()
                .then(() => res.send("successfully registered"))
                .catch(err => res.status(404).send("username or email already exists"));
        });
    });


});

// @route GET user/login
// @desc Test a user has been created
// access Public
router.post("/login", (req, res) => {
    let errors = {};
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({username})
        .then(user => {


            bcrypt.compare(password, user.password)
            .then(isMatch => {
                
                if (isMatch) {
                    //login successful
                    res.json({success: "Login successful"});
                } else {
                    errors.password = "Incorrect password";
                    return res.status(400).json(errors);
                }

            })


        })
        .catch(err => res.status(404).json({ notAUser: "This is not a user" }))



});

module.exports = router;