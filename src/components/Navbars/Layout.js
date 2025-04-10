import React, { useState } from 'react';
import HeaderSection from './HeaderSection';
import './Layout.css';

const Layout = ({isCollapsed, toggleSidebar, pageName}) => {

    return (
        <div className="app-wrapper">

            <div className={`layout-container`}>
                <HeaderSection 
                    userName="User"
                    notificationCount={1}
                    isCollapsed={isCollapsed}
                    toggleSidebar={toggleSidebar}
                    pageName={pageName}

                    logoSrc="https://dashboard.codeparrot.ai/api/image/Z-_Gqwz4-w8v6STA/image-15.png"
                />
                {/* Main content goes here */}
            </div>
        </div>
    );
};

export default Layout;
