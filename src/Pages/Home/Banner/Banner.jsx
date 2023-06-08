import BannerImg from "../../../assets/Banner/banner-img.jpg";
import "../../../assets/Css/Common.css";

const Banner = () => {
  return (
    <div className="hero my-16 lg:min-h-screen px-[6%]">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse">
        <div className="basis-1/2  my-7 md:my-0">
          <img src={BannerImg} className=" md:max-w-sm md:mx-auto rounded-lg" />
        </div>
        <div className="basis-1/2">
          <h1 className="text-3xl md:text-5xl font-bold leading-snug">
            The Smarter Way to Learn{" "}
            <span className="text-[#FF735C]">Anything</span>
          </h1>
          <p className="py-6">
            Learning is very important in this modern era. Your confidence will
            be increased, If you sit for an exam. You will learn.
          </p>
          <button className="btn btn-primary bg-[#FF735C] border-0 text-white">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
