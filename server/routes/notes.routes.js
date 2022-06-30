const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const notesController = require("../controllers/notes.controller")

const uuid = require( "uuid");

app.get("/", async (req, res) => {

    let results = await notesController.find();

    res.send(results);
});

module.exports = app;
