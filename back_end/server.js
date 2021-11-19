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
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});


const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/recipes', {
  useNewUrlParser: true
});

// Create a scheme for recipes in the museum: a title and a path to an image.
const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  path: String,
  instructions: List,
  ingredients: List,
  reviews: List
});

// Create a model for recipes in the museum.
const recipe = mongoose.model('recipe', recipeSchema);

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

// Create a new recipe in the museum: takes a title and a path to an image.
app.post('/api/recipes', async (req, res) => {
  const recipe = new recipe({
    name: req.body.name,
    description: req.body.description,
    path: req.body.path,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    reviews: []
  });
  try {
    await recipe.save();
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the recipes in the museum.
app.get('/api/recipes', async (req, res) => {
  try {
    let recipes = await recipe.find();
    res.send(recipes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/recipes/:id', async (req, res) => {
  try {
    await recipe.deleteOne({
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
    let recipe = await recipe.findOne({
      _id: req.params.id,
    });
    recipe.name: req.body.name,
    recipe.description: req.body.description,
    recipe.path: req.body.path,
    recipe.instructions: req.body.instructions,
    recipe.ingredients: req.body.ingredients,
    await recipe.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/recipes/:id/review', async (req, res) => {
  try {
    let recipe = await recipe.findOne({
      _id: req.params.id,
    });
    recipe.reviews.add(req.body.review)
    await recipe.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});




app.listen(3000, () => console.log('Server listening on port 3000!'));
