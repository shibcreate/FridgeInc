const mongoose = require('mongoose');

const CustomRecs = new mongoose.Schema({
    name: String,
    email: String,
    recipeName: String,
    recipePic: String,
    ingredients: String,
    recipeText: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }
});

const CustomModel = mongoose.model('CustomRecs', CustomRecs);
module.exports = CustomModel;
