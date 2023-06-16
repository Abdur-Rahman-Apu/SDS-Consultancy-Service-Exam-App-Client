import { useContext } from "react";
import useCourses from "../../../../../CustomHook/useCourses/useCourses";
import Loading2 from "../../../../Loading2/Loading2";
import Course from "../../../Admin/Courses/Course/Course";
import { AuthContext } from "../../../../../Context/AuthProvider";

const MarkDashboard = () => {
  // get all courses
  const [courses] = useCourses();

  const { employeeInfo } = useContext(AuthContext);

  let specificCourses;

  if (courses) {
    const employeesCourses = Object.keys(employeeInfo.result);
    specificCourses = courses.filter(
      (course) => employeesCourses.includes(course.courseName) === true
    );
  }

  // loader
  if (!courses) {
    return <Loading2 />;
  }

  return (
    <div className="mt-10">
      {/* heading  */}
      <h1 className="mt-16 text-center font-roboto font-bold text-3xl md:text-4xl">
        Courses
      </h1>

      {/* all courses displayed in the table  */}
      <div className="overflow-x-auto my-10">
        <table className={`table text-center w-[90%] mx-auto`}>
          {/* head */}
          <thead className="text-base md:text-lg text-black font-roboto font-bold bg-[#f5df4e80]">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              /* display all courses  */

              specificCourses?.map((course) => (
                <Course key={course._id} course={course} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarkDashboard;
