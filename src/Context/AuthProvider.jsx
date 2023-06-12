/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [employeeInfo, setEmployeeInfo] = useState(null);

  // get user info
  useEffect(() => {
    let employee = JSON.parse(localStorage.getItem("Employee-Info"));
    setEmployeeInfo(employee);
  }, []);

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
