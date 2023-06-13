import { useForm } from "react-hook-form";
import Logo from "../../assets/Logo/logo.jpg";
import "../../Common/Css/Common.css";
import Lottie from "lottie-react";
import LoginAnimation from "../../assets/LottieFiles/login.json";
import { AuthContext } from "../../Context/AuthProvider";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

const LogIn = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [Loader, setLoader] = useState(false);

  const [passwordInputType, setPasswordInputType] = useState("password");

  // form elements
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.from?.state?.pathname || "/";

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
          console.log(employeeInfo);

          if (regId === givenId && password === givenPass) {
            flag = 1;
            //now click the hidden button using Javascript
            toast.success("Login successfully");
            localStorage.setItem("Employee-Info", JSON.stringify(employeeInfo));
            document.getElementById("hiddenBtn").click();
            navigate(from, { replace: true });
          }
        });
        setLoader(false);
        flag === 0 &&
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            showConfirmButton: false,
            timer: 1500,
          });
      })
      .catch(() => {
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

  // check loading
  if (Loader) {
    return <Loading></Loading>;
  }

  return (
    <div className="hero min-h-screen my-10">
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
            <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
              {/* registration id field  */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Registration ID</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter registration id"
                  className="input input-bordered"
                  {...register("regId", { required: true })}
                  aria-invalid={errors.regId ? "true" : "false"}
                />

                {errors.regId?.type === "required" && (
                  <p role="alert" className="my-1 text-red-600">
                    Registration ID is required
                  </p>
                )}
              </div>

              {/* password field  */}
              <div className="form-control my-4 relative">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <input
                  type={passwordInputType}
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                  aria-invalid={errors.password ? "true" : "false"}
                />

                {passwordInputType === "password" ? (
                  <AiFillEye
                    onClick={togglePasswordInputType}
                    className="absolute top-[62%] right-2 cursor-pointer"
                  />
                ) : (
                  <AiFillEyeInvisible
                    onClick={togglePasswordInputType}
                    className="absolute top-[62%] right-2 cursor-pointer"
                  />
                )}

                {errors.regId?.type === "required" && (
                  <p role="alert" className="my-1 text-red-600">
                    password is required
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="LogIn"
                  className="btn button-bg text-white"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
