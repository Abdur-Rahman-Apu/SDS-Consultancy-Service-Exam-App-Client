import Logo from "../../assets/Logo/logo.jpg";
import "../../assets/Css/Common.css";
import Lottie from "lottie-react";
import LoginAnimation from "../../assets/LottieFiles/login.json";

const LogIn = () => {
  return (
    <div id="login" className="hero min-h-screen my-10">
      <div className="hero-content w-[85%] flex-col lg:flex-row justify-between">
        {/* left side  */}
        <div className="text-center mb-10 lg:mb-0 lg:text-left">
          <Lottie animationData={LoginAnimation} loop={true} />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100">
          <div className="card-body">
            <div>
              <img
                className="w-[150px] h-[150px] mx-auto"
                src={Logo}
                alt="logo"
              />

              <h1 className="text-center text-3xl font-bold">Welcome Back</h1>
              <p className="text-center text-sm my-2">
                Please enter your details
              </p>
            </div>

            {/* login fields  */}
            <div className="my-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Registration ID</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter registration id"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary button-bg text-white">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
