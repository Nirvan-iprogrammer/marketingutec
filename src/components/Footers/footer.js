import React from 'react';
import './footer.css';
import { Container } from 'reactstrap';

const Footer = ({ year = 2024, brand = "DnA", isCollapsed, toggleSidebar }) => {
  return (
    <div className="footer" style={{ width : isCollapsed? "1759px" : "1604px" }}>
      <div className="footer-content">
        <div className="footer-row">
          <div className="logo-container">
            <div className="logo-images">
              <img src={require("../../assets/img/brand/Frame 811779 (2).png")} alt="logo-part-4"  style={{ width: '45px' , height:"46px"}}  className="logo-img" />
            </div>
            <span className="logo-text">{brand}</span>
          </div>
          <div className="copyright">© {year} {brand}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

