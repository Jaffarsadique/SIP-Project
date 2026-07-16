import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Explore = () => {
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    // Mock data for now if backend isn't running, but we have axios ready
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/notes?keyword=${keyword}`);
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes, using mock data", error);
        // Fallback mock data
        setNotes([
          { _id: '1', title: 'Data Structures and Algorithms', subject: 'Computer Science', tags: ['CS', 'Algorithms'], uploader: { name: 'John Doe' }, rating: 4.8 },
          { _id: '2', title: 'Machine Learning Basics', subject: 'Artificial Intelligence', tags: ['AI', 'ML'], uploader: { name: 'Jane Smith' }, rating: 4.9 },
        ]);
      }
    };
    fetchNotes();
  }, [keyword]);

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Explore <span className="text-gradient">Notes</span></h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Search by title or topic..." 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '600px',
            padding: '1rem',
            borderRadius: '8px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-light)',
            color: 'white',
            outline: 'none',
            fontSize: '1rem'
          }}
        />
      </div>

      <div className="features-grid">
        {notes.map(note => (
          <div key={note._id} className="feature-card glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="feature-title">{note.title}</h3>
            <p className="feature-desc" style={{ marginBottom: '1rem' }}>Subject: {note.subject}</p>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {note.tags.map((tag, idx) => (
                <span key={idx} style={{ background: 'var(--accent-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                  #{tag}
                </span>
              ))}
            </div>
            
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>By {note.uploader.name}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--accent-secondary)' }}>
                ⭐ {note.rating || 'N/A'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
