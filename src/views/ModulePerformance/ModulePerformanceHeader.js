import React from 'react';
import './ModulePerformanceHeader.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ModulePerformanceHeader = () => {
  return (
    <header className="page-header">
      <div className="header-top">
        <div className="breadcrumb">
          <button className="breadcrumb-home">
            <img src="https://dashboard.codeparrot.ai/api/image/Z_S1z4Di91IKZZnP/home-2.png" alt="Home" />
          </button>
          <img src="https://dashboard.codeparrot.ai/api/image/Z_S1z4Di91IKZZnP/chevron.png" alt="chevron" className="chevron" />
          <button className="breadcrumb-current">
            Module performance
          </button>
        </div>
        <img src="https://dashboard.codeparrot.ai/api/image/Z_S1z4Di91IKZZnP/image-15.png" alt="Logo" className="logo" />
      </div>
      
      <div className="header-content">
        <div className="title-section">
          <img src="https://dashboard.codeparrot.ai/api/image/Z_S1z4Di91IKZZnP/arrow-le.png" alt="Back" className="back-arrow" />
          <h1 className="title">Module Performance</h1>
        </div>
        
        <div className="header-actions">
          <Dropdown isOpen={false} toggle={() => {}}>
            <DropdownToggle className="action-button">
              <img src="https://dashboard.codeparrot.ai/api/image/Z_S1z4Di91IKZZnP/settings.png" alt="Settings" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Settings</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={false} toggle={() => {}}>
            <DropdownToggle className="action-button">
              <img src="https://dashboard.codeparrot.ai/api/image/Z_S1z4Di91IKZZnP/bell.png" alt="Notifications" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Notifications</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <button className="avatar-button">
            <img src="https://dashboard.codeparrot.ai/api/image/Z_S1z4Di91IKZZnP/user.png" alt="User" className="user-avatar" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ModulePerformanceHeader;
