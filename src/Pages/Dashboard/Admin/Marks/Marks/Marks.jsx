import React from "react";
import useEmployees from "../../../../../CustomHook/useEmployees/useEmployees";
import AllEmployees from "../AllEmployess/AllEmployees";

const Marks = () => {
  const [employees] = useEmployees();
  return (
    <div>
      <h1 className="text-2xl md:text-3xl text-center mt-16 mb-10 font-roboto font-bold">
        Employees Marks
      </h1>

      {/* show employees  */}
      <div className="w-full md:w-[80%] mx-auto overflow-x-auto">
        <table className="table w-[100%] text-center">
          {/* head */}
          <thead className="bg-[#30b6bc4d]">
            <tr className="text-base md:text-lg font-roboto font-bold text-black">
              <th>Name</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody className="font-roboto text-sm md:text-base">
            {employees?.map((employee) => (
              <AllEmployees key={employee._id} employee={employee} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marks;
