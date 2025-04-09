import React from 'react';
import './Sidebar.css';
import Header from './Header';
import Navigation from './Navigation';
import LogoutSection from './LogoutSection';

const SidebarAi = () => {
  return (
    <div className="sidebar">
      <Header />
      <Navigation />
      <LogoutSection />
    </div>
  );
};

export default SidebarAi;
