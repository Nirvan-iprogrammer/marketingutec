import React from 'react';
import './HeaderSection.css';


const HeaderSection = ({
    userName = "User",
    notificationCount = 0,
    logoSrc = "https://dashboard.codeparrot.ai/api/image/Z-_Gqwz4-w8v6STA/image-15.png",
    isCollapsed,
    toggleSidebar, 
    pageName 
}) => {

    console.log("HeaderSection", pageName);
    return (
        <header className="header-section">
            <div className="header-container">
                <div className="page-header">
                    <div className="navigation">
                        <nav className="breadcrumb-header" aria-label="breadcrumb">
                            <button className="home-button" aria-label="Home">
                                <img src={require("../../assets/img/icons/common/home.png")} alt="home" className="home-icon" />
                            </button>
                            <img src={require("../../assets/img/icons/common/chevron-right.png")} alt="" className="chevron" />
                            <button className="data-button">{pageName}</button>
                        </nav>
                        <img src={require("../../assets/img/brand/image 15.png")} alt="Company Logo" className="logo" />
                    </div>
                    <div className="content">
                        <h1 className="title">{pageName}</h1>
                        <div className="user-actions">
                            <button className="action-button" aria-label="Settings">
                                <img src={require("../../assets/img/icons/common/Icon.png")} alt="" className="action-icon" />
                            </button>
                            <button className="action-button" aria-label="Notifications">
                                <img src={require("../../assets/img/icons/common/Icon (1).png")} alt="" className="action-icon" />
                                {/* {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>} */}
                            </button>
                            <button className="action-button" aria-label="user">
                                <img src={require("../../assets/img/icons/common/Icon (2).png")} alt="" className="user-icon" />
                                {/* {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>} */}
                            </button>
                            {/* <button className="avatar" aria-label={userName}>
                                <img src={require("../../assets/img/icons/common/Icon (2).png")} alt="" className="user-icon" />
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderSection;
