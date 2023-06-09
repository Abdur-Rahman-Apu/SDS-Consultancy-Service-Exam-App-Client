import Lottie from "lottie-react";
import ErrorAnimation from "../../assets/LottieFiles/error.json";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";

const Error = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar />

      <div>
        <Lottie animationData={ErrorAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Error;
