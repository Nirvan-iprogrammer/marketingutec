import React from "react";
import withCRUDAuthorization from "components/HOC/CRUDWrapper";
import { Button } from "reactstrap";
const DeleteBtn = (props) => {
  const { handleClick } = props;
  return (
    <Button onClick={handleClick} color="danger">
      <i class="fas fa-trash-alt mr-2"></i>
      Delete
    </Button>
  );
};

export default withCRUDAuthorization(["superAdmin", "admin"])(DeleteBtn);
