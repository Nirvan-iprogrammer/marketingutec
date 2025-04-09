import React from 'react';
import './Navigation.css';

const NavItem = ({ icon, text, isActive = false }) => {
  return (
    <div className={`nav-item ${isActive ? 'active' : ''}`}>
      <div className="nav-content">
        <img src={icon} alt={text} className="nav-icon" />
        <span className="nav-text">{text}</span>
      </div>
    </div>
  );
};

const Navigation = () => {
  return (
    <nav className="navigation">
      <NavItem 
        icon="https://dashboard.codeparrot.ai/api/image/Z-_lRQz4-w8v6SUT/home.png" 
        text="Home"
      />
      <NavItem 
        icon="https://dashboard.codeparrot.ai/api/image/Z-_lRQz4-w8v6SUT/carbon-t.png" 
        text="Scenario Performance"
      />
      <NavItem 
        icon="https://dashboard.codeparrot.ai/api/image/Z-_lRQz4-w8v6SUT/carbon-r.png" 
        text="Module Performance"
      />
      <NavItem 
        icon="https://dashboard.codeparrot.ai/api/image/Z-_lRQz4-w8v6SUT/fluent-d.png" 
        text="Data"
        isActive={true}
      />
      <NavItem 
        icon="https://dashboard.codeparrot.ai/api/image/Z-_lRQz4-w8v6SUT/bx-quest.png" 
        text="Query"
      />
    </nav>
  );
};

export default Navigation;
