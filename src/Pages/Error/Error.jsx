import Lottie from "lottie-react";
import ErrorAnimation from "../../assets/LottieFiles/error.json";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
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
      <Footer />
    </div>
  );
};

export default Error;
