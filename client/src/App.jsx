
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
//import pages
import Homepage from './pages/Homepage';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import RecipesList from './pages/RecipesList';
import RecipeDetail from './pages/RecipePage';
//import components
import Navigation from './components/Navigation'
import Footer from './components/Footer'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
        <main>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} /> //protected route
          <Route path="/recipes" element={<RecipesList />} /> //protected route
          <Route path="/recipeDetail" element={<RecipeDetail />} />
        </Routes>
        </main>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
