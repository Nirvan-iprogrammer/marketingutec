import Header from "components/Headers/Header";
// reactstrap components
import { Card, Container, Row } from "reactstrap";
import React from "react";
import Styles from "./styles.scss";

const AccessDenied = () => {
  return (
    <div className="contentWrapper">
      <h1 className="text-center">Access Denied</h1>
    </div>
  );
};

export default AccessDenied;
