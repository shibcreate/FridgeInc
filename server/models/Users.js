const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dietPreference: {
    type: String,
    enum: ['No-Eggs', 'Vegetarian', 'Gluten-Free', 'Low-Fat', 'High-Protein', 'Vegan', 'Nut-Free', 'Low-Sodium'], // Define the allowed diet preferences
    default: 'Vegetarian', // Set a default value if not specified
  },
  posts: {
    type: mongoose.Types.ObjectId,
    ref: 'CustomRecs'
  }

});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;