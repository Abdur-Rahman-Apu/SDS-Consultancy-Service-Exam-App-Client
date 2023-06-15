import Nav from "./Navbar.module.css";
import Logo from "../../assets/Logo/logo-bg-none.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faClock,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import AvatarImg from "../../assets/Nav/user.png";
import { toast } from "react-toastify";

const Navbar = () => {
  const pathName = useLocation().pathname;
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const { employeeInfo, logOut, setEmployeeInfo } = useContext(AuthContext);

  useEffect(() => {
    const employeeInfo = JSON.parse(localStorage.getItem("Employee-Info"));
    setEmployeeInfo(employeeInfo);
  }, [setEmployeeInfo]);

  const handleLogOut = () => {
    logOut();
    toast.success("Logout successfully");
    navigate("/");
    setEmployeeInfo(null);
  };

  return (
    <>
      <div className={`${Nav.container} dark:bg-black`}>
        {/* upper part  */}
        <div
          className={`${Nav.upper} pb-2  flex  md:items-center md:justify-between z-10 dark:bg-black`}

        >
          <div
            className={`${Nav.logo} md:basis-1/2 flex justify-center items-center md:justify-start`}
          >
            <img src={Logo} alt="Logo" />

            {/* company name  */}
            <div className="flex flex-col ml-2">
              <p className={`font-bold text-2xl font-roboto ${Nav.highlight}`}>
                SDS
              </p>
              <span className="text-sm text-gray-400 font-poppins">
                Consultancy Service
              </span>
            </div>
          </div>

          <div className="md:flex justify-between basis-1/2 hidden">
            {/* call info  */}
            <div className="flex">
              <div className="mr-2">
                <FontAwesomeIcon className="text-[#42BEC3]" icon={faPhone} />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-sm font-roboto">Call</p>
                <span className="text-xs mt-1 text-gray-500 font-poppins">
                  +44-7689789898
                </span>
              </div>
            </div>

            {/* work time info  */}
            <div className="flex ">
              <div className="mr-2">
                <FontAwesomeIcon className="text-[#42BEC3]" icon={faClock} />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-sm font-roboto">Work Time</p>
                <span className="text-xs mt-1 text-gray-500 font-poppins">
                  Mon-Fri 8AM -5PM
                </span>
              </div>
            </div>

            {/* address info  */}
            <div className="flex">
              <div className="mr-2">
                <FontAwesomeIcon
                  className="text-[#42BEC3]"
                  icon={faLocationDot}
                />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-sm font-roboto">Address</p>
                <span className="text-xs mt-1 text-gray-500 font-poppins">
                  Franklin st. Avenue
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* bottom part  */}
      </div>

      {/* menus  */}
      <div className="pt-3 px-[4%] sticky top-0 z-[100] bg-white dark:bg-black shadow-md">
        <div className="navbar bg-base-100 ">
          <div className="navbar-start">
            <div className="dropdown">
              <div className="drawer drawer-start z-20">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label onClick={() => setOpen(!open)} htmlFor="my-drawer-4" className="drawer-button lg:hidden cursor-pointer">
                  <FontAwesomeIcon icon={faBars} className="text-2xl text-black dark:text-white" />
                  </label>
                </div>
                <div className="drawer-side">
                  <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                  <div className="w-full max-w-[350px] bg-black h-full">
                  <ul
                    tabIndex={0}
                    className="w-full space-y-6 mt-28 pr-4"
                  >
                    {employeeInfo?.role === "employee" && (
                      <li>
                        <Link
                          to="/certifications"
                          className={`btn btn-success rounded w-full
                            ${pathName === "/certifications" ? "active-link" : ""}
                          `}
                        >
                          Examinations
                        </Link>
                      </li>
                    )}

                    {/* if employee is logged in then show it  */}
                    {employeeInfo && (
                      <li>
                        <Link
                          to="/dashboard"
                          className={`btn btn-success rounded w-full
                            ${pathName.includes("/dashboard") ? "active-link" : ""}`
                          }
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
                </div>
              </div>

            </div>
            {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}

            <div className="hidden lg:flex">
              <ul className="menu menu-horizontal px-1 text-base font-semibold font-roboto">
                {employeeInfo?.role === "employee" && (
                  <li>
                    <Link
                      to="/certifications"
                      className={
                        pathName === "/certifications" ? "active-link" : ""
                      }
                    >
                      Examinations
                    </Link>
                  </li>
                )}

                {/* if employee is logged in then show it  */}
                {employeeInfo && (
                  <li>
                    <Link
                      to="/dashboard"
                      className={
                        pathName.includes("/dashboard") ? "active-link" : ""
                      }
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="navbar-end">
            <div
              className={`hidden w-[120px] md:flex justify-between mr-4 ${Nav.socialIcon}`}
            >
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
            {/* <button
              style={{ display: "none" }}
              onClick={getEmployeeInfo}
              id="hiddenBtn"
            >
              Hidden Button
            </button> */}
            {employeeInfo ? (
              <>
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={employeeInfo?.name}
                >
                  <div className="avatar online mr-4 ">
                    <div className="w-12 rounded-full ">
                      <img src={AvatarImg} className="object-cover" />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogOut}
                  className={`btn text-white font-roboto ${Nav.gradientBg}`}
                >
                  LogOut
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`btn text-white font-roboto ${Nav.gradientBg}`}
              >
                LogIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
