import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

import moduleMonitor from "./moduleMonitor";
import dataMonitor from "./dataMonitor";
import NoDataDisplay from "./NoDataDisplay";
import "./ModulePerformanceLayout.css";
import InputMonitor from "./InputMonitor";
import SelectBox from "../../components/SelectBox/SelectBox";
import moduleDropDown from "../../assets/DummuApi/moduleDropDown.json";
import { all } from "axios";

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
  console.log("ModulePerformanceLayout", moduleDropDown.data.result);
  const [activeTab, setActiveTab] = useState(0);
  const [masterDataKey, setMasterDataKey] = useState([moduleDropDown.data.result]);
  const [selectedTable, setSelectedTable] = useState('');

  const toggle = (tabId) => {
    if (activeTab !== tabId) setActiveTab(tabId);
  };

  const allKeys = [];

  moduleDropDown.data.result.forEach(item => {
    Object.keys(item).forEach(key => {
      if (!allKeys.includes(key)) {
        allKeys.push(key);
      }
    });
  });


  console.log("All unique keys: Module", allKeys);

  return (
    <div style={{padding: "32px"}}>
      <SelectBox
        tag={"Go to module"}
        valueKey={allKeys[0]}
        labelKey={allKeys[1]}
        masterData={moduleDropDown.data.result}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
      />

      <div className="d-flex justify-content-center">
        <Nav className="custom-tab-nav">
          {pageData.map((tab) => (
            <NavItem key={tab.id}>
              <NavLink
                className={classnames("custom-tab", { active: activeTab === tab.id })}
                onClick={() => toggle(tab.id)}
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

