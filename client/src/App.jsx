import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import pages
import Homepage from './pages/Homepage';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import RecipesList from './pages/RecipesList';
import Profile from './pages/Profile';
import NewPost from './pages/NewPost';
// import components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasClearedLocalStorage = localStorage.getItem('hasClearedLocalStorage');
    if (!hasClearedLocalStorage) {
      localStorage.clear();
      localStorage.setItem('hasClearedLocalStorage', 'true');
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/upload" element={<Upload isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> {/* protected route */}
            <Route path="/recipes" element={<RecipesList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> {/* protected route */}
            <Route path="/share-recipe" element={<NewPost isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> {/* protected route */}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
