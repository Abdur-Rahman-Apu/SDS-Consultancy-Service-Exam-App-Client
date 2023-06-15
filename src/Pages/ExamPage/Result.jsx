import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import useExamData from "../../CustomHook/useExamData/useExamData";
import PassImg from "../../assets/Result/pass.jpg";
import FailImg from "../../assets/Result/fail.jpg";

const Result = () => {
  const Params = useParams();
  const PathCourseName = Params.courseName;
  const [ExamData] = useExamData(PathCourseName);

  let totalMark;

  const GetLocalExamResult = JSON.parse(localStorage.getItem("ExamResult"));
  const MatchedResultData = GetLocalExamResult.find(
    (result) => result.Title === PathCourseName
  );

  const formattedExamDate = new Date(MatchedResultData.ExamDate)
    .toLocaleString()
    .split(",")[0];

  if (!ExamData) {
    return <Loading></Loading>;
  }

  //   user's answers
  const userAnswersArray = Object.entries(MatchedResultData.userAnswers).map(
    ([key, value]) => ({
      SubmitQNo: key,
      SubmitAnswer: value,
    })
  );

  //   all questions correct answer
  const AnswerArray = ExamData.questionPaper.map((questions) => ({
    questionNo: questions.questionNo,
    answer: questions.answer,
  }));

  let correctAns = [];
  let wrongAns = [];

  AnswerArray.forEach((originalAns) => {
    userAnswersArray.forEach((userAns) => {
      if (userAns.SubmitQNo == originalAns.questionNo) {
        if (userAns.SubmitAnswer == originalAns.answer) {
          correctAns.push(userAns);
        } else if (userAns.SubmitAnswer != originalAns.answer) {
          wrongAns.push(userAns);
        }
      }
    });
  });

  //   calculation of total mark

  totalMark =
    correctAns.length - wrongAns.length <= 0
      ? 0
      : correctAns.length - wrongAns.length;

  const IntigratedArray = ExamData.questionPaper.map((question) => {
    const MatchedResult = userAnswersArray.find((obj) => {
      return obj.SubmitQNo == question.questionNo;
    });
    if (MatchedResult) {
      return { ...question, Submitted: { ...MatchedResult } };
    }
    return question;
  });

  return (
    <div
      className="mt-4 px-4 sm:px-6 md:px-10 max-w-5xl mx-auto"
      style={{ fontFamily: "Roboto Slab, serif" }}
    >
      {/* Exam Title */}
      <div className="  text-lg sm:text-sm items-center rounded-3xl px-4 font-roboto font-bold md:text-xl min-h-[450px]  border-2 border-[#000] py-8 mt-10 ">
        <h1 className="text-3xl md:text-4xl text-center">
          Your <span className="text-[#F5DF4E]">Result</span>
        </h1>
        <div className="flex flex-col md:flex-row justify-evenly items-center  mt-8">
          <div className="mt-7 text-center md:text-start">
            <p>Course Name: {MatchedResultData.Title}</p>
            <p className="my-4">Exam Date: {formattedExamDate}</p>
            <p className="my-4">Correct: {correctAns.length}</p>
            <p className="my-4">Wrong: {wrongAns.length}</p>
            <p className="my-4">Total Mark: {totalMark}</p>

            <p>
              Result:{" "}
              <span
                className={`${
                  totalMark >= 80 ? "text-green-500" : "text-red-500"
                }`}
              >
                {totalMark >= 80 ? "Pass" : "Fail"}
              </span>
            </p>
          </div>
          <div className="w-[250px]  md:w-[300px] ">
            <img src={totalMark >= 80 ? PassImg : FailImg} alt="image" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-roboto font-bold my-10">
        Check Answers
      </h1>

      <div className="card p-2 md:p-4 font-roboto font-bold">
        {/* Color Checkup */}

        <div className="flex items-center">
          <span className="bg-green-600 badge badge-outline border-none"></span>
          <p className="ml-4">Your Answer is correct</p>
        </div>
        <div className="flex items-center my-3">
          <span className="bg-red-600 badge badge-outline border-none"></span>
          <p className="ml-4">Your Answer is wrong</p>
        </div>
        <div className="flex items-center">
          <span className="bg-sky-600 badge badge-outline border-none"></span>
          <p className="ml-4">Original Answer</p>
        </div>
      </div>
      {IntigratedArray.map((Question) => {
        const {
          questionNo,
          question,
          options,
          answer,
          Submitted: { SubmitAnswer } = {},
        } = Question;

        return (
          <div key={questionNo} className="mt-16" id={questionNo}>
            <div className="my-10 bg-gray-100 shadow-xl px-10 py-5 rounded-lg">
              <p className="text-base md:text-lg  text-white bg-black inline-block rounded p-1">
                Question-{questionNo}
              </p>
              <h3 className="my-5 font-bold font-roboto font-IBM text-lg md:text-xl">
                {question}
              </h3>

              {/*Question's Options Mapping */}
              <div className="space-y-5">
                {options?.map((Option) => {
                  const { id, option } = Option;
                  return (
                    <p
                      className={`p-4 rounded-md flex items-center
												 ${
                           id === SubmitAnswer
                             ? SubmitAnswer === answer
                               ? "bg-green-300 font-bold"
                               : "bg-red-300 font-bold"
                             : id === answer
                             ? "bg-sky-300 font-bold"
                             : ""
                         }`}
                      key={option}
                    >
                      <span
                        className={`p-3 py-1 rounded-md bg-green-600 
													 ${
                             id === SubmitAnswer
                               ? SubmitAnswer === answer
                                 ? "bg-green-600"
                                 : "bg-red-600"
                               : id === answer
                               ? "bg-sky-600"
                               : ""
                           }`}
                      >
                        {id}
                      </span>
                      <p className="pl-3">{option}</p>
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Result;
