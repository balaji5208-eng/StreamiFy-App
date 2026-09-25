import React from 'react';
import { User, Settings, Heart, Bell } from 'lucide-react';

const Profile = () => {
  return (
    <div className="main-scroll animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '50%', 
          background: 'var(--primary-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(0, 210, 255, 0.3)'
        }}>
          <User size={60} color="white" />
        </div>
        <div>
          <h1 style={{ marginBottom: '8px' }}>Guest User</h1>
          <p style={{ color: 'var(--text-muted)' }}>Premium Member</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
          <Heart size={24} color="var(--primary-color)" />
          <div>
            <h3 style={{ marginBottom: '4px' }}>Liked Songs</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>143 songs</p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
          <Settings size={24} color="var(--primary-color)" />
          <div>
            <h3 style={{ marginBottom: '4px' }}>Settings</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Account & Preferences</p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
          <Bell size={24} color="var(--primary-color)" />
          <div>
            <h3 style={{ marginBottom: '4px' }}>Notifications</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Manage alerts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
