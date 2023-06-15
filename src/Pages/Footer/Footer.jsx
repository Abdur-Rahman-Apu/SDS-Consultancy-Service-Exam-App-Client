import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import Logo from "../../assets/Logo/logo.png";

import FooterCss from "./Footer.module.css";
import {
  faClock,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../Common/Css/Common.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-[#f1f2f6] px-[6%] flex flex-col justify-between items-center lg:flex-row  p-10  text-base-content">
        <div className="basis-1/3">
          {/* logo */}
          <div>
            <img
              className="w-[220px] h-[220px] object-contain mx-auto"
              src={Logo}
              alt="logo"
            />

            <p className="text-center lg:text-justify font-poppins text-xs mt-[-30px] md:text-sm">
              SDS Consultancy Service conducts exams for different
              certifications. It provides you to judge your learning and provide
              you report of your progress. If you have any confusion, please
              contact with us.
            </p>
          </div>
        </div>
        <div className="basis-1/3 justify-center  items-center">
          <div className=" h-[200px] flex flex-col justify-between ">
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
        <div className="basis-1/3 justify-center">
          <div className="z-0">
          <iframe className="rounded-xl" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53373.205217826566!2d-0.4064048787166974!3d51.87525359532576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487637d0e4f706d5%3A0x2e06e7f34ad91ad0!2sLondon%20Luton%20Airport!5e0!3m2!1sen!2sbd!4v1686822908299!5m2!1sen!2sbd" width="400" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </footer>
      <footer className="footer px-[6%] py-4 border-t bg-[#f5f6fa] justify-center md:justify-between text-base-content border-base-300">
        <div className="items-center grid-flow-col">
          <p className="font-poppins text-sm">
            Copyright © 2023 - All right reserved
          </p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div
            className={`hidden w-[120px] md:flex justify-between mr-4 ${FooterCss.socialIcon}`}
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
        </div>
      </footer>
    </div>
  );
};

export default Footer;
