import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/Loading/loading.json";

const Loading = () => {
  return (
    <div className="w-[50%] mx-auto">
      <Lottie animationData={LoadingAnimation} loop={true} />
    </div>
  );
};

export default Loading;
