import { useContext } from "react";
import { MdDashboard } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import { VscOutput } from "react-icons/vsc";
import { BsPersonFillAdd, BsFillPeopleFill } from "react-icons/bs";
import Navbar from "../Pages/Navbar/Navbar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import style from "../Layout/DashboardLayout.module.css";

const DashboardLayout = () => {
  const { employeeInfo } = useContext(AuthContext);

  //   get pathname to highlight active menu
  const pathName = useLocation().pathname;
  console.log(pathName);

  let menus;

  if (employeeInfo?.role === "admin") {
    menus = (
      <>
        <li>
          <Link
            to="/dashboard"
            className={pathName === "/dashboard" ? `${style.activeMenu}` : ""}
          >
            <MdDashboard /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/profile"
            className={
              pathName === "/dashboard/profile" ? `${style.activeMenu}` : ""
            }
          >
            {" "}
            <AiFillProfile />
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/courses"
            className={
              pathName.includes("/dashboard/courses") ||
              pathName.includes("/dashboard/addQuestion")
                ? `${style.activeMenu}`
                : ""
            }
          >
            {" "}
            <FaBook />
            Courses
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard/addEmployee"
            className={
              pathName === "/dashboard/addEmployee" ? `${style.activeMenu}` : ""
            }
          >
            {" "}
            <BsPersonFillAdd /> Add Employee
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/employees"
            className={
              pathName.includes("/dashboard/employees")
                ? `${style.activeMenu}`
                : ""
            }
          >
            <BsFillPeopleFill /> Employees
          </Link>
        </li>
      </>
    );
  } else if (employeeInfo?.role === "employee") {
    menus = (
      <>
        <li>
          <Link
            className={pathName === "/dashboard" ? `${style.activeMenu}` : ""}
          >
            <MdDashboard />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/result"
            className={
              pathName.includes("/dashboard/result")
                ? `${style.activeMenu}`
                : ""
            }
          >
            <VscOutput />
            Result
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      {/* navbar  */}
      <Navbar />

      {/* drawer */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}

          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn bg-[#3FB3BE] btn-sm font-roboto absolute top-5 ml-2 drawer-button lg:hidden"
          >
            Sidebar
          </label>
        </div>
        <div className="drawer-side z-[100] lg:z-0">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul
            className={`menu p-4 w-80 h-full bg-[#3FB3BE] lg:bg-[#30b6bc80] text-base-content text-base font-roboto ${style.dashboardMenu}`}
          >
            {/* Sidebar content here */}
            {menus}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
