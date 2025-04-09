import React from "react";

const withCRUDAuthorization = (allowedRoles) => (WrappedComponent) => {
  return (props) => {
    const userRole = "superAdmin";
    const operationActions = ["add", "update", "delete"];
    const { operation, ...restProps } = props;
    const isAllowed =
      allowedRoles.includes(userRole) && operationActions.includes(operation);
    if (isAllowed) {
      return <WrappedComponent {...restProps} />;
    } else {
      return null;
    }
  };
};

export default withCRUDAuthorization;
