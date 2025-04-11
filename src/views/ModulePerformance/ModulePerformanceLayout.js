// import React from 'react';
// import './ModulePerformanceLayout.css';
// import ModulePerformanceHeader from './ModulePerformanceHeader';
// import NoDataDisplay from './NoDataDisplay';

// const ModulePerformanceLayout = () => {
//   return (
//     <div className="module-performance-layout">

//       <main className="main-content-module">
//         {/* <ModulePerformanceHeader /> */}
//         <div className="module-tabs">
//           <button className="tab active">Output data monitoring</button>
//           <button className="tab">Model monitoring</button>
//           <button className="tab">Input data monitoring</button>
//         </div>
//         <NoDataDisplay />
//       </main>
//     </div>
//   );
// };

// export default ModulePerformanceLayout;



import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

import moduleMonitor from "./moduleMonitor";
import dataMonitor from "./dataMonitor";
import NoDataDisplay from "./NoDataDisplay";
import "./ModulePerformanceLayout.css";
import InputMonitor from "./InputMonitor";

const pageData = [
  {
    name: "Output data monitoring",
    id: 0,
    pageContent: dataMonitor,
  },
  {
    name: "Model monitoring",
    id: 1,
    pageContent: moduleMonitor,
  },
  {
    name: "Input data monitoring",
    id: 2,
    pageContent: InputMonitor,
  },
];

const ModulePerformanceLayout = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggle = (tabId) => {
    if (activeTab !== tabId) setActiveTab(tabId);
  };

  return (
    <div>
    <div className="d-flex justify-content-center">
      <Nav className="custom-tab-nav">
        {pageData.map((tab) => (
          <NavItem key={tab.id}>
            <NavLink
               className={classnames("custom-tab", { active: activeTab === tab.id })}
              onClick={() => toggle(tab.id)}
              // style={{
              //   cursor: "pointer",
              //   borderBottom: activeTab === tab.id ? "3px solid #000" : "none",
              //   fontWeight: activeTab === tab.id ? "bold" : "normal",
              //   backgroundColor: activeTab === tab.id ? "#000" : "#f8f9fa",
              //   color: activeTab === tab.id ? "#fff" : "#000",
              //   borderRadius: "0",
              //   padding: "10px 20px",
              //   width: "100%",
              // }}
            >
              {tab.name}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </div>
    <TabContent activeTab={activeTab}>
        {pageData.map((tab) => {
          const Component = tab.pageContent;
          return (
            <TabPane tabId={tab.id} key={tab.id} className="p-4">
              <Component />
            </TabPane>
          );
        })}
      </TabContent>
    </div>
  );
};

export default ModulePerformanceLayout;

