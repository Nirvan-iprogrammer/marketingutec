import React from "react";
import withCRUDAuthorization from "components/HOC/CRUDWrapper";
import { Button } from "reactstrap";
const EditBtn = (props) => {
  const { handleClick } = props;
  return (
    <Button onClick={handleClick} color="primary">
      <i className="fas fa-pen mr-2"></i>
      Edit
    </Button>
  );
};

export default withCRUDAuthorization(["superAdmin", "admin"])(EditBtn);
