import React from 'react';
import './LogoutSection.css';

const LogoutSection = ({ isCollapsed, handleLogout }) => {

  return (
    <div className="logout-section">
      {isCollapsed ?
      <div>
          <div className="divider"></div>
        <img
          src={require("../../assets/img/brand/_Nav item base (1).png")}
          alt="Logout"
          className="logout-icon"
          onClick={handleLogout}
        /> 
        </div>:
        <div>
          <div className="divider"></div>
          <button className="logout-button" onClick={handleLogout}>
            <img src={require("../../assets/img/brand/_Nav item base (1).png")} alt="Logout icon" className="logout-icon" />
            <span className="logout-text">Log out</span>
          </button>
        </div>
      }
    </div>
  );
};

export default LogoutSection;
