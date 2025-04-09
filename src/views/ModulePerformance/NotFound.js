import React from 'react';
import './NotFound.css';
// import Button from 'react-bootstrap/Button';

const NoDataDisplay = ({ message = 'No Data to Display' }) => {
  return (
    <div className="no-data-container">
      <div className="no-data-content">
        <h2 className="no-data-title">{message}</h2>
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z_S1z4Di91IKZZnP/no-data.png" 
          alt="No data illustration" 
          className="no-data-image"
        />
        {/* <Button variant="primary">Refresh</Button> */}
      </div>
    </div>
  );
};

export default NoDataDisplay;
