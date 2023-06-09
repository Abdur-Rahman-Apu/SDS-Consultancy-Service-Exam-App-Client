/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [employeeInfo, setEmployeeInfo] = useState(
    JSON.parse(localStorage.getItem("Employee-Info"))
  );

  // get user info
  let employee = JSON.parse(localStorage.getItem("Employee-Info"));

  // checking update of employee info to update localStorage employee info
  if (!_.isEqual(employee, employeeInfo)) {
    setEmployeeInfo(employee);
  }

  // logout function
  const logOut = () => {
    localStorage.removeItem("Employee-Info");
  };

  const authInfo = {
    employeeInfo,
    setEmployeeInfo,
    loading,
    setLoading,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
