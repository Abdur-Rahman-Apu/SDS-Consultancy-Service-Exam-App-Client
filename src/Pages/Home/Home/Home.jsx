import Banner from "../Banner/Banner";
import Exam from "../../../assets/Features/banner-image.png";
import Question from "../../../assets/Features/question.jpg";
import Course from "../../Course/Course";


const Home = () => {
  return (
    <div>
      <Banner />
      <Course></Course>
      {/* features  */}
      <div className="py-10 bg-[#f5f6fa]">
        {/* intro  */}
        <div className="text-center w-[50%] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome to <span className="text-[#00ADB4]">SDS</span>
          </h1>

          <p className="my-4 text-[12px] md:text-[16px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            assumenda nam odio illum asperiores consectetur.
          </p>
        </div>

        {/* features  */}
        <div className="flex flex-col lg:flex-row justify-between px-[6%] my-24 ">
          {/* one  */}
          <div className="mb-5 lg:mb:0 basis-[32%] bg-white p-6 rounded-3xl cursor-pointer hover:shadow-md">
            <div className="h-[220px]">
              <img
                className="w-full h-full object-contain"
                src={Exam}
                alt="exam"
              />
            </div>

            <div>
              <p className="text-center font-bold text-xl">
                Exam on different certifications
              </p>
            </div>
          </div>

          {/* two  */}
          <div className="mb-5 lg:mb:0 basis-[32%] bg-white p-6 rounded-3xl cursor-pointer hover:shadow-md">
            <div className="h-[220px]">
              <img
                className="w-full h-full object-contain"
                src={Course}
                alt="exam"
              />
            </div>

            <div>
              <p className="text-center font-bold text-xl">
                Five certifications
              </p>
            </div>
          </div>

          {/* three  */}
          <div className="mb-5 lg:mb:0 basis-[32%] bg-white p-6 rounded-3xl cursor-pointer hover:shadow-md">
            <div className="h-[220px]">
              <img
                className="w-full h-full object-contain"
                src={Question}
                alt="exam"
              />
            </div>

            <div>
              <p className="text-center font-bold text-xl">
                Each course has 100 questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
