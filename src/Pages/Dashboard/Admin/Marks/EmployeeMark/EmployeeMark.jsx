import { useParams } from "react-router-dom";
import useSpecificEmployee from "../../../../../CustomHook/useSpecificEmployee/useSpecificEmployee";
import { useEffect } from "react";

const EmployeeMark = () => {
  const { id } = useParams();
  const [employee] = useSpecificEmployee(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1 className="text-center font-roboto text-2xl md:text-3xl font-bold mt-16 mb-10">
        Each course highest mark
      </h1>

      <div className="w-full md:w-[80%] mx-auto overflow-x-auto">
        <table className="table w-[100%] text-center">
          {/* head */}
          <thead className="bg-[#F5DF4E]">
            <tr className="text-base md:text-lg font-roboto font-bold text-black">
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="font-roboto text-sm md:text-base">
            {employee &&
              Object.entries(employee.result).map((item) => {
                return (
                  <>
                    <tr className="bg-[#f7f1e3]">
                      <td className="text-base font-roboto font-bold">
                        {item[0]}
                      </td>
                      <td className="text-base font-roboto font-bold">
                        {item[1].length ? (
                          item[1][0]["totalMark"]
                        ) : (
                          <p className="text-red-500">No exam is given</p>
                        )}
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeMark;
