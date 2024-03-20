const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://admin:Testing1234!@fridgeinc.rufgqkq.mongodb.net/?retryWrites=true&w=majority&appName=fridgeinc", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("The password is incorrect");
        }
      } else {
        res.json("No record existed");
      }
    })
    .catch(err => {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.post('/register', (req, res) => {
  UserModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => {
      console.error('Error during registration:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});