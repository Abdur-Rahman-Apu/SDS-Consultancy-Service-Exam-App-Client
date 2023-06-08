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
import "../../assets/Css/Common.css";

const Footer = () => {
  return (
    <div id="about">
      <footer className="footer bg-[#f1f2f6] px-[6%] flex flex-col justify-between items-center lg:flex-row  p-10  text-base-content">
        <div className="basis-1/3">
          {/* logo */}
          <div>
            <img
              className="w-[220px] h-[220px] object-contain mx-auto"
              src={Logo}
              alt="logo"
            />

            <p className="text-center lg:text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              non ex consequatur facere eius quos, architecto exercitationem
              totam id voluptas?
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
                <p className="font-bold text-sm">Call</p>
                <span className="text-xs mt-1 text-gray-500">
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
        <div className="basis-1/3 justify-center">
          <div>
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </footer>
      <footer className="footer px-[6%] py-4 border-t bg-[#f5f6fa] justify-center md:justify-between text-base-content border-base-300">
        <div className="items-center grid-flow-col">
          <p>Copyright © 2023 - All right reserved</p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div
            className={`hidden w-[120px] md:flex justify-between mr-4 ${FooterCss.socialIcon}`}
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
        </div>
      </footer>
    </div>
  );
};

export default Footer;
