import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    fetch("https://quiz-five-beta.vercel.app/addEmployee", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          toast.success("You added an employee successfully.");
          navigate("/dashboard/employees");
        }
      })
      .catch(() => {
        toast.error("Failed to add an employee.");
      });
  };

  return (
    <div className="p-10 mt-10">
      <h1 className="text-2xl md:text-3xl text-center mb-10 font-roboto font-bold">
        Add an employee
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
              placeholder="John"
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="my-1 text-red-600">
                Name is required
              </p>
            )}
          </div>

          {/* designation  */}
          <div>
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-90"
            >
              Designation
            </label>
            <input
              type="text"
              id="role"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              defaultValue="employee"
              {...register("role")}
              readOnly
            />
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
              placeholder="Enter registration id"
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
              placeholder="Enter password"
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
          value="Add Employee"
          className="text-white cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        />
      </form>
    </div>
  );
};

export default AddEmployee;
