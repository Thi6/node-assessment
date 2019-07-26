const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const item = require("../models/item");
const validate = require("../validation/item");




// @route GET item/getAll
// @desc get all items in db
// access Public
router.get("/getAll", (req, res) => {
    const errors = {};
    item.find({}, '-password -__v')
        .then(items => {
            res.json(items);
        })
        .catch(err => res.status(404).json({ noItems: "There are no items" }));

});

// @route POST item/addItem
// @desc add item to db
// access Public
router.post("/addItem", (req, res) => {

    const validateItem = validate(req.body);

    if (!validateItem.isValid) {
      return res.status(400).json(validateItem.errors);
    }

    item.findOne({ username: req.body.username })
        .then(item => {

            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {

                    if (isMatch) {
             
                        const myItem = new item ({
                            username: req.body.username,
                            password: req.body.password,
                            content: req.body.content
                        });
                        myItem.save()
                            .then(() => res.send("item succesfully created"))
                            .catch(err => res.status(404).json(err));
                    } else {
                        errors.password = "Incorrect password";
                        return res.status(400).json(errors);
                    }

                })


        })
        .catch(err => res.status(404).json(err))


});

// @route PUT item/updateItem
// @desc updates an item
// access Public
router.put("/updateItem", (req, res) => {


    const newItem = new item({
        username: req.body.username,
        content: req.body.content,
    });

    item.findById(id)
        .then(item => {
            bcrypt.compare(email, item.email).then(isMatch => {
                if (isMatch) {
                    //update item
                    item.updateOne({ "_id": id })
                        .then(() =>
                            res.status(200).send("successfully deleted item"))
                        .catch(err => res.status(404).json({ itemNotFound: "Item not found" }))
                } else {
                    errors.email = "Incorrect email, you cannot delete this item";
                    return res.status(400).json(errors);
                }

            })


        })
        .catch(err => res.status(404).json({ notAnItem: "This is not an item" }))



});


// @route DELETE item/deleteItem
// @desc deletes an item
// access Public
router.delete("/deleteItem", (req, res) => {

    let errors = {};

    const password = req.body.password;
    const username = req.body.username;

    item.findById(username)
        .then(item => {
            bcrypt.compare(password, item.password)
                .then(isMatch => {
                    if (isMatch) {
                        //remove item
                        item.deleteOne({ username })
                            .then(() =>
                                res.status(200).send("successfully deleted item"))
                            .catch(err => res.status(404).json({ itemNotFound: "Item not found" }))
                    } else {
                        errors.password = "Incorrect password, you cannot delete this item";
                        return res.status(400).json(errors);
                    }

                })


        })
        .catch(err => res.status(404).json({ notAnItem: "This is not an item" }))

});

module.exports = router;

