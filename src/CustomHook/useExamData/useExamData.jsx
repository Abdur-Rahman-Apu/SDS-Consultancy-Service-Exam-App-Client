import { useEffect } from "react";
import { useState } from "react";

const useExamData = (pathCourseName) => {
  const [ExamData, setExamData] = useState(null);
  const [RandomExamData,setRandomExamData]=useState(null)

  console.log(pathCourseName, "PathCousreName From UseExamData");

  useEffect(() => {
    fetch(`https://quiz-five-beta.vercel.app/certifications/${pathCourseName}`)
      .then((res) => res.json())
      .then((data) => {
        setRandomExamData([...data.questionPaper].sort(() => 0.5 - Math.random()));
        setExamData(data)})
      .catch((err) => {
        console.log(err);
      });

  }, [pathCourseName]);

  return [ExamData,RandomExamData];
};

export default useExamData;
