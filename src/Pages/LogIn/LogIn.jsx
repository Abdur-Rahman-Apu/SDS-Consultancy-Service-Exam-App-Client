import { useForm } from "react-hook-form";
import Logo from "../../assets/Logo/logo-bg-none.png";
import "../../Common/Css/Common.css";
import Lottie from "lottie-react";
import LoginAnimation from "../../assets/LottieFiles/login.json";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaLockOpen } from "react-icons/fa";
import { toast } from "react-toastify";
import Loading2 from "../Loading2/Loading2";

const LogIn = () => {
  const navigate = useNavigate();

  const [Loader, setLoader] = useState(false);

  const [passwordInputType, setPasswordInputType] = useState("password");

  // form elements
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get submitted form value & log in
  const onSubmit = (data) => {
    setLoader(true);

    const { regId: givenId, password: givenPass } = data;

    // setLoading(true);
    let flag = 0;

    fetch("https://quiz-five-beta.vercel.app/employees")
      .then((res) => res.json())
      .then((data) => {
        setLoader(false);
        data.forEach((employeeInfo) => {
          const { regId, password } = employeeInfo;

          // matching user id and password
          if (regId === givenId && password === givenPass) {
            flag = 1;
            //now click the hidden button using Javascript
            localStorage.setItem("Employee-Info", JSON.stringify(employeeInfo));
            toast.success("Login successfully");
            // document.getElementById("hiddenBtn").click();

            JSON.parse(localStorage.getItem("Employee-Info")).role == "admin"
              ? navigate("/dashboard")
              : navigate("/certifications");
          }
        });
        setLoader(false);
        flag === 0 && toast.error("No match");
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        toast.error("Server Failed");
      });

    // setLoading(false);
  };

  // password hide & show functionality
  const togglePasswordInputType = () => {
    setPasswordInputType(
      passwordInputType === "password" ? "text" : "password"
    );
  };

  // loader
  if (Loader) {
    return <Loading2></Loading2>;
  }

  return (
    <div className="min-h-[100vh]">
      <div>
        <img className="w-[150px] h-[150px] mx-auto" src={Logo} alt="logo" />
      </div>
      <div className="hero  mb-10">
        <div className="hero-content w-[95%] md:w-[85%] flex-col-reverse md:flex-col lg:flex-row justify-between items-start">
          {/* left side  */}
          <div className="hidden md:block text-center basis-[100%] md:basis-1/2 h-[400px] mb-10 lg:mb-0 lg:text-left">
            <Lottie
              className="w-[100%] h-full"
              animationData={LoginAnimation}
              loop={true}
            />
          </div>
          <div className="basis-1/2  w-full  bg-base-100">
            <div className="">
              <div>
                <h1 className="text-2xl text-center lg:text-start md:text-3xl font-bold tracking-wide">
                  Welcome Back!
                </h1>
              </div>

              {/* login fields  */}
              <form className="mt-14" onSubmit={handleSubmit(onSubmit)}>
                {/* registration id field  */}
                <div className="form-control relative">
                  <input
                    type="text"
                    placeholder="Enter Registration ID"
                    className="border border-black rounded-xl font-semibold py-4 pl-14  text-black text-sm md:text-base focus:outline-[#000] block w-full placeholder-black"
                    {...register("regId", { required: true })}
                    aria-invalid={errors.regId ? "true" : "false"}
                  />

                  {<FaUserAlt className="absolute  top-[38%] left-6" />}
                </div>
                {errors.regId?.type === "required" && (
                  <p role="alert" className="my-1 text-red-600">
                    Registration ID is required
                  </p>
                )}

                {/* password field  */}
                <div className="form-control my-4 relative">
                  <input
                    type={passwordInputType}
                    placeholder="Enter Password"
                    className="border border-black rounded-xl font-semibold py-4 pl-14 text-black text-sm md:text-base focus:outline-[#000] block w-full placeholder-black"
                    {...register("password", { required: true })}
                    aria-invalid={errors.password ? "true" : "false"}
                  />

                  {passwordInputType === "password" ? (
                    <FaLock
                      onClick={togglePasswordInputType}
                      className="absolute top-[38%] left-6 cursor-pointer"
                    />
                  ) : (
                    <FaLockOpen
                      onClick={togglePasswordInputType}
                      className="absolute top-[38%] left-6 cursor-pointer"
                    />
                  )}
                </div>
                {errors.regId?.type === "required" && (
                  <p role="alert" className="mt-[-10px] text-red-600">
                    Password is required
                  </p>
                )}

                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="LogIn"
                    className="btn button-bg text-white w-fit mx-auto mt-6 px-16 rounded-full"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
