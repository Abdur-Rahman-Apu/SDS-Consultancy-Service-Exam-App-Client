import BannerImg from "../../../assets/Banner/banner-img.jpg";
import "../../../Common/Css/Common.css";

const Banner = () => {
  return (
    <div className="hero lg:min-h-16 px-[6%] py-14">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse">
        <div className="basis-1/2  my-7 md:my-0 relative">
          <div className="w-[80px] h-[80px] opacity-40 rounded-full bg-[#7bed9f]  absolute top-0 right-0"></div>
          <div className="w-[20px] h-[20px] opacity-40 rounded-full bg-[#7bed9f]  absolute top-20 right-16"></div>
          <div className="w-[30px] h-[30px] opacity-40 rounded-full bg-[#eccc68]  absolute bottom-20 left-16"></div>
          <img src={BannerImg} className=" md:max-w-sm md:mx-auto rounded-lg" />
        </div>
        <div className="basis-1/2">
          <h1 className="text-3xl md:text-5xl font-bold font-roboto">
            The Smarter Way to Learn{" "}
            <span className="text-[#42BEC3] inline-block  mt-5">Anything</span>
          </h1>
          <p className="py-6 font-poppins text-sm">
            Learning is very important in this modern era. Your confidence will
            be increased, If you sit for an exam. You can judge yourself.
          </p>
          <button className="btn hover:bg-[#42BEC3] bg-[#42BEC3] border-0 text-white font-roboto">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
