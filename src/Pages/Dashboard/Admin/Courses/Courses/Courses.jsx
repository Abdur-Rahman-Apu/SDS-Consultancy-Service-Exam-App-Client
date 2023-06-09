import useCourses from "../../../../../CustomHook/useCourses/useCourses";
import Course from "../Course/Course";
import style from "./Courses.module.css";

const Courses = () => {
  // get all courses
  const [courses] = useCourses();

  return (
    <div className="mt-10">
      {/* heading  */}
      <h1 className="mt-16 text-center font-roboto font-bold text-3xl md:text-4xl">
        Courses
      </h1>

      {/* all courses displayed in the table  */}
      <div className="overflow-x-auto my-10">
        <table
          className={`table text-center w-[90%] mx-auto ${style.tablePoint}`}
        >
          {/* head */}
          <thead className="text-base md:text-lg text-black font-roboto font-bold bg-[#706fd333]">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              /* display all courses  */

              courses?.map((course) => (
                <Course key={course._id} course={course} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
