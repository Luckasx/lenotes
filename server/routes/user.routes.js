const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const notesController = require("../controllers/notes.controller")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/", async (req, res) => {

    console.log(req.body);

    res.json('{msg: "req processed on server"}').send();
});

module.exports = app;
