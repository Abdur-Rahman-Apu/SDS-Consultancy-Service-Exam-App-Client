import { useEffect, useState } from "react";
import IndividualCertification from "./IndividualCertification";

const Certification = () => {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/certifications")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="py-10 px-[6%]">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-roboto">
          Certifications
        </h1>
        <p className="text-sm md:text-base text-gray-400 font-roboto">
          Select your exam subject
        </p>
      </div>

      {/* certifications  */}

      {courses ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-16">
          {courses?.map((course) => (
            <IndividualCertification key={course.courseId} course={course} />
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
