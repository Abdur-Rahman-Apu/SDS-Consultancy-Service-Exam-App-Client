/* eslint-disable react/prop-types */

function ExamPageTitle({ ExamData, Logo, formatTime, timeRemaining }) {
  return (
    <>
      {" "}
      <div className="p-5 border-2 border-black  md:rounded-3xl md:mt-5">
        <div className="w-[100%] mx-auto">
          <img
            src={Logo}
            alt="logo"
            className="object-contain w-[100%] mb-5 h-[150px] mx-auto"
          />
        </div>

        <div className="flex justify-between font-roboto font-semibold text-xs md:text-lg">
          <p>Course Name: {ExamData.courseName}</p>
          <p>Duration: {ExamData.examInfo.duration}</p>
          <p>Total Marks: {ExamData.examInfo.questions}</p>
        </div>
      </div>
      <div className="fixed border-2 border-black rounded-full w-[55px] h-[55px] lg:w-[80px] lg:h-[80px] right-0 md:right-3 lg:top-10 lg:right-10">
        <p className="absolute top-[16px] right-[6px] lg:top-[25px] lg:left-[12px] font-bold font-roboto text-sm lg:text-xl">
          {formatTime(timeRemaining)}
        </p>
      </div>
    </>
  );
}

export default ExamPageTitle;
