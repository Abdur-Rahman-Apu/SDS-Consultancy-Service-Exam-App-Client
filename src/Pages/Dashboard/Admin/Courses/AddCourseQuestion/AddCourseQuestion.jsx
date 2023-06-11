import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourseQuestion = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { courseName } = useParams();

  // Read JSON file and insert into the database
  const onSubmit = (data) => {
    console.log(data);

    const jsonFile = data.file[0];

    console.log(jsonFile);

    new Response(jsonFile).json().then(
      (data) => {
        // convert into json
        const strings = data.map((o) => JSON.stringify(o));

        // send data into the database
        fetch(
          `https://quiz-five-beta.vercel.app/addQuestion?courseName=${courseName}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(strings),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            if (result.acknowledged) {
              toast.success("Question added successfully");
            }
          })
          .catch(() => {
            toast.error("Failed to add question");
          });
      },
      (err) => {
        console.log(err);
        toast.error("Please upload a JSON file");
      }
    );
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-roboto font-bold text-center mt-20">
        Add New Questions & Answers
      </h1>

      {/* upload a json file  */}

      <form
        className="mt-16 mx-5 flex justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mr-3">
          <label
            className="block mb-2 text-base md:text-lg font-bold font-roboto text-gray-900"
            htmlFor="file_input"
          >
            Upload a JSON file
          </label>
          <input
            type="file"
            className="file-input file-input-bordered  w-full max-w-xs"
            {...register("file", { required: true })}
            aria-invalid={errors.file ? "true" : "false"}
          />
        </div>

        <input
          type="submit"
          value="Upload the file"
          className=" mt-10 px-[8px] py-[10px] font-roboto font-bold rounded-lg text-white cursor-pointer"
        />
      </form>

      {errors.file?.type === "required" && (
        <p
          role="alert"
          className="text-center text-red-500 font-roboto font-bold text-sm mt-2"
        >
          JSON file is required
        </p>
      )}
    </div>
  );
};

export default AddCourseQuestion;
