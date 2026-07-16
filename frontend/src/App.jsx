import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Upload from './pages/Upload';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header / Navbar */}
        <header className="header">
          <div className="container flex-between">
            <Link to="/" className="logo">
              <span className="text-gradient">Nexus</span>Notes
            </Link>
            
            <nav className="nav-links">
              <Link to="/explore" className="nav-link">Explore</Link>
              <Link to="/upload" className="nav-link">Upload</Link>
            </nav>
            
            <div className="auth-buttons" style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-secondary">Log In</button>
              <button className="btn btn-primary">Sign Up Free</button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
