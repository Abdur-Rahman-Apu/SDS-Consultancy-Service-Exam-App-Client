import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../../Context/AuthProvider";
import useSpecificEmployee from "../../../../../CustomHook/useSpecificEmployee/useSpecificEmployee";
import ShowResult from "./ShowResult";
import Loading2 from "../../../../Loading2/Loading2";

const EachCourseResult = () => {
  const { courseName } = useParams();
  const { employeeInfo } = useContext(AuthContext);
  const [employee] = useSpecificEmployee(employeeInfo?._id);
  const allResult = employee?.result[`${courseName}`];

  // loader
  if (!allResult) {
    return <Loading2 />;
  }

  return (
    <div className="my-16">
      <h1 className="text-2xl md:text-3xl text-center font-bold font-roboto">
        {courseName} Certification Mark Dashboard
      </h1>

      {/* Mark displayed in the table  */}
      {allResult?.length ? (
        <div className="overflow-x-auto my-10">
          <table className={`table text-center w-[90%] mx-auto`}>
            {/* head */}
            <thead className=" text-lg md:text-xl text-black font-roboto font-bold bg-[#F5DF4E]">
              <tr>
                <th>
                  <p>Date</p>
                  <p className="text-sm">(MM-DD-YYYY)</p>
                </th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody className="bg-[#f7f1e3]">
              {
                /* display all result  */
                allResult?.map((result, index) => (
                  <ShowResult key={index} result={result} />
                ))
              }
            </tbody>
          </table>
        </div>
      ) : (
        <p className="font-roboto mt-24 text-center text-2xl font-bold text-red-600">{`You didn't attend any exam`}</p>
      )}
    </div>
  );
};

export default EachCourseResult;
