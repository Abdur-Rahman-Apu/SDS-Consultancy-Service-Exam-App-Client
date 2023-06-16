import { BsFillPeopleFill, BsBookHalf } from "react-icons/bs";
import style from "./AdminDashboard.module.css";
import useEmployees from "../../../../CustomHook/useEmployees/useEmployees";
import useCourses from "../../../../CustomHook/useCourses/useCourses";
import { useEffect } from "react";

const AdminDashboard = () => {
  const [employees] = useEmployees();
  const [courses] = useCourses();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col items-center  md:flex-row justify-evenly">
      {/* card 1  */}
      <div className="card w-64 bg-base-100 shadow-xl mb-10 md:mb-0">
        <div className="card-body flex flex-col items-center">
          <div className={`bg-[#80D8D3] w-fit p-3 rounded-[50%] ${style.box1}`}>
            <BsFillPeopleFill className=" text-xl text-white" />
          </div>
          <p className="font-roboto font-semibold">Total Employees</p>
          <h2 className="card-title">{employees?.length}</h2>
        </div>
      </div>

      {/* card 2 */}
      <div className="card w-64 bg-base-100 shadow-xl">
        <div className="card-body flex flex-col items-center">
          <div className={`bg-[#7CA3DD] w-fit p-3 rounded-[50%] ${style.box2}`}>
            <BsBookHalf className=" text-xl text-white" />
          </div>
          <p className="font-roboto font-semibold">Total Courses</p>
          <h2 className="card-title">{courses?.length}</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
