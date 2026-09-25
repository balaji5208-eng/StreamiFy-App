import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';
import SongCard from '../components/SongCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        searchSongs(query);
      } else {
        setSongs([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const searchSongs = async (searchTerm) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .or(`title.ilike.%${searchTerm}%,artist.ilike.%${searchTerm}%,album.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSongs(data || []);
    } catch (error) {
      console.error('Error searching songs:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-scroll animate-fade-in">
      <h2 style={{ marginBottom: '24px' }}>Search</h2>
      
      <div className="search-container">
        <SearchIcon className="search-icon" size={20} />
        <input 
          type="text" 
          className="glass-input search-input" 
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div style={{ padding: '20px', color: 'var(--text-muted)' }}>Searching...</div>
      ) : query && songs.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>No results found for "{query}"</p>
        </div>
      ) : songs.length > 0 ? (
        <div className="song-grid">
          {songs.map(song => (
            <SongCard key={song.id} song={song} playlist={songs} />
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Search for songs, artists, or albums</p>
        </div>
      )}
    </div>
  );
};

export default Search;
