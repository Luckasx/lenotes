const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const notesController = require("../controllers/notes.controller")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) => {

    let results = await notesController.find();

    res.send(results);
});

app.post("/", async (req, res) => {

    let results = await notesController.insert(req, res);

    res.send(results);
});

module.exports = app;
