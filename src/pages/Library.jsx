import React from 'react';

const Library = () => {
  return (
    <div className="main-scroll animate-fade-in">
      <h2 style={{ marginBottom: '24px' }}>Your Library</h2>
      
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>
          Save songs to your library to easily find them later.
          <br/>
          (Feature coming soon!)
        </p>
      </div>
    </div>
  );
};

export default Library;
