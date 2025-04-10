import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import './FormSection.css';

const FormSection = () => {
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    // Handle form submission
    console.log('Note submitted:', note);
  };

  return (
    <div className="form-section">
      <div className="form-content">
        <div className="input-group">
          <label className="input-label">Add notes</label>
          <div className="input-container">
            <Input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="New product added XX"
              className="text-input"
            />
            <img 
              src={require("../../assets/img/icons/common/pinIcon.png")}
              alt="attach"
              className="input-icon"
            />
          </div>
        </div>
        <Button color="warning" className="submit-button" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FormSection;

