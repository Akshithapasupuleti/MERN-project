import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './GamesHome.js';
import Remainder from './Components/Remainder';
import Motivation from './Motivation';
import MusicPlayer from './Components/MusicPlayer';
import Fitness from './Components/Fitness';
import Home from './Home';
import AuthForm from './Components/AuthForm';
import HealthForm from './HealthForm.js';
import PaymentModal from './Components/PaymentModal'; // Import PaymentModal component
import './App.css';
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  return (
    <Router>
      <div className="App">
        <button onClick={() => setIsModalOpen(true)}>Open Payment Modal</button>
        <PaymentModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
  
        <nav className="navbar">
          <Link to="/" className="navbar-title nav-link">Human Life Well Being</Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/fitness" className="nav-link">Fitness</Link>
            </li>
            <li className="nav-item">
              <Link to="/game" className="nav-link">Game</Link>
            </li> 
            <li className="nav-item">
              <Link to="/remainder" className="nav-link">Water Remainder</Link>
            </li>
            <li className="nav-item">
              <Link to="/motivation" className="nav-link">Motivation</Link>
            </li>
            <li className="nav-item">
              <Link to="/MusicPlayer" className="nav-link">Music</Link>
            </li>
            <li className="nav-item">
              <Link to="/health" className="nav-link">Health Analysis</Link>
            </li>
            <li className="nav-item">
              <button> <Link to="/login" className="nav-link">Login</Link></button> 
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<HomePage />} /> 
          <Route path="/motivation" element={<Motivation />} />
          <Route path="/MusicPlayer" element={<MusicPlayer />} />
          <Route path="/remainder" element={<Remainder />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/health" element={<HealthForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
