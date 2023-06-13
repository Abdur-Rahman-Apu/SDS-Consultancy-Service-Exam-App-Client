/* eslint-disable react/prop-types */

function ExamPageTitle({ ExamData, Logo, formatTime, timeRemaining }) {
  return (
    <div>
      {" "}
      <div className="p-5 bg-[#12bcb833] md:rounded-3xl md:mt-5">
        <div className="w-[60%] mx-auto">
          <img
            src={Logo}
            alt="logo"
            className="object-cover w-[100px] h-[100px] md:w-[150px] md:h-[150px] mx-auto"
          />
        </div>

        <div className="flex justify-between font-roboto font-semibold text-xs md:text-lg">
          <p>Course Name: {ExamData.courseName}</p>
          <p>Duration: {ExamData.examInfo.duration}</p>
          <p>Total Marks: {ExamData.examInfo.questions}</p>
        </div>

        <div className="border-2 border-[#12bcb8] rounded-full w-[55px] h-[55px] lg:w-[80px] lg:h-[80px] fixed top-40 right-0 md:right-3 lg:top-10 lg:right-10">
          <p className="absolute top-[16px] right-[6px] lg:top-[25px] lg:left-[12px] font-bold font-roboto text-sm lg:text-xl">
            {formatTime(timeRemaining)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExamPageTitle;
