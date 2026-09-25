import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import SongCard from '../components/SongCard';

const History = () => {
  const { history } = usePlayer();

  return (
    <div className="main-scroll animate-fade-in">
      <h2 style={{ marginBottom: '24px' }}>Recently Played</h2>
      
      {history.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>You haven't played any songs yet.</p>
        </div>
      ) : (
        <div className="song-grid">
          {history.map((song, idx) => (
            <SongCard key={`${song.id}-${idx}`} song={song} playlist={history} />
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
