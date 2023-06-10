import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";

const Dashboard = () => {
  const { employeeInfo } = useContext(AuthContext);
  const { role } = employeeInfo;
  console.log(role);
  return (
    <div>
      <h1 className="text-center mt-16 mb-10 font-roboto text-3xl md:text-4xl font-bold">
        Welcome to the <span className="text-[#2DB6BB]">Dashboard</span>
      </h1>

      <div>{role === "admin" && <AdminDashboard />}</div>
    </div>
  );
};

export default Dashboard;
