# FridgeInc
CMPE 131 Project

# Project Description
FridgeInc is focused on the growing interest in cooking at home because of its cost-saving results and its usefulness as a skill.
FridgeInc will empower users to make easy, delicious meals at home with minimal waste and encourage budgetary and resourceful habits.

Users are able to create an account and log into the account. From there, they can browse the collection of reccipes and also share their own recipes.

## Technologies 
1. MongoDB
2. ExpressJS
3. ReactJS + Vite
4. NodeJS

## Setup 
> Follow the instructions to set it up locally.
* Fork and clone the repo into your local machine
* Then navigate to the `server` folder and run `npm i` to install the dependencies for the _backend_
* Still inside the __server__, create an `.env` file. Set variable ```JWT_SECRET``` to any value that you want.
* Next, navigate to the `client` folder and run `npm i` to install the dependencies for the _frontend_
* Finally, run `npm start` inside the `client` folder; and run `npm start` inside the `server` folder to get the app run.

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

### App (http://localhost:5173)
| Path           | Component                | Purpose                                |
| -------------- | ------------------------ | -------------------------------------- |
| /              | `Home.js`                | Home page                              |
| /register      | `pages/Register.jsx`     | Form for creating a new user           |
| /login         | `pages/Login.jsx`        | Form for logging in                    |
| /upload        | `pages/Upload.jsx`       | Upload picture and show result         |
| /profile       | `pages/Profile.jsx`      | User profile                           |
| /recipes       | `pages/Recipes.jsx`      | List of recipes                        |


### Frontend

The frontend of this application is made with ReactJS and Vite. 

### Backend

SQL database with NodeJS framework using Express.
___

### Contributors

* [Shinika Balasundar](https://github.com/shibcreate) - 
* [Sarah Loh](https://github.com/ritsukye) -
* [Chloe La](https://github.com/chloela1688) -
* [Phuong Tong](https://github.com/YPhuong15) - 
