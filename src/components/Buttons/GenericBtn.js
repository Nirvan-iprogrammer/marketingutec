import React from "react";
import withCRUDAuthorization from "components/HOC/CRUDWrapper";
import { Button } from "reactstrap";
const GenericBtn = (props) => {
  const { handleClick, icon, label, color, size } = props;
  return (
    <Button onClick={handleClick} color={color} size={size}>
      {icon}
      {label}
    </Button>
  );
};

export default withCRUDAuthorization(["superAdmin", "admin"])(GenericBtn);
