import React, { useState } from 'react'
import { Button, Collapse } from 'reactstrap';
import './style.scss'

const CustomOffCanvas = ({title, isOpen, children, toggle}) => {
  
    return (
      <div>
        <Collapse isOpen={isOpen}>
           
          <div className="off-canvas-menu">
          <div className='d-flex justify-content-between pt-2 px-3'>
                <h3>{title}</h3>
                <span onClick={toggle} className='c-p'><i class="fa-solid fa-xmark"></i></span>

            </div>
            <hr/>
            {/* Off-canvas menu content goes here */}
            <div>
              {children}
            </div>
          </div>
        </Collapse>
      </div>
    );
  };
  
  export default CustomOffCanvas;
  