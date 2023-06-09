import Trophy from "../../../assets/Certifications/trophy.png";
import Lottie from "lottie-react";
import examAnimation from "../../../assets/Certifications/exam.json";
import { AiOutlineArrowRight } from "react-icons/ai";
import style from "./Certifications.module.css";
import { Link } from "react-router-dom";

const Certifications = () => {
  return (
    <div className={`py-12 ${style.container}`}>
      <div className="text-center flex flex-col justify-center items-center">
        <img
          src={Trophy}
          alt="trophy image"
          className="w-[90px] h-[90px] object-contain"
        />
        <h1 className="text-3xl md:text-4xl uppercase font-bold font-roboto">
          quiz
        </h1>
      </div>

      {/* animation  */}
      <div className="w-[80%] h-[500px] mx-auto my-4">
        <Lottie className="h-full " animationData={examAnimation} loop={true} />
      </div>

      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-semibold font-roboto">
          Choose subject & attend exam
        </h1>
        <p className="text-gray-500 text-xs md:text-sm py-3 font-poppins">
          Select your exam subject and attend the exam
        </p>
        <Link
          to="/certifications"
          className={`${style.btn} inline-block text-xs md:text-sm`}
        >
          Certifications <AiOutlineArrowRight className="inline-block" />{" "}
        </Link>
      </div>
    </div>
  );
};

export default Certifications;
