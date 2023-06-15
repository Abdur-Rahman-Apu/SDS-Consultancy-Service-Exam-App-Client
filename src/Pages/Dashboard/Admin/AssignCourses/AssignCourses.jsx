import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Context/AuthProvider";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AssignCourses = () => {
  const { id } = useParams();

  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: employee, refetch } = useQuery({
    queryKey: ["specificEmployee"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/onlySpecificEmployee?id=${id}`
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
    console.log(data, "Data");
    const { assignCourse } = data;
    if (assignCourse !== "Select one course") {
      console.log("NOT");
      console.log("Employee", employee);
      console.log(assignCourse);

      //   send assigned course to the database
      fetch(`http://localhost:5000/assignCourses?id=${employee?._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ assignCourse }),
      })
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
