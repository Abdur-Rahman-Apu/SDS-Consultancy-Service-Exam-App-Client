import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEmployee = () => {
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get employee info and add data into the database
  const onSubmit = (data) => {
    const {
      name,
      role,
      employee,
      regId,
      password,
      AI,
      AWS,
      Angular,
      ApacheFlink,
      ApacheKafka,
      ApacheSpark,
      BigdataHadoop,
      CCENT,
      CCIE,
      CCNA,
      CCNP,
      CCT,
      DataScience,
      Devops,
      HTML,
      Linux,
      ML,
      MicrosoftAzure,
      Oracle,
      Py,
      Salesforce,
      Scala,
    } = data;

    const courses = [
      { Artificial_Intelligence: AI },
      { AWS },
      { Angular },
      { Apache_Flink: ApacheFlink },
      { Apache_Kafka: ApacheKafka },
      { Apache_Spark: ApacheSpark },
      { Bigdata_Hadoop: BigdataHadoop },
      { CCENT },
      { CCIE },
      { CCNA },
      { CCNP },
      { CCT },
      { Data_Science: DataScience },
      { Devops },
      { HTML_CSS_JS: HTML },
      { Linux },
      { ML },
      { Microsoft_Azure: MicrosoftAzure },
      { Oracle },
      { Python: Py },
      { Salesforce },
      { Scala },
    ];

    const selectedCourses = {};

    courses.forEach((course) => {
      if (Object.values(course)[0]) {
        const key = Object.keys(course)[0];
        course[key] = [];
        selectedCourses[key] = course[key];
      }
    });

    if (Object.keys(selectedCourses).length > 0) {
      const employeeInfo = {
        name,
        role,
        employee,
        regId,
        password,
        result: selectedCourses,
      };

      fetch("https://quiz-five-beta.vercel.app/addEmployee", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(employeeInfo),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            toast.success("You added an employee successfully.");
            navigate("/dashboard/employees");
          }
        })
        .catch(() => {
          toast.error("Failed to add an employee.");
        });
    } else {
      toast.error("Please assign a course");
    }
  };

  return (
    <div className="p-10 mt-10">
      <h1 className="text-2xl md:text-3xl text-center mb-10 font-roboto font-bold">
        Add an employee
      </h1>

      {/* form  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* name  */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="John"
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="my-1 text-red-600">
                Name is required
              </p>
            )}
          </div>

          {/* designation  */}
          <div>
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-90"
            >
              Designation
            </label>
            <input
              type="text"
              id="role"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              defaultValue="employee"
              {...register("role")}
              readOnly
            />
          </div>

          {/* registration id  */}
          <div>
            <label
              htmlFor="regId"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Registration Id
            </label>
            <input
              type="text"
              id="regId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter registration id"
              {...register("regId", { required: true })}
              aria-invalid={errors.regId ? "true" : "false"}
            />
            {errors.regId?.type === "required" && (
              <p role="alert" className="my-1 text-red-600">
                Registration ID is required
              </p>
            )}
          </div>

          {/* password  */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter password"
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="my-1 text-red-600">
                Password is required
              </p>
            )}
          </div>

          {/* assign courses  */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Assign Courses <sup className="text-red-600">*</sup>
            </label>

            {/* courses  */}
            <div className="my-3 flex justify-between">
              <div>
                {/* python course */}
                <p className="flex items-center my-1">
                  <input
                    id="python"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("Py")}
                  />
                  <label
                    htmlFor="python"
                    className="font-roboto text-base ml-3"
                  >
                    Python
                  </label>
                </p>

                {/* Artificial Intelligence */}
                <p className="flex items-center my-1">
                  <input
                    id="ai"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("AI")}
                  />
                  <label htmlFor="ai" className="font-roboto text-base ml-3">
                    Artificial Intelligence
                  </label>
                </p>

                {/* CCNA */}
                <p className="flex items-center my-1">
                  <input
                    id="ccna"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("CCNA")}
                  />
                  <label htmlFor="ccna" className="font-roboto text-base ml-3">
                    CCNA
                  </label>
                </p>

                {/* CCNP  */}
                <p className="flex items-center my-1">
                  <input
                    id="ccnp"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("CCNP")}
                  />
                  <label htmlFor="ccnp" className="font-roboto text-base ml-3">
                    CCNP
                  </label>
                </p>
                {/* CCENT  */}
                <p className="flex items-center my-1">
                  <input
                    id="ccent"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("CCENT")}
                  />
                  <label htmlFor="ccent" className="font-roboto text-base ml-3">
                    CCENT
                  </label>
                </p>

                {/* CCIE  */}
                <p className="flex items-center my-1">
                  <input
                    id="ccie"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("CCIE")}
                  />
                  <label htmlFor="ccie" className="font-roboto text-base ml-3">
                    CCIE
                  </label>
                </p>

                {/* CCT  */}
                <p className="flex items-center my-1">
                  <input
                    id="cct"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("CCT")}
                  />
                  <label htmlFor="cct" className="font-roboto text-base ml-3">
                    CCT
                  </label>
                </p>

                {/* Oracle  */}
                <p className="flex items-center my-1">
                  <input
                    id="oracle"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("Oracle")}
                  />
                  <label
                    htmlFor="oracle"
                    className="font-roboto text-base ml-3"
                  >
                    Oracle
                  </label>
                </p>

                {/* Machine Learning */}
                <p className="flex items-center my-1">
                  <input
                    id="ml"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("ML")}
                  />
                  <label htmlFor="ml" className="font-roboto text-base ml-3">
                    Machine Learning
                  </label>
                </p>
                {/* Apache spark */}
                <p className="flex items-center my-1">
                  <input
                    id="as"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("ApacheSpark")}
                  />
                  <label htmlFor="as" className="font-roboto text-base ml-3">
                    Apache spark
                  </label>
                </p>
                {/* Bigdata Hadoop */}
                <p className="flex items-center my-1">
                  <input
                    id="bh"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("BigdataHadoop")}
                  />
                  <label htmlFor="bh" className="font-roboto text-base ml-3">
                    Bigdata Hadoop
                  </label>
                </p>
              </div>

              <div>
                {/* Apache Kafka */}
                <p className="flex items-center my-1">
                  <input
                    id="ak"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("ApacheKafka")}
                  />
                  <label htmlFor="ak" className="font-roboto text-base ml-3">
                    Apache Kafka
                  </label>
                </p>
                {/* HTML, CSS & JS */}
                <p className="flex items-center my-1">
                  <input
                    id="hcj"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("HTML")}
                  />
                  <label htmlFor="hcj" className="font-roboto text-base ml-3">
                    HTML, CSS & JS
                  </label>
                </p>
                {/* Scala */}
                <p className="flex items-center my-1">
                  <input
                    id="scala"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("Scala")}
                  />
                  <label htmlFor="scala" className="font-roboto text-base ml-3">
                    Scala
                  </label>
                </p>
                {/* Angular */}
                <p className="flex items-center my-1">
                  <input
                    id="angular"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("Angular")}
                  />
                  <label
                    htmlFor="angular"
                    className="font-roboto text-base ml-3"
                  >
                    Angular
                  </label>
                </p>
                {/* AWS */}
                <p className="flex items-center my-1">
                  <input
                    id="aws"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("AWS")}
                  />
                  <label htmlFor="aws" className="font-roboto text-base ml-3">
                    AWS
                  </label>
                </p>
                {/* Apache Flink */}
                <p className="flex items-center my-1">
                  <input
                    id="apache_flink"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("ApacheFlink")}
                  />
                  <label
                    htmlFor="apache_flink"
                    className="font-roboto text-base ml-3"
                  >
                    Apache Flink
                  </label>
                </p>
                {/* Devops */}
                <p className="flex items-center my-1">
                  <input
                    id="devops"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("Devops")}
                  />
                  <label
                    htmlFor="devops"
                    className="font-roboto text-base ml-3"
                  >
                    Devops
                  </label>
                </p>
                {/* Linux */}
                <p className="flex items-center my-1">
                  <input
                    id="linux"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("Linux")}
                  />
                  <label htmlFor="linux" className="font-roboto text-base ml-3">
                    Linux
                  </label>
                </p>
                {/* Salesforce */}
                <p className="flex items-center my-1">
                  <input
                    id="salesforce"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("Salesforce")}
                  />
                  <label
                    htmlFor="salesforce"
                    className="font-roboto text-base ml-3"
                  >
                    Salesforce
                  </label>
                </p>
                {/* Microsoft Azure */}
                <p className="flex items-center my-1">
                  <input
                    id="ma"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("MicrosoftAzure")}
                  />
                  <label htmlFor="ma" className="font-roboto text-base ml-3">
                    Microsoft Azure
                  </label>
                </p>
                {/* Data Science */}
                <p className="flex items-center my-1">
                  <input
                    id="data"
                    type="checkbox"
                    className="checkbox checkbox-warning w-[18px] h-[18px]"
                    {...register("DataScience")}
                  />
                  <label htmlFor="data" className="font-roboto text-base ml-3">
                    Data Science
                  </label>
                </p>
              </div>
            </div>
          </div>
        </div>

        <input
          type="submit"
          value="Add Employee"
          className="text-white cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        />
      </form>
    </div>
  );
};

export default AddEmployee;
