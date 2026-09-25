import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Library, Search, Clock, User, PlusCircle } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '20px', color: 'white' }}>S</span>
        </div>
        <h2 className="text-gradient">StreamiFY</h2>
      </div>

      <nav className="nav-links">
        <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/search" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Search size={20} />
          <span>Search</span>
        </NavLink>
        <NavLink to="/library" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Library size={20} />
          <span>Library</span>
        </NavLink>
        <NavLink to="/history" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Clock size={20} />
          <span>History</span>
        </NavLink>
        <NavLink to="/profile" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <User size={20} />
          <span>Profile</span>
        </NavLink>
        
        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <NavLink to="/admin" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <PlusCircle size={20} />
            <span>Admin</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
