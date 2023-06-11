import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../../Context/AuthProvider";

const EachCourseResult = () => {
  const { courseName } = useParams();
  const { employeeInfo } = useContext(AuthContext);
  console.log(courseName);
  console.log(employeeInfo);

  return (
    <div className="my-16">
      <h1 className="text-2xl md:text-3xl text-center font-bold font-roboto">
        {courseName} Certification Mark Dashboard
      </h1>

      {/* Mark displayed in the table  */}
      <div className="overflow-x-auto my-10">
        <table className={`table text-center w-[90%] mx-auto`}>
          {/* head */}
          <thead className="text-base md:text-lg text-black font-roboto font-bold bg-[#706fd333]">
            <tr>
              <th>Date</th>
              <th>Mark</th>
            </tr>
          </thead>
          <tbody>
            {
              /* display all courses  */
              //   courses?.map((course) => (
              //     <Course key={course._id} course={course} />
              //   ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EachCourseResult;
