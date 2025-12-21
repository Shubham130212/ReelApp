require("dotenv").config();
const app = require("./src/app");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URL).then(() => console.log("connected with db")).catch((err) => console.log(err));

app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});