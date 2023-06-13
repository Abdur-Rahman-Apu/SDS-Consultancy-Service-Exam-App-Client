/* eslint-disable react/prop-types */
import { AiFillDelete } from "react-icons/ai";
import { LuEdit } from "react-icons/lu";
import { Link } from "react-router-dom";

const Employee = ({ employee, handleDeleteEmployee }) => {
  return (
    <>
      <tr className="bg-[#f7f1e3]">
        <td>{employee?.name}</td>
        <td>{employee?.regId}</td>
        <td>{employee?.password}</td>
        <th className="flex flex-col md:flex-row md:justify-evenly ">
          <Link
            to={`/dashboard/employees/updateRegId/${employee?._id}`}
            className="btn btn-success btn-sm  mb-3 md:mb-0"
          >
            <LuEdit className="text-white" />
          </Link>

          <button
            className="btn btn-error btn-sm"
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
