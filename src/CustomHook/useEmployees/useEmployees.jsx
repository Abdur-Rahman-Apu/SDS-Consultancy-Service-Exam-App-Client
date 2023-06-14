import { useEffect, useState } from "react";

const useEmployees = () => {
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    fetch("https://quiz-five-beta.vercel.app/onlyEmployees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  return [employees];
};

export default useEmployees;
