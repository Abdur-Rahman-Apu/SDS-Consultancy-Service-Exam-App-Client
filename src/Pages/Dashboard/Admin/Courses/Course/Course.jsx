/* eslint-disable react/prop-types */

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../Context/AuthProvider";

const Course = ({ course }) => {
  const { employeeInfo } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <tr className="font-roboto">
      <td>
        <div className="flex justify-center items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-10 h-10 md:w-12 md:h-12">
              <img
                src={course?.courseImg}
                alt="course image"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </td>
      <td className="text-sm font-roboto font-bold md:text-base">
        {course?.courseName}
      </td>

      {employeeInfo?.role === "admin" ? (
        <th>
          <Link
            to={`/dashboard/addQuestion/${course?.courseName}`}
            className="btn btn-warning btn-xs"
          >
            Add Questions
          </Link>
        </th>
      ) : (
        <th>
          <Link
            to={`/dashboard/result/seeMark/${course?.courseName}`}
            className="btn btn-warning btn-xs mb-3 md:mr-3"
          >
            See Mark
          </Link>
        </th>
      )}
    </tr>
  );
};

export default Course;
