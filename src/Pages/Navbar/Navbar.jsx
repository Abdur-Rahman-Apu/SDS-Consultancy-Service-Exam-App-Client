import Nav from "./Navbar.module.css";
import Logo from "../../assets/Logo/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faClock,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import AvatarImg from "../../assets/Nav/user.png";
import { toast } from "react-toastify";

const Navbar = () => {
  const pathName = useLocation().pathname;

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
      <div className={`${Nav.container} `}>
        {/* upper part  */}
        <div
          className={`${Nav.upper} pb-2  flex justify-center  items-center  z-10`}
        >
          <div className={`${Nav.logo} flex justify-center items-center `}>
            <img src={Logo} alt="Logo" />
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
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white mt-3 p-2 shadow rounded-box w-52 font-roboto"
              >
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
            {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}

            <div className="hidden lg:flex ">
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
            {/* <div
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
            </div> */}
            {/* <button
              style={{ display: "none" }}
              onClick={getEmployeeInfo}
              id="hiddenBtn"
            >
              Hidden Button
            </button> */}
            {employeeInfo ? (
              <>
                <p className="mr-3 capitalize text-base font-bold font-roboto">
                  {employeeInfo?.name}
                </p>
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
                  className={`btn bg-[#F5DF4E] font-bold font-roboto `}
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
