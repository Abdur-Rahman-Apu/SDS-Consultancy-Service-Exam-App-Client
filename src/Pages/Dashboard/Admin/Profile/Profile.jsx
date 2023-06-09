import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Context/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "../../../../assets/Profile/profile.png";

const Profile = () => {
  const { employeeInfo, setEmployeeInfo } = useContext(AuthContext);
  const { _id, role, name, regId, password } = employeeInfo;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // update password
  const onSubmit = (data) => {
    console.log(data);
    // check new password is given in the field or not
    if (password != data.password || regId != data.regId) {
      // update password using patch method to update specific admin
      fetch(`https://quiz-five-beta.vercel.app/updateAdminInfo?id=${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            toast.success("Updated successfully");

            // get previous admin info from the local-storage
            const adminInfo = JSON.parse(localStorage.getItem("Employee-Info"));

            // update the password in the local-storage
            adminInfo["password"] = data.password;
            adminInfo["regId"] = data.regId;
            localStorage.setItem("Employee-Info", JSON.stringify(adminInfo));
            setEmployeeInfo(JSON.parse(localStorage.getItem("Employee-Info")));

            // navigate to profile page
            navigate("/dashboard/profile");
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    } else {
      toast.error("Please provide new info.");
    }
  };
  return (
    <div>
      <div className="w-[90%] md:w-[60%] mx-auto mt-20 mb-10   border border-[#F5DF4E] rounded-lg shadow">
        <div className=" py-10">
          <h1 className="text-2xl md:text-3xl text-center font-bold font-roboto uppercase">
            Your Profile
          </h1>

          {/* profile avatar  */}
          <div className="w-[200px] mx-auto">
            <img
              src={ProfileAvatar}
              alt="image"
              className="object-cover w-full"
            />
          </div>

          {/* profile information  */}
          <div className="px-[20px] font-roboto ">
            <h5 className="mb-1 text-lg md:text-xl  font-medium text-gray-900  mt-4">
              <span className="font-bold "> Name:</span>
              {" " + name}
            </h5>
            <h5 className="mb-1 text-lg md:text-xl font-medium text-gray-900  mt-4">
              <span className="font-bold "> Designation:</span>
              {" " + role}
            </h5>

            <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
              {/* registration id field  */}
              <div className="form-control">
                <h5 className="mb-1 text-lg md:text-xl font-medium text-gray-900 capitalize mt-4">
                  <span className=" font-bold">Registration Id</span>
                </h5>
                <input
                  type="text"
                  placeholder="Enter password"
                  defaultValue={regId}
                  className="input input-bordered"
                  {...register("regId", { required: true })}
                  aria-invalid={errors.regId ? "true" : "false"}
                />

                {errors.regId?.type === "required" && (
                  <p role="alert" className="my-1 text-red-600">
                    Registration Id is required
                  </p>
                )}
              </div>

              {/* password field  */}
              <div className="form-control">
                <h5 className="mb-1 text-lg md:text-xl font-medium text-gray-900 capitalize mt-4">
                  <span className=" font-bold">Password</span>
                </h5>
                <input
                  type="text"
                  placeholder="Enter password"
                  defaultValue={password}
                  className="input input-bordered"
                  {...register("password", { required: true })}
                  aria-invalid={errors.password ? "true" : "false"}
                />

                {errors.password?.type === "required" && (
                  <p role="alert" className="my-1 text-red-600">
                    Password is required
                  </p>
                )}
              </div>

              <input
                type="submit"
                value="Update Admin Info"
                className={`block font-roboto font-bold w-fit mx-auto my-6 px-[30px] py-[15px] rounded-full ${style.submitBtn}`}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
