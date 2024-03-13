
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
//import pages
import Homepage from './pages/Homepage';
import About from './pages/About';
import Login from './pages/Login';
import RecipesList from './pages/RecipesList';
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
          <Route path="/recipes" element={<RecipesList />} />
        </Routes>
        </main>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
