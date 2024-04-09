
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
//import pages
import Homepage from './pages/Homepage';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import RecipesList from './pages/RecipesList';
import Profile from './pages/Profile';
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} /> //protected route
          <Route path="/recipes" element={<RecipesList />} /> //protected route
        </Routes>
        </main>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
