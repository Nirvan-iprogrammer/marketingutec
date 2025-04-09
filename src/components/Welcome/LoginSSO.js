import React from 'react';
import './LoginSSO.css';
import background from "../../assets/img/brand/Background-overlay.png"
import mainImage from "../../assets/img/brand/Section.png"
import overlay from "../../assets/img/brand/Background_overlay_sec.png"
import microSoftLogo from "../../assets/img/brand/logos_microsoft-icon.png"
import frame from "../../assets/img/brand/Frame 811779.png"
import logo from "../../assets/img/brand/image 15.png"



const LoginSSO = ({ onSSOClick = () => {}}) => {
  return (
    <div className="welcome-container">
      {/* Left Section */}
      <div
        className="welcome-left"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div
          className="welcome-overlay"
          style={{
            backgroundImage: `url(${mainImage}), url(${overlay})`,
          }}
        />
      </div>

      {/* Right Section */}
      <div className="welcome-right">
        <div className="welcome-top-box">
          <div className="d-flex align-items-center justify-content-between">
            <div className="welcome-dna-box">
              <img src={frame} alt="" className="welcome-dna-img" />
              <span className="welcome-dna-logo">DnA</span>
            </div>
            <img src={logo} alt="Logo" className="welcome-logo-img" />
          </div>
        </div>

        <button className="welcome-button">
          <div className="d-flex align-items-center justify-content-center gap-2 w-100 h-100">
            <img
              src={microSoftLogo}
              alt="Microsoft"
              className="welcome-ms-logo"
            />
            <span className="welcome-button-text">Single Sign-On (SSO)</span>
          </div>
        </button>
      </div>
    </div>
    // <div className="login-sso">
    //   <div className="section-left">
    //     <div className="background-overlay"></div>
    //     <div className="background-overlay-2"></div>
    //     <div className="container">
    //       <div className="content">
    //         <h1 className="title">Utec - Data and Analytics</h1>
    //         <p className="description">
    //           The Utec DnA platform is a comprehensive tool designed to monitor and assess the 
    //           performance of Utec systems. It provides in-depth insights into various performance metrics, 
    //           helping users track operational efficiency, identify potential issues, and ensure that Utec 
    //           technologies are functioning at their optimal capacity. The platform allows for real-time 
    //           performance analysis, detailed reporting, and continuous monitoring, ensuring that any 
    //           performance deviations are promptly addressed. It also supports a user-friendly interface, 
    //           making it accessible for both technical and non-technical users to gain a holistic view of 
    //           Utec's overall performance.
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="section-right">
    //     <Card className="login-container">
    //       <Card.Body>
    //         <div className="header">
    //           <div className="logo-container">
    //             <div className="dna-logo">
    //               <div className="bar-container">
    //                 <img src="https://dashboard.codeparrot.ai/api/image/Z-_iEeGYgKEKiAne/frame-81.png" alt="bar-1" className="bar" />
    //                 <img src="https://dashboard.codeparrot.ai/api/image/Z-_iEeGYgKEKiAne/frame-81-2.png" alt="bar-2" className="bar" />
    //                 <img src="https://dashboard.codeparrot.ai/api/image/Z-_iEeGYgKEKiAne/frame-81-3.png" alt="bar-3" className="bar" />
    //                 <img src="https://dashboard.codeparrot.ai/api/image/Z-_iEeGYgKEKiAne/frame-81-4.png" alt="bar-4" className="bar" />
    //               </div>
    //               <span className="dna-text">DnA</span>
    //             </div>
    //           </div>
    //           <img src="https://dashboard.codeparrot.ai/api/image/Z-_iEeGYgKEKiAne/image-15.png" alt="logo" className="company-logo" />
    //         </div>

    //         <Button className="sso-button" onClick={onSSOClick} variant="dark">
    //           <img src="https://dashboard.codeparrot.ai/api/image/Z-_iEeGYgKEKiAne/logos-mi.png" alt="Microsoft" className="ms-icon" />
    //           <span>Single Sign-On (SSO)</span>
    //         </Button>
    //       </Card.Body>
    //     </Card>
    //   </div>
    // </div>
  );
};

export default LoginSSO;