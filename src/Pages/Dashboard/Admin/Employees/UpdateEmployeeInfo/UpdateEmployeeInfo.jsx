import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useSpecificEmployee from "../../../../../CustomHook/useSpecificEmployee/useSpecificEmployee";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UpdateEmployeeInfo = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [employee] = useSpecificEmployee(id);

  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, regId, password } = data;

    if (
      employee?.name != name ||
      employee?.regId != regId ||
      employee?.password != password
    ) {
      const updateData = {
        name,
        regId,
        password,
      };
      fetch(
        `https://quiz-five-beta.vercel.app/updateEmployeeInfo?id=${employee?._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.acknowledged) {
            toast.success("Update Successfully");
          }
        })
        .catch(() => {
          toast.error("Server failed");
        });
    } else {
      toast.error("Please update one field");
    }
  };

  return (
    <div className="p-10 mt-10">
      <h1 className="text-2xl md:text-3xl text-center mb-10 font-roboto font-bold">
        Update Employee Information
      </h1>

      {/* form  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* name  */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={employee?.name}
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="my-1 text-red-600">
                Name is required
              </p>
            )}
          </div>

          {/* registration id  */}
          <div>
            <label
              htmlFor="regId"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Registration Id
            </label>
            <input
              type="text"
              id="regId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={employee?.regId}
              {...register("regId", { required: true })}
              aria-invalid={errors.regId ? "true" : "false"}
            />
            {errors.regId?.type === "required" && (
              <p role="alert" className="my-1 text-red-600">
                Registration ID is required
              </p>
            )}
          </div>

          {/* password  */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={employee?.password}
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="my-1 text-red-600">
                Password is required
              </p>
            )}
          </div>
        </div>

        <input
          type="submit"
          value="Update"
          className="text-white cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        />
      </form>
    </div>
  );
};

export default UpdateEmployeeInfo;
