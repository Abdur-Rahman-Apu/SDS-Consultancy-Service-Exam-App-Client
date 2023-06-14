import { useEffect, useState } from "react";

const useEmployees = () => {
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/onlyEmployees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  return [employees];
};

export default useEmployees;
