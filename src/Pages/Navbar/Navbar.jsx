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
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import AvatarImg from "../../assets/Nav/avatar.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  navigate(0);

  const { employeeInfo, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut();
    // refresh
    navigate(0);
  };

  return (
    <div className={`${Nav.container} shadow-md `}>
      {/* upper part  */}
      <div
        className={`${Nav.upper} pb-2  flex  md:items-center md:justify-between z-10`}
      >
        <div
          className={`${Nav.logo} md:basis-1/2 flex justify-center items-center md:justify-start`}
        >
          <img src={Logo} alt="Logo" />

          {/* company name  */}
          <div className="flex flex-col ml-2">
            <p className={`font-bold text-2xl ${Nav.highlight}`}>SDS</p>
            <span className="text-sm text-gray-400">Consultancy Service</span>
          </div>
        </div>

        <div className="md:flex justify-between basis-1/2 hidden ">
          {/* call info  */}
          <div className="flex">
            <div className="mr-2">
              <FontAwesomeIcon className="text-[#42BEC3]" icon={faPhone} />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-sm">Call</p>
              <span className="text-xs mt-1 text-gray-500">+44-7689789898</span>
            </div>
          </div>

          {/* work time info  */}
          <div className="flex ">
            <div className="mr-2">
              <FontAwesomeIcon className="text-[#42BEC3]" icon={faClock} />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-sm">Work Time</p>
              <span className="text-xs mt-1 text-gray-500">
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
              <p className="font-bold text-sm">Address</p>
              <span className="text-xs mt-1 text-gray-500">
                Franklin st. Avenue
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* bottom part  */}

      <div className="navbar bg-base-100 pt-3">
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
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link>Certifications</Link>
              </li>

              {/* if employee is logged in then show it  */}
              {employeeInfo && (
                <li>
                  <Link>Dashboard</Link>
                </li>
              )}

              <li>
                <Link>About Us</Link>
              </li>
            </ul>
          </div>
          {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}

          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base font-semibold">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link>Certifications</Link>
              </li>

              {/* if employee is logged in then show it  */}
              {employeeInfo && (
                <li>
                  <Link>Dashboard</Link>
                </li>
              )}

              <li>
                <Link>About Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <div
            className={`hidden w-[120px] md:flex justify-between mr-4 ${Nav.socialIcon}`}
          >
            <a href="#">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
          {employeeInfo ? (
            <>
              <div
                className="tooltip tooltip-bottom"
                data-tip={employeeInfo.name}
              >
                <div className="avatar online mr-4 ">
                  <div className="w-12 rounded-full ">
                    <img src={AvatarImg} />
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogOut}
                className={`btn text-white ${Nav.gradientBg}`}
              >
                LogOut
              </button>
            </>
          ) : (
            <Link to="/login" className={`btn text-white ${Nav.gradientBg}`}>
              LogIn
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
