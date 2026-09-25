import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Trash2, Edit2 } from 'lucide-react';

const Admin = () => {
  const [songs, setSongs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    cover_url: '',
    audio_url: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const { data } = await supabase.from('songs').select('*').order('created_at', { ascending: false });
    if (data) setSongs(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      if (editingId) {
        const { error } = await supabase
          .from('songs')
          .update(formData)
          .eq('id', editingId);
        
        if (error) throw error;
        setMessage('Song updated successfully!');
      } else {
        const { error } = await supabase
          .from('songs')
          .insert([formData]);
          
        if (error) throw error;
        setMessage('Song added successfully!');
      }
      
      setFormData({ title: '', artist: '', album: '', cover_url: '', audio_url: '' });
      setEditingId(null);
      fetchSongs();
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (song) => {
    setEditingId(song.id);
    setFormData({
      title: song.title,
      artist: song.artist,
      album: song.album,
      cover_url: song.cover_url,
      audio_url: song.audio_url
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      await supabase.from('songs').delete().eq('id', id);
      fetchSongs();
    }
  };

  return (
    <div className="main-scroll animate-fade-in">
      <h2 style={{ marginBottom: '24px' }}>Admin Dashboard</h2>
      
      <div className="glass-panel form-container" style={{ margin: '0 0 40px 0', maxWidth: '100%' }}>
        <h3 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Song' : 'Add New Song'}</h3>
        
        {message && <div style={{ padding: '12px', background: 'rgba(0, 210, 255, 0.1)', color: 'var(--primary-color)', borderRadius: '8px', marginBottom: '20px' }}>{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="input-group">
              <label>Song Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="glass-input" />
            </div>
            <div className="input-group">
              <label>Artist</label>
              <input required type="text" name="artist" value={formData.artist} onChange={handleChange} className="glass-input" />
            </div>
            <div className="input-group">
              <label>Album</label>
              <input required type="text" name="album" value={formData.album} onChange={handleChange} className="glass-input" />
            </div>
            <div className="input-group">
              <label>Cover Image URL</label>
              <input required type="url" name="cover_url" value={formData.cover_url} onChange={handleChange} className="glass-input" />
            </div>
          </div>
          <div className="input-group">
            <label>Cloudinary Audio URL</label>
            <input required type="url" name="audio_url" value={formData.audio_url} onChange={handleChange} className="glass-input" placeholder="https://res.cloudinary.com/..." />
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? 'Processing...' : editingId ? 'Update Song' : 'Add Song'}
            </button>
            {editingId && (
              <button type="button" className="glass-button" onClick={() => {
                setEditingId(null);
                setFormData({ title: '', artist: '', album: '', cover_url: '', audio_url: '' });
              }}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      <h3 style={{ marginBottom: '20px' }}>Manage Songs</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '16px' }}>Cover</th>
              <th style={{ padding: '16px' }}>Title</th>
              <th style={{ padding: '16px' }}>Artist</th>
              <th style={{ padding: '16px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.map(song => (
              <tr key={song.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '16px' }}><img src={song.cover_url} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} /></td>
                <td style={{ padding: '16px', fontWeight: '500' }}>{song.title}</td>
                <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{song.artist}</td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="glass-button" style={{ padding: '8px' }} onClick={() => handleEdit(song)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="glass-button" style={{ padding: '8px', color: '#ff4d4d' }} onClick={() => handleDelete(song.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {songs.length === 0 && <p style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>No songs found.</p>}
      </div>
    </div>
  );
};

export default Admin;
