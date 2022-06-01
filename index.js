require('dotenv').config();
require("express-async-errors");
const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const connection = require("./db");
const path = require('path');


const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const playListRoutes = require('./routes/playList');
connection();

//middleware
app.use(express.static(__dirname));
app.use(express.json())
app.use(cors());


app.use("/user/", userRoutes);
app.use("/login/", authRoutes);
app.use("/playlists/", playListRoutes);


const port = process.env.PORT || 8080;

__dirname = path.resolve();
if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join()));
}

app.listen(port, () => console.log("Listening on port ${ port } ..."))

