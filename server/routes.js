const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const notesRouter = require("./routes/notes.routes")

// const cookieParser = require('cookie-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))



app.get('/mensagem', (req, res) => {
 res.send({ express: 'Hello From Express' });
});

app.use("/notes", notesRouter)

module.exports = app;