import { useEffect, useState } from "react";

const useCourses = () => {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/certifications")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return [courses];
};

export default useCourses;
