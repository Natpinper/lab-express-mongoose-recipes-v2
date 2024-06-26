const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const Recipe = require("./models/Recipe.model");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res) => {
  console.log(req.body);
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then((createdRecipe) => {
      res.json(createdRecipe);
    })
    .catch((err) => {
      console.log(err);
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      res.json(allRecipes);
    })
    .catch((err) => {
      console.log(err);
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res)=>{
    Recipe.findById(req.params.id)
    .then((oneRecipe)=>{
        res.json(oneRecipe)
        console.log(req.params.id)
    })
    .catch(err=>{
        console.log(err)
    })
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id",(req,res)=>{
    Recipe.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then((updatedRecipe)=>{
        res.json(updatedRecipe)
    })
    .catch(err=>{
        console.log(err)
    })
})
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id",(req,res)=>{
    Recipe.findByIdAndDelete(req.params.id)
    .then((deletedRecipe)=>{
        res.json(deletedRecipe)
    })
    .catch(err=>{
        console.log(err)
    })
})

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
