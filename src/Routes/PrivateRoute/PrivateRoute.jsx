/* eslint-disable react/prop-types */

import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { employeeInfo } = useContext(AuthContext);

  const location = useLocation();

  if (employeeInfo) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} />;
};

export default PrivateRoute;
