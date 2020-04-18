/*      MERN STACK PROJECT --BACKEND     */
// Importing Required Files And Packages Here.
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/Post");

// Defining Global Constant For MongoDB URI
const MONGODB_URI = "Place Your MongoDb Atlas URI Here.";
// Defining Global Constant For PORT
const PORT = process.env.PORT || 8080;

// Initializing Express App Here
const app = express();

// Defining Express MiddleWares Here.
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/api/posts", postRoutes);
app.use((req, res, next) => {
  const error = new Error("URL Not Found.");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    message: `Error! ${error.message}`,
    error: error,
  });
});

// DB Connection Here.
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("Connected..!");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
