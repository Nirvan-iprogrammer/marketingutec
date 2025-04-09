import React from "react";
import AccessDenied from "../views/access-denied/AccessDenied";
import { useSelector } from "react-redux";
const RBAC = ({ roles, children }) => {
  const { userDetails } = useSelector((state) => state.auth);

  if (!roles?.includes(userDetails?.role?.role_name?.toLowerCase())) {
    return <AccessDenied />;
  }
  return children;
};

export default RBAC;
