import React from 'react';
import './Header.css';

const Header = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-bars">
           <img src={require("../../assets/img/brand/Frame 811779 (1).png")}  alt="bar-1" className="bar" />
          </div>
         {!isCollapsed && (<span className="side-logo">DnA</span>)} 
        </div>
        <button onClick={toggleSidebar} className="menu-button-header">
        {!isCollapsed &&  (<img src={require("../../assets/img/brand/Hamburguer menu.png")} alt="menu"   className="menu-icon-header" />)}
        </button>
      </div>
    </div>
  );
};

export default Header;
