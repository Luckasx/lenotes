const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usersController = require("../controllers/users.controller")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/:username", async(req, res) => {

    let result = await usersController.get(req.params.username)

    res.status(result.status || 200).json(result).send();

});

app.post("/", async (req, res) => {

    let result = await usersController.create(req.body.data)

    res.status(result.status || 200).json(result).send();
});

module.exports = app;
