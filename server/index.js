const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require("./models/Users");
const CustomModel = require("./models/CustomRecipes");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { createToken, validateToken,checkAuth } = require('./middleware/auth');

const app = express();
app.use(express.json());
//CORS config
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
//setHeaders
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use(cookieParser());
app.use(checkAuth)
// MongoDB connection
mongoose.connect("mongodb+srv://admin:Testing1234!@fridgeinc.rufgqkq.mongodb.net/?retryWrites=true&w=majority&appName=fridgeinc", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//DATABASE CONNECTION
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//ROUTES HANDLERS
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
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
        res.status(400).json({ error: err });
      }
    });
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "User is not registered" });
    }

    const hashedPassword = user.password;
    bcrypt.compare(password, hashedPassword).then((match) => {
      if (!match) {
        return res.status(400).json({ error: "Wrong password" });
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

app.post('/upload-custom-recipes', checkAuth, async (req, res) => {
  const { name, email, recipeName, recipePic, ingredients, recipeText } = req.body;

const userId = req.user ? req.user._id : null;
  try {
    const customRecs = await CustomModel.create({
      name: name, // connect the custom recipe to the user by username?
      email: email,
      recipeName: recipeName,
      recipePic: recipePic,
      ingredients: ingredients,
      recipeText: recipeText,
      user: userId
    });

    return res.json({ message: 'Custom recipe saved successfully' });
  } 
  catch (error) {
    console.error('Error saving custom recipe:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/save-diet-preference', async (req, res) => {
  const { email, dietPreference } = req.body;

  try {
    // Update the user's diet preference in the database
    const user = await UserModel.findOneAndUpdate(
      { email: email },
      { dietPreference: dietPreference },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'Diet preference saved successfully' });
  } catch (error) {
    console.error('Error saving diet preference:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/////////////////////////

app.get('/upload-custom-list', async (req, res) => {
  //see if can retrieve documents
  try {
    const { recipeName } = req.query;

    if (recipeName) {
      // if the user querys recipe name!!
      const specificRecipes = await CustomModel.find({ recipeName: { $regex: recipeName, $options: 'i' } });
      res.json(specificRecipes);
    } 
    else {
      // if no query, all recipes generated
      const allRecipes = await CustomModel.find({});
      res.json(allRecipes);
    }
  } catch (error) {
    console.error('Error retrieving recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/upload-custom-list/:id', async (req, res) => {
  const recipeId = req.params.id;
  try {
    const recipe = await CustomModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const userPosts = await CustomModel.find({ user: userId});
    if (userPosts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }
    res.status(200).json({ posts: userPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await CustomModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ post });
  } catch (error) {
    console.error('Error fetching post details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
 
});


app.put('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  const updatedData = req.body;
  try {
    const updatedPost = await CustomModel.findByIdAndUpdate(postId, updatedData, {new:true});
    if(!updatedPost) {
      return res.status(404).json({message:'Posts not found'});
    }
    res.status(200).json({message: 'Post updated sucessfully', post: updatedPost})
  } catch (err) {
    console.error('Error editing post: ', err);
    res.status(500).json({message: "Internal server error"})
  }
});

app.delete('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  try {
    const deletedPost = await CustomModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({message: 'Post not found'});
    }
    res.status(200).json({message: 'Successfully deleted post'});
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ err: 'Internal server error' });
  }
});

app.post('/upload-liked-recipes', async (req, res) => {
  const { email, likedRecipes } = req.body;

  try {
    // Find the user by email and update the liked recipes in the database
    const user = await UserModel.findOneAndUpdate(
      { email: email },
      { $addToSet: { likedRecipes: { $each: likedRecipes } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'Liked recipes uploaded successfully' });
  } catch (error) {
    console.error('Error uploading liked recipes:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/import-preferences', async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email and retrieve the diet preference
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ dietPreference: user.dietPreference });
  } catch (error) {
    console.error('Error importing preferences:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/upload', validateToken, (req, res) => {
  res.json('upload page');
});

app.get('/recipes', (req, res) => {
  res.json('recipe list');
});

app.get('/', validateToken, (req, res) => {
  res.json('homepage')
});

app.get('/profile', validateToken, (req, res) => {
  res.json('profile page')
});

app.get('/authorized', validateToken, (req, res) => {
  res.json('user authentication check')
});

app.get('/logout', async (req, res) => {
  res.status(202).clearCookie('access-token').send('cookie cleared')
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});