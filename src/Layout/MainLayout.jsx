import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
