import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const Player = () => {
  const { 
    currentSong, isPlaying, togglePlay, playNext, playPrevious, 
    progress, duration, seek, volume, changeVolume 
  } = usePlayer();

  if (!currentSong) return null;

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    seek(percentage * duration);
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    changeVolume(percentage);
  };

  return (
    <div className="player-container animate-fade-in">
      <div className="player-track-info">
        <img src={currentSong.cover_url} alt="Cover" className="player-cover" />
        <div style={{ overflow: 'hidden' }}>
          <div className="song-title">{currentSong.title}</div>
          <div className="song-artist">{currentSong.artist}</div>
        </div>
      </div>

      <div className="player-controls-container">
        <div className="player-controls">
          <button className="control-btn" onClick={playPrevious}>
            <SkipBack size={20} />
          </button>
          <button className="control-btn play-pause-btn" onClick={togglePlay}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '4px' }}/>}
          </button>
          <button className="control-btn" onClick={playNext}>
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="progress-container">
          <span className="time-text">{formatTime(progress)}</span>
          <div className="progress-bar" onClick={handleProgressChange}>
            <div 
              className="progress-fill" 
              style={{ width: `${(progress / (duration || 1)) * 100}%` }}
            ></div>
          </div>
          <span className="time-text">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-volume">
        <Volume2 size={20} color="var(--text-muted)" />
        <div className="volume-bar" onClick={handleVolumeChange}>
          <div 
            className="volume-fill" 
            style={{ width: `${volume * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Player;
