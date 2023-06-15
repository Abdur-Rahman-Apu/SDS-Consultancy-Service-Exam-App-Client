import IndividualCertification from "./IndividualCertification";
import useCourses from "../../CustomHook/useCourses/useCourses";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useSpecificEmployee from "../../CustomHook/useSpecificEmployee/useSpecificEmployee";
import Loading2 from "../Loading2/Loading2";

const Certification = () => {
  const employeeInfo = JSON.parse(localStorage.getItem("Employee-Info"));
  const [courses] = useCourses();
  const [employee] = useSpecificEmployee(employeeInfo?._id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let specificCourses;

  if (courses && employeeInfo) {
    console.log("Inside");

    const employeesCourses = Object.keys(employeeInfo?.result);
    specificCourses = courses.filter(
      (course) => employeesCourses.includes(course.courseName) === true
    );

    console.log(specificCourses, "Inside specific courses");
  }

  console.log(specificCourses, "outside speciifc");
  // loader
  if (!courses) {
    return <Loading2 />;
  }

  return (
    <div className="py-10 px-[6%]">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-roboto">
          Examinations
        </h1>
        <p className="text-sm md:text-base text-gray-400 font-roboto">
          Select your exam subject
        </p>
      </div>

      {/* certifications  */}

      {specificCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-16">
          {specificCourses?.map((course) => (
            <IndividualCertification
              key={course.courseId}
              course={course}
              employee={employee}
              employeeInfo={employeeInfo}
            />
          ))}
        </div>
      ) : (
        <p className="font-roboto text-center text-2xl font-bold my-6 text-red-500">
          No courses are available right now
        </p>
      )}
    </div>
  );
};

export default Certification;
