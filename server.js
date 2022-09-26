//////////////////
//DEPENDENCIES
/////////////////
//get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
const { PORT = 4000, MONGODB_URL } = process.env;
//import express
const express = require("express");
//create application object
const app = express();
const mongoose = require("mongoose");
//middleware
const cors = require("cors");
const morgan = require("morgan");

//////////////////////
// DATABASE CONNECTION
///////////////////////
//Establish Connection
mongoose.connect(MONGODB_URL);

//Connection Events
mongoose.connection
  .on("open", () => console.log("you are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

/////////////////
//MODELS
////////////////
const cheeseSchema = new mongoose.Schema({
  name: String,
  countryOfOrigin: String,
  image: String,
});

const Cheese = mongoose.model("Cheese", cheeseSchema);

//////////////////////
//MIDDLEWARE
///////////////////////
app.use(cors()); //prevent cors errors, open access to all origins
app.use(morgan("dev")); //logging
app.use(express.json()); //parse json bodies

/////////////////
//ROUTES
/////////////////
//Create a testing route
app.get("/", (req, res) => {
  res.send("Cheese is good");
});
//INDEX
app.get("/cheese", async (req, res) => {
  try {
    res.json(await Cheese.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

//Create
app.post("/cheese", async (req, res) => {
  try {
    res.json(await Cheese.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

//Delete
app.delete("/cheese/:id", async (req, res) => {
  try {
    res.json(await Cheese.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json(erorr);
  }
});

//Update
app.put("/cheese/:id", async (req, res) => {
  try {
    res.json(await Cheese.findByIdAndUpdate(req.params.id, req.body));
  } catch {
    res.status(400).json(error);
  }
});

//////////////////
//LISTENER
/////////////////
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
