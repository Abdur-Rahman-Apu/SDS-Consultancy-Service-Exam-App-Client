/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const AllEmployees = ({ employee }) => {
  return (
    <>
      <tr className="bg-[#f7f1e3]">
        <td>{employee?.name}</td>

        <th className="flex flex-col md:flex-row md:justify-evenly items-center ">
          <Link
            to={`/dashboard/employeeMarks/${employee?._id}`}
            className="btn btn-success btn-xs flex items-center  mb-3 md:mb-0"
          >
            {" "}
            See Marks
          </Link>
        </th>
      </tr>
    </>
  );
};

export default AllEmployees;
