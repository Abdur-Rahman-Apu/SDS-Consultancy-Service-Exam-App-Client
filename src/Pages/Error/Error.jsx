import Lottie from "lottie-react";
import ErrorAnimation from "../../assets/LottieFiles/error.json";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Error = () => {
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
