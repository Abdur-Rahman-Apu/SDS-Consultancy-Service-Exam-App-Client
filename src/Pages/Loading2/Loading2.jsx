import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/Loading/loading.json";

const Loading2 = () => {
  return (
    <div className="w-[100%] h-[80vh] flex justify-center items-center">
      <Lottie
        className="w-[300px]"
        animationData={LoadingAnimation}
        loop={true}
      />
    </div>
  );
};

export default Loading2;
