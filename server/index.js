const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require("./models/Users");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const {createToken, validateToken} = require('./middleware/auth')

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(cookieParser());

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

app.post('/register', (req, res) => {
  const {name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    UserModel.create({
      name: name,
      email: email,
      password: hash,
    }).then(() => {
      res.json("User registered");
      console.log(name)
    }).catch((err) => {
      if (err) {
        res.status(400).json({error: err});
      }
    });
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({error: "User is not registered"});
    }
    
    const hashedPassword = user.password;
    bcrypt.compare(password, hashedPassword).then((match) => {
      if (!match) {
        return res.status(400).json({error: "Wrong password"});
      } else {
        const accessToken = createToken(user);
        res.cookie('access-token', accessToken, {
          maxAge: 1296000000,
          httpOnly: true,
        });
        return res.json('Logged in');
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/profile', validateToken, (req, res) => {
  res.json('profile page')
});

app.get('/recipes', validateToken, (req, res) => {
  res.json('recipe list')
})

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});