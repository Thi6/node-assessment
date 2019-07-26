const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require("./routes/user");
const item = require("./routes/item");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));


app.use("/user", user);
app.use("/item", item);

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true })
.then(
    () => console.log("success")
)
.catch(
    (err) => console.log(err)
);