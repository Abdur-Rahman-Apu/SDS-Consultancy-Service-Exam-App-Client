import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../../Context/AuthProvider";
import useSpecificEmployee from "../../../../../CustomHook/useSpecificEmployee/useSpecificEmployee";
import ShowResult from "./ShowResult";

const EachCourseResult = () => {
  const { courseName } = useParams();
  const { employeeInfo } = useContext(AuthContext);
  console.log(courseName);
  console.log(employeeInfo);

  const [employee] = useSpecificEmployee(employeeInfo?._id);

  console.log(employee, "employee");

  const allResult = employee?.result[`${courseName}`];

  return (
    <div className="my-16">
      <h1 className="text-2xl md:text-3xl text-center font-bold font-roboto">
        {courseName} Certification Mark Dashboard
      </h1>

      {/* Mark displayed in the table  */}
      <div className="overflow-x-auto my-10">
        <table className={`table text-center w-[90%] mx-auto`}>
          {/* head */}
          <thead className=" text-lg md:text-xl text-black font-roboto font-bold bg-[#f9ca24]">
            <tr>
              <th>Date</th>
              <th>Mark</th>
            </tr>
          </thead>
          <tbody className="bg-[#badc5866]">
            {
              /* display all result  */
              allResult?.map((result, index) => (
                <ShowResult key={index} result={result} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EachCourseResult;
