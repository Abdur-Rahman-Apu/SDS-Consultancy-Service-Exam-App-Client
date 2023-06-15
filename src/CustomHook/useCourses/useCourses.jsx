import { useEffect, useState } from "react";

const useCourses = () => {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    fetch("https://quiz-five-beta.vercel.app/certifications")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return [courses];
};

export default useCourses;
