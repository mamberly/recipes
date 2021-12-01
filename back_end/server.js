const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front_end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/recipes', {
  useNewUrlParser: true
});

const recipeSchema = new mongoose.Schema({
  rating: Number,
  title: String,
  description: String,
  path: String,
  instructions: String,
  ingredients: String,
  reviews: Array,
  totalRating: Number
});

// Create a model for recipes in the museum.
const Recipe = mongoose.model('Recipe', recipeSchema);

// Get a list of all of the recipes in the museum.
app.get('/api/recipes', async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the recipes in the museum.
app.get('/api/recipes', async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/recipes/:id', async (req, res) => {
  try {
    let recipe = await Recipe.findOne({
      _id: req.params.id,
    });
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new recipe
app.post('/api/recipes', async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    path: req.body.path,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    reviews: [],
    rating: 0,
    totalRating: 0
  });
  try {
    await recipe.save();
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/recipes/:id/review', async (req, res) => {
  try {
    let recipe = await Recipe.findOne({
      _id: req.params.id,
    });
    recipe.reviews.push({
      'review': req.body.review,
      'rating': req.body.rating
    });
    recipe.totalRating += req.body.rating
    recipe.rating = recipe.totalRating / recipe.reviews.length
    await recipe.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/recipes/:id', async (req, res) => {
  try {
    await Recipe.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/recipes/:id', async (req, res) => {
  try {
    let recipe = await Recipe.findOne({
      _id: req.params.id,
    });
    recipe.title =  req.body.title;
    recipe.description = req.body.description;
    recipe.instructions= req.body.instructions;
    recipe.ingredients= req.body.ingredients;
    await recipe.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.listen(3000, () => console.log('Server listening on port 3000!'));
