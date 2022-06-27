const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const uuid = require( "uuid");

app.get("/", (req, res) => {
  res.send({
    notes: [
      {
        id: uuid.v4(),
        task: "Task Retrieved from back-end...",
      },
    ],
  });
});

module.exports = app;
