import React from 'react';
import { Play } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const SongCard = ({ song, playlist = [] }) => {
  const { playSong, currentSong, isPlaying } = usePlayer();

  const isCurrentSong = currentSong?.id === song.id;

  return (
    <div className="song-card glass-panel" onClick={() => playSong(song, playlist)}>
      <img src={song.cover_url} alt={song.title} />
      <div className="play-btn-overlay">
        <Play fill="white" size={24} style={{ marginLeft: '4px' }} />
      </div>
      <div className="song-info">
        <div className="song-title" style={{ color: isCurrentSong ? 'var(--primary-color)' : 'white' }}>
          {song.title}
        </div>
        <div className="song-artist">{song.artist}</div>
      </div>
    </div>
  );
};

export default SongCard;
