import { useContext, useEffect } from "react";
import Chart from "react-apexcharts";
import { AuthContext } from "../../../../Context/AuthProvider";
import useSpecificEmployee from "../../../../CustomHook/useSpecificEmployee/useSpecificEmployee";

const EmployeeDashboard = () => {
  const { employeeInfo } = useContext(AuthContext);
  const [employee] = useSpecificEmployee(employeeInfo?._id);
  const resultOfEmployee = employee?.result;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // calculate highest mark of each course
  const courseHighestMark = [];
  resultOfEmployee &&
    Object.values(resultOfEmployee).forEach((givenExam) => {
      if (givenExam.length) {
        let max = 0;
        givenExam.forEach((exam) => {
          if (exam.totalMark > max) {
            max = exam.totalMark;
          }
        });
        courseHighestMark.push(max);
      } else {
        courseHighestMark.push(0);
      }
    });

  return (
    <div className=" md:w-[60%] md:mx-auto mt-16">
      <div className="overflow-hidden">
        {employee && (
          <Chart
            options={{
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: [...Object.keys(resultOfEmployee)],
              },
              colors: ["#F5DF4E"],
              dataLabels: {
                style: {
                  colors: ["#000"],
                },
              },
            }}
            series={[
              {
                name: "series-1",
                data: [...courseHighestMark],
              },
            ]}
            type="bar"
          />
        )}
      </div>

      <h1 className="text-center font-roboto font-bold text-lg md:text-xl capitalize">
        Highest mark of each course
      </h1>
    </div>
  );
};

export default EmployeeDashboard;
