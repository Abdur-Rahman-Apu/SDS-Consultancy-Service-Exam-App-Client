import { useParams } from "react-router-dom";
import useSpecificEmployee from "../../../../../CustomHook/useSpecificEmployee/useSpecificEmployee";

const EmployeeMark = () => {
  const { id } = useParams();
  console.log(id);
  const [employee] = useSpecificEmployee(id);
  console.log(employee, "employee");
  return (
    <div>
      <h1 className="text-center font-roboto text-2xl md:text-3xl font-bold mt-16 mb-10">
        Each course highest mark
      </h1>

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
            {employee &&
              Object.entries(employee.result).map((item, index) => {
                console.log(item);
                return (
                  <>
                    <tr className="bg-[#f7f1e3]">
                      <td>{item[0]}</td>
                      <td>{item[1].length ? item[1] : 0}</td>
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
