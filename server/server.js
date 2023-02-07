require('dotenv-safe').config({path: './.env'});

const express = require('express');
const cookieParser = require("cookie-parser");


const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());

const router = require('./routes.js');

app.use("/api", router);

app.listen(port, () => console.log(`Listening on port ${port}`));