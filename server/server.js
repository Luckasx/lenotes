require('dotenv-safe').config({path: './.env'});

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const router = require('./routes.js');

app.use("/api", router);

app.listen(port, () => console.log(`Listening on port ${port}`));