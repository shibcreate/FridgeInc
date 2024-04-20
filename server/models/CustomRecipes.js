const mongoose = require('mongoose');

const CustomRecs = new mongoose.Schema({
    name: String,
    email: String,
    recipeName: String,
    recipePic: String,
    ingredients: String,
    recipeText: String,
});

const CustomModel = mongoose.model('CustomRecs', CustomRecs);
module.exports = CustomModel;
