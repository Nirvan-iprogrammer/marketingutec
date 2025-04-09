import React from "react";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";

const MasterLoader = () => {
  const { loading } = useSelector((state) => state.global);
  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <Spinner color="primary" style={{ height: "3rem", width: "3rem" }} />
        </div>
      )}
    </>
  );
};

export default MasterLoader;
