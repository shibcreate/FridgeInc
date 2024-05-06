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
import CustomList from './pages/CustomList';
import CustomDetail from './pages/CustomDetail';
import Posts from './pages/Posts';
import EditPost from './pages/EditPost'
// import components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasClearedLocalStorage = localStorage.getItem('hasClearedLocalStorage');
    if (!isLoggedIn && !hasClearedLocalStorage) {
      localStorage.clear();
      localStorage.setItem('hasClearedLocalStorage', 'true');
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage when user logs out
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/about" element={<About isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/upload" element={<Upload isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> {/* protected route */}
            <Route path="/recipes" element={<RecipesList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/custom-list" element={<CustomList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} /> 
            <Route path="/custom-list/:id" element={<CustomDetail />} />
            <Route path="/share-recipe" element={<NewPost isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> {/* protected route */}
            <Route path="/posts" element={<Posts isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/posts/:postId" element={<EditPost isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;