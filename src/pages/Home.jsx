import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import SongCard from '../components/SongCard';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSongs(data || []);
    } catch (error) {
      console.error('Error fetching songs:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-scroll animate-fade-in">
      {/* Banner / Carousel substitute */}
      <div style={{
        background: 'var(--primary-gradient)',
        borderRadius: '24px',
        padding: '40px',
        marginBottom: '40px',
        boxShadow: '0 10px 30px rgba(0, 210, 255, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Discover<br/>New Music</h1>
          <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '400px' }}>
            Listen to your favorite tracks and explore the best curated collection.
          </p>
        </div>
        {/* Abstract circles for decoration */}
        <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', right: '100px', bottom: '-100px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
      </div>

      <h2 style={{ marginBottom: '24px' }}>Trending Now</h2>
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : songs.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>No songs available. Add some from the Admin panel.</p>
        </div>
      ) : (
        <div className="song-grid">
          {songs.map(song => (
            <SongCard key={song.id} song={song} playlist={songs} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
