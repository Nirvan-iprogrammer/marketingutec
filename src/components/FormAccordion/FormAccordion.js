import React, { useEffect, useState } from "react";
import "./styles.css";

const FormAccordion = ({ title, children, open }) => {
  const [isOpen, setOpenIndex] = useState(null);

  useEffect(() => {
    open && setOpenIndex(true);
  }, [open]);

  const toggleAccordion = () => {
    setOpenIndex((prev) => !prev);
  };

  return (
    <div className="accordion-container mb-4">
      <div className="accordion-item">
        <div
          onClick={toggleAccordion}
          className={`accordion-title ${isOpen ? "open" : ""}`}
        >
          {title}
          {isOpen ? (
            <i class="fas fa-chevron-up"></i>
          ) : (
            <i class="fas fa-chevron-down"></i>
          )}
        </div>
        <div className={`accordion-content ${isOpen ? "open" : ""} py-4`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormAccordion;
