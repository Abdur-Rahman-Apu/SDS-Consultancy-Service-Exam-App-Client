import ExamImg from "../../assets/About/exam.jpg";
import clockImg from "../../assets/About/clock.jpg";
import studyImg from "../../assets/About/study.jpg";
import missionImg from "../../assets/About/mission.jpg";
import { FaHandPointRight } from "react-icons/fa";

const About = () => {
  return (
    <div>
      {/* heading  */}
      <div className="p-20 bg-[#44b2bf33]">
        <h1 className="text-center font-roboto text-4xl font-semibold">
          About Us
        </h1>
      </div>

      {/* welcome message  */}
      <div className="flex flex-col lg:flex-row justify-between items-center w-[70%] mx-auto my-20">
        <div className="basis-1/2">
          <h1 className="text-4xl md:text-5xl font-roboto font-bold mb-3">
            Welcome to <span className="text-[#44b2bf]">SDS</span>
          </h1>
          <p className="text-xs md:text-sm font-poppins ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            totam sapiente ratione tempore illo officia cum! Quidem animi alias
            eaque!
          </p>
        </div>
        <div className="basis-1/2 relative mt-20 lg:mt-0">
          {/* big image  */}
          <div>
            <img
              src={ExamImg}
              alt="exam image"
              className=" w-[300px] h-[300px] md:w-[400px] md:h-[400px] mx-auto rounded-[50%] object-cover"
            />
          </div>

          {/* absolute images  */}
          <div className="absolute top-[20%] left-0">
            <img
              src={clockImg}
              alt="clock image"
              className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-[50%] ring ring-[#44b2bf] ring-offset-4 ring-offset-[#fff] object-cover"
            />
          </div>
          <div className="absolute bottom-[-40px] left-[20%]">
            <img
              src={studyImg}
              alt="study image"
              className="w-[100px] h-[100px] rounded-[50%] ring ring-[#44b2bf] ring-offset-4 ring-offset-[#fff] object-cover"
            />
          </div>

          {/* absolute circles  */}
          <div className="absolute top-[50%] right-[-20px] lg:right-0 w-[40px] h-[40px] bg-[#44b2bfb3] rounded-[50%]"></div>
          <div className="absolute bottom-0 right-[30%] w-[20px] h-[20px] bg-[#44b2bf] rounded-[50%]"></div>
        </div>
      </div>

      {/* mission section  */}

      <div className="flex flex-col lg:flex-row items-center justify-between w-[70%] mx-auto my-36">
        <div className="basis-1/2 relative">
          {/* image  */}
          <img
            src={missionImg}
            alt="mission image"
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] object-cover rounded-[50%]"
          />

          {/* absolute circles  */}
          <div className="absolute right-[10px] md:right-[40px] lg:right-[80px] bottom-[30px] w-[50px] h-[50px] bg-[#36B4BD] rounded-[50%]"></div>
          <div className="absolute right-[50px] bottom-0 w-[18px] h-[18px] bg-[#36B4BD] rounded-[50%]"></div>
        </div>
        <div className="basis-1/2 mt-16 lg:mt-0">
          <span className="font-roboto font-semibold text-[#36B4BD]">
            About Us
          </span>
          <h1 className="text-3xl md:text-4xl font-roboto font-bold">
            Our Mission
          </h1>
          <p className="text-xs md:text-sm text-justify my-3 font-poppins">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            magnam dolorem minus sit praesentium odit perspiciatis sint vel
            doloremque rem.
          </p>

          <ul className="text-xs md:text-sm font-poppins">
            <li className="flex items-center">
              {" "}
              <FaHandPointRight className="mr-2 text-[#36B4BD]" /> Lorem ipsum
              dolor sit amet.
            </li>
            <li className="flex items-center">
              {" "}
              <FaHandPointRight className="mr-2 text-[#36B4BD]" /> Lorem ipsum
              dolor sit amet.
            </li>
            <li className="flex items-center">
              {" "}
              <FaHandPointRight className="mr-2 text-[#36B4BD]" /> Lorem ipsum
              dolor sit amet.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
