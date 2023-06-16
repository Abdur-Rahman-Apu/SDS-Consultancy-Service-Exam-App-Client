import { useEffect } from "react";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import EmployeeDashboard from "../Employee/EmployeeDashboard/EmployeeDashboard";

const Dashboard = () => {
  const employeeInfo = JSON.parse(localStorage.getItem("Employee-Info"));
  const { role } = employeeInfo;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1 className="text-center mt-16 mb-10 font-roboto text-3xl md:text-4xl font-bold">
        Welcome to the <span className="text-[#F5DF4E]">Dashboard</span>
      </h1>

      <div>{role === "admin" && <AdminDashboard />}</div>
      <div>{role === "employee" && <EmployeeDashboard />}</div>
    </div>
  );
};

export default Dashboard;
