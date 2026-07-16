import React, { useState } from 'react';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    topic: '',
    tags: '',
    file: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to upload to backend using axios formData
    alert('File upload process started! (Mocking success for MVP)');
  };

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          Upload <span className="text-gradient">Notes</span>
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Title</label>
            <input 
              type="text" 
              required
              placeholder="e.g., Intro to Machine Learning"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px', 
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', color: 'white'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Subject</label>
              <input 
                type="text" 
                required
                placeholder="e.g., Computer Science"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                style={{
                  width: '100%', padding: '0.75rem', borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', color: 'white'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Topic</label>
              <input 
                type="text" 
                required
                placeholder="e.g., Algorithms"
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
                style={{
                  width: '100%', padding: '0.75rem', borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', color: 'white'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Tags (comma separated)</label>
            <input 
              type="text" 
              placeholder="e.g., exam-prep, midterm, difficult"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px', 
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', color: 'white'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Upload File (PDF/TXT)</label>
            <input 
              type="file" 
              required
              accept=".pdf,.txt,.doc,.docx"
              onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px', 
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', color: 'white'
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Upload Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
