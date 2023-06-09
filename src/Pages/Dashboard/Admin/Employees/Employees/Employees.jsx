import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Employee from "../Employee/Employee";

const Employees = () => {
  const { data: employees, refetch } = useQuery({
    queryKey: ["allEmployees"],
    queryFn: async () => {
      const response = await fetch(
        `https://quiz-five-beta.vercel.app/onlyEmployees`
      );
      return response.json();
    },
  });

  const handleDeleteEmployee = (id) => {
    console.log(id);

    fetch(`https://quiz-five-beta.vercel.app/deleteEmployee?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          toast.success("The employee is removed successfully.");
          refetch();
        }
      })
      .catch(() => {
        toast.error("Failed to delete the employee.");
      });
  };

  console.log(employees);
  return (
    <div className="md:px-16">
      <h1 className="text-center font-roboto text-2xl md:text-3xl font-bold mt-16 mb-10">
        Employees
      </h1>

      {/* show employees data as table using list  */}

      <div className="w-full overflow-x-auto">
        <table className="table w-[100%]">
          {/* head */}
          <thead className="bg-[#30b6bc4d]">
            <tr className="text-base md:text-lg font-roboto font-bold text-black">
              <th>Name</th>
              <th>Registration Id</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="font-roboto text-sm md:text-base">
            {employees?.map((employee) => (
              <Employee
                key={employee._id}
                employee={employee}
                handleDeleteEmployee={handleDeleteEmployee}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
