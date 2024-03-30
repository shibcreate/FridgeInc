const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dietPreference: {
    type: String,
    enum: ['No-Eggs', 'Vegetarian', 'Gluten-Free'], // Define the allowed diet preferences
    default: 'No-Eggs', // Set a default value if not specified
  },
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;