import React from 'react';
import './ModulePerformanceLayout.css';
import ModulePerformanceHeader from './ModulePerformanceHeader';
import NoDataDisplay from './NoDataDisplay';

const ModulePerformanceLayout = () => {
  return (
    <div className="module-performance-layout">

      <main className="main-content-module">
        {/* <ModulePerformanceHeader /> */}
        <div className="module-tabs">
          <button className="tab active">Output data monitoring</button>
          <button className="tab">Model monitoring</button>
          <button className="tab">Input data monitoring</button>
        </div>
        <NoDataDisplay />
      </main>
    </div>
  );
};

export default ModulePerformanceLayout;
