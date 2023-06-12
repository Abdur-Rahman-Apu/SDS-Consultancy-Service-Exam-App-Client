import { useEffect, useState } from "react";

const useSpecificEmployee = (id) => {
  console.log(id);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/onlySpecificEmployee?id=${id}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data));
  }, [id]);

  return [employee];
};

export default useSpecificEmployee;
