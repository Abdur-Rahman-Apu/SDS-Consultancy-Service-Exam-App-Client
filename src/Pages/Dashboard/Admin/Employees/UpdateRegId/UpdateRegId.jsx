import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateRegId = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //   update registration id
  const handleUpdateRegId = (event) => {
    event.preventDefault();
    const newId = event.target.regId.value;

    fetch(`https://quiz-five-beta.vercel.app/updateEmployeeId?id=${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ newId }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          toast.success("Updated Successfully");
          navigate("/dashboard/employees");
        } else {
          toast.error("Failed to update");
        }
      })
      .catch(() => {
        toast.error("Server error");
      });
  };

  return (
    <div className="mt-16">
      <h1 className="text-center font-bold font-roboto text-2xl md:text-3xl">
        Update Employees Registration ID
      </h1>

      {/* form  */}
      <form className="w-[60%] mx-auto my-10" onSubmit={handleUpdateRegId}>
        <div>
          <label
            htmlFor="id"
            className="block mb-2 text-base md:text-lg font-bold font-roboto text-gray-900 dark:text-white"
          >
            New Id
          </label>
          <input
            type="text"
            id="id"
            name="regId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
            placeholder="Enter new registration id"
            required
          />
        </div>

        <div>
          <input
            type="submit"
            className="mt-6 block mx-auto text-white bg-[#3AB4BD]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateRegId;
