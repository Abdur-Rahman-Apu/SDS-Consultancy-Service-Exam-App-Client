import { useQuery } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AssignCourses = () => {
  const { id } = useParams();

  const {
    register,

    handleSubmit,
  } = useForm();

  const { data: employee, refetch } = useQuery({
    queryKey: ["specificEmployee"],
    queryFn: async () => {
      const response = await fetch(
        `https://quiz-five-beta.vercel.app/onlySpecificEmployee?id=${id}`
      );
      return response.json();
    },
  });

  const courses = [
    "Artificial_Intelligence",
    "AWS",
    "Angular",
    "Apache_Flink",
    "Apache_Kafka",
    "Apache_Spark",
    "Bigdata_Hadoop",
    "CCENT",
    "CCIE",
    "CCNA",
    "CCNP",
    "CCT",
    "Data_Science",
    "Devops",
    "HTML_CSS_JS",
    "Linux",
    "ML",
    "Microsoft_Azure",
    "Oracle",
    "Python",
    "Salesforce",
    "Scala",
  ];

  let remainingCourses;

  if (employee) {
    const existingCourses = Object.keys(employee.result);

    const newCourses = courses.filter(
      (course) => !existingCourses.includes(course)
    );

    remainingCourses = newCourses;
  }

  const onSubmit = (data) => {
    const { assignCourse } = data;
    if (assignCourse !== "Select one course") {
      //   send assigned course to the database
      fetch(
        `https://quiz-five-beta.vercel.app/assignCourses?id=${employee?._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ assignCourse }),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            toast.success("Course assigned successfully");
            refetch();
          } else {
            toast.error("Failed to assign course");
          }
        })
        .catch(() => {
          toast.error("Server failed");
        });
    } else {
      toast.error("Select one course");
    }
  };
  return (
    <div>
      <h1 className="text-center font-roboto text-2xl md:text-3xl font-bold mt-16 mb-10">
        Assign New Courses
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <select
          className="select select-info w-full max-w-xs"
          {...register("assignCourse")}
        >
          <option>Select one course</option>
          {remainingCourses &&
            remainingCourses.map((course, index) => (
              <option key={index}>{course}</option>
            ))}
        </select>

        <input
          type="submit"
          value="Add"
          className="text-white cursor-pointer mt-6 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        />
      </form>
    </div>
  );
};

export default AssignCourses;
