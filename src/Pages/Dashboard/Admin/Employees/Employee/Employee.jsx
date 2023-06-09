/* eslint-disable react/prop-types */
import { AiFillDelete } from "react-icons/ai";
import { LuEdit } from "react-icons/lu";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { Link } from "react-router-dom";

const Employee = ({ employee, handleDeleteEmployee }) => {
  return (
    <>
      <tr className="bg-[#f7f1e3]">
        <td>{employee?.name}</td>
        <td>{employee?.regId}</td>
        <td>{employee?.password}</td>
        <th className="flex flex-col md:flex-row md:justify-evenly items-center ">
          <Link
            to={`/dashboard/employees/updateEmployeeInfo/${employee?._id}`}
            className="btn bg-[#F5DF4E] btn-sm flex items-center tooltip  mb-3 md:mb-0"
            data-tip="Edit"
          >
            <LuEdit className="text-black" />
          </Link>

          <Link
            to={`/dashboard/employees/assignCourses/${employee?._id}`}
            className="btn bg-[#F5DF4E] flex items-center tooltip btn-sm  mb-3 md:mb-0"
            data-tip="assign course"
          >
            <MdAssignmentTurnedIn className="text-black" />
          </Link>

          <button
            className="btn btn-error btn-sm flex items-center tooltip"
            data-tip="Delete"
            onClick={() => handleDeleteEmployee(employee._id)}
          >
            <AiFillDelete className="text-white" />
          </button>
        </th>
      </tr>
    </>
  );
};

export default Employee;
