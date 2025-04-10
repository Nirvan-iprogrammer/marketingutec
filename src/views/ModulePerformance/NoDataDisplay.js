import React from 'react';
import './NoDataDisplay.css';
import { Button } from "reactstrap";

const NoDataDisplay = ({ message = 'No Data to Display' }) => {
  return (
    <div className="no-data-container">
      <div className="no-data-content">
        <h2 className="no-data-title">{message}</h2>
        <img 
          src={require('../../assets/img/icons/common/no-data/pana.png')}
          alt="No data illustration" 
          className="no-data-image"
        />
        <Button variant="primary">Refresh</Button>
      </div>
    </div>
  );
};

export default NoDataDisplay;
