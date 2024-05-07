# FridgeInc
CMPE 131 Project

## Project Description
**FridgeInc** is focused on the growing interest in cooking at home because of its cost-saving results and its usefulness as a skill.
**FridgeInc** will empower users to make easy, delicious meals at home with minimal waste and encourage budgetary and resourceful habits.
**FridgeInc** will bring forward computer vision technology to enable users to be in charge of their food habits and to explore various cusines

Users are able to create an account and log into the account. From there, they can browse the collection of recipes and also share their own recipes. Users are also able to select the type of recipe they want to see. 

## Technologies 
1. MongoDB
2. ExpressJS
3. ReactJS + Vite
4. NodeJS

## Languages
1. Javascript
2. HTML
3. CSS

## Setup 
> Follow the instructions to set it up locally.
* Fork and clone the repo into your local machine
* Then navigate to the `server` folder and run `npm i --force` to install the dependencies for the _backend_
* Still inside the __server__, create an `.env` file. Set variable ```JWT_SECRET``` to any value that you want.
* Next, navigate to the `client` folder and run `npm i --force` to install the dependencies for the _frontend_
* Finally, run `npm start` inside the `server` folder; and run `npm start` inside the `client` folder to get the app run. You will see the respective 'Connected to MongoDB' on server and 'URL' for client

### API (http://localhost:3001)
| Method | Path                          | Purpose                                   |
| ------ | ----------------------------- | ------------------------------------------|
| POST   | /register                     | User registration                         |
| POST   | /login                        | User log in                               |
| POST   | /save-diet-preference         | Store diet reference on User database     |
| POST   | /upload-liked-recipes         | Save recipes user like to User database   |
| POST   | /import-preferences           | Get users' reference                      |
| GET    | /upload                       | For users to upload their fridge pictures |
| GET    | /recipes                      | Show recipes to users                     |
| GET    | /                             | Show selected navigate button in homepage |
| GET    | /authorized                   | Keep track of log in state                |
| GET    | /profile                      | Store user info and reference             |
| GET    | /upload-custom-list           | Show list of users recipes                |
| GET    | /upload-custom-list/:id       | Show detail of each custom recipes        |
| POST   | /upload-custom-recipes        | For users to upload their recipes         |
| GET    | /posts                        | Only show posts by specific user          |
| GET    | /posts/:postId                | Show post detail on edit page             |
| PUT    | /posts/:postId                | Update new input into database            |
| DELETE | /posts/:postId                | Delete a custom recipe from database      |
| GET    | /logout                       | Log user out                              |

### App (http://localhost:5173)
| Path                               | Component                | Purpose                                          |
| -----------------------------------| ------------------------ | ------------------------------------------------ |
| /                                  | `pages/Homepage.jsx`     | Home page                                        |
| /register                          | `pages/Register.jsx`     | Form for creating a new user                     |
| /login                             | `pages/Login.jsx`        | Form for logging in                              |
| /upload                            | `pages/Upload.jsx`       | Upload picture and show result                   |
| /profile                           | `pages/Profile.jsx`      | User profile                                     |
| /recipes                           | `pages/Recipes.jsx`      | List of recipes                                  |
| /share-recipe                      | `pages/NewPost.jsx`      | Form for share custom recipes                    |
| /about                             | `pages/About.jsx`        | Introduction of FridgeInc                        |
| /custom-list                       | `pages/CustomList.jsx`   | Show all custom recipes                          |
| /custom-list/:id                   | `pages/CustomDetail.jsx` | Show individual custom recipe                    |
| /posts                             | `pages/Posts.jsx`        | Show all custom recipes by current user          |
| /posts/:postId                     | `pages/EditPost.jsx`     | Form to edit post                                |

### Models 

We use several Models to save the values onto the MongoDB database: Users.js [name, email, password, dietPreference] and CustomRecipes.js [name, email, recipeName, ingrediants, recipeText]

### Edamam API 

The Edamam API is a service that provides access to a vast amount of food, nutrition, and recipe data. In the context of the provided code, it's used to fetch recipes based on user queries and dietary preferences.

Example Request: GET /search?q=chicken&app_id=your_app_id&app_key=your_app_key&diet=balanced

Parameters
q: The query text. This can be any text such as "chicken".
app_id: Your application ID.
app_key: Your application key.
diet: The diet label. This can be "balanced", "high-protein", "low-fat", "low-carb", "vegan", "vegetarian", etc.
health: The health label. This can be "peanut-free", "tree-nut-free", "alcohol-free", etc.

### Fridge Vision API 

Utilizes the RobowFlow hosted CV model

const response = await axios({
          method: 'POST',
          url: 'aicook',
          params: {
            api_key: 'key',
          },
          data: imageData.split(',')[1],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

Is the format of sending the image and to get the connected response. 

### Frontend

The frontend of this application is made with ReactJS and Vite. 

### Backend

MongoDB database with NodeJS framework using Express. Utilized by creating a mongoDB connection string with Mongoose toolset. We also have a authentication framework with JWT in auth.js to work with the access token. 

### Future Implementaion
* Store users' profile into DB
* Profile page in front end with tabs to individual pages for users to manage info, reference, and posts
___

### Contributors

* [Shinika Balasundar](https://github.com/shibcreate) 
* [Sarah Loh](https://github.com/ritsukye) 
* [Chloe La](https://github.com/chloela1688) 
* [Phuong Tong](https://github.com/YPhuong15) 
