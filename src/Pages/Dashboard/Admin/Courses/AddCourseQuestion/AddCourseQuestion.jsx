const AddCourseQuestion = () => {
  return (
    <div>
      <h1 className="text-4xl font-roboto font-bold text-center mt-16">
        Add New Questions & Answers
      </h1>

      {/* upload a json file  */}

      <form className="  mt-16 w-[50%] mx-auto">
        <label
          className="block mb-2 text-lg font-bold font-roboto text-gray-900"
          htmlFor="file_input"
        >
          Upload a JSON file
        </label>
        <input
          type="file"
          className="file-input file-input-bordered  w-full max-w-xs"
        />

        <input
          type="submit"
          value="Upload the file"
          className="px-[8px] py-[10px] font-roboto font-bold rounded-lg text-white ml-5"
        />
      </form>
    </div>
  );
};

export default AddCourseQuestion;
