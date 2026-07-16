import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="hero">
      <div className="hero-glow"></div>
      <div className="container hero-content">
        <h1 className="title-large" style={{ marginBottom: '1.5rem' }}>
          The Ultimate Platform for <br/>
          <span className="text-gradient">Academic Excellence</span>
        </h1>
        <p className="subtitle">
          Upload, organize, and discover high-quality study materials. 
          Enhanced with AI summaries, intelligent search, and community collaboration.
        </p>
        
        <div className="hero-buttons">
          <Link to="/explore" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Explore Notes
          </Link>
          <Link to="/upload" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Start Uploading
          </Link>
        </div>
        
        {/* Features Preview */}
        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon">🔍</div>
            <h3 className="feature-title">Intelligent Search</h3>
            <p className="feature-desc">Find exactly what you need with advanced filtering by subject, topic, and institution.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon">✨</div>
            <h3 className="feature-title">AI Summarization</h3>
            <p className="feature-desc">Instantly grasp the core concepts with AI-generated summaries for every uploaded document.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon">🤝</div>
            <h3 className="feature-title">Community Driven</h3>
            <p className="feature-desc">Rate, review, and collaborate. Find the highest quality notes endorsed by top students.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
