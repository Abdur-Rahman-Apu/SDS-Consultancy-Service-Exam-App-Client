import { useContext, useEffect, useState } from "react";
import Alert from "../../assets/Audio/alert.mp3";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useExamData from "../../CustomHook/useExamData/useExamData";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";
import Logo from "../../assets/Logo/logo.png";

const ExamPage = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [OptionStyle, setOptionStyle] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(3600 * 2); // 2 hours
  const [isTimeUp, setIsTimeUp] = useState(false);
  const { employeeInfo } = useContext(AuthContext);

  const Params = useParams();
  const PathCourseName = Params.courseName;
  // Data Fetching From Custom-Hooks
  const [ExamData] = useExamData(PathCourseName);

  const navigate = useNavigate();

  const Title = ExamData?.courseName;

  // You are Out of Exam For Screen Minimize
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "hidden") {
        // User minimized the window
        Swal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          title: "You are out of Exam",
          text: "Screen minimized, now you are outside of the exam page. Fear not! Discover your previous marked answers, hidden treasures of progress",
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Submit",
        }).then((result) => {
          AddResultToLocal();
          if (result.isConfirmed) {
            setToDatabase();
            Swal.fire({
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              html: `
							<a href="/certifications/${PathCourseName}/result" 
							 target="_blank" style='display: inline-block;
										padding: 10px 20px;
										background-color: #007bff;
										color: #fff;
										text-decoration: none;
										border-radius: 4px;
										box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
										transition: background-color 0.3s;
										font-size: 16px;
										font-weight: bold;'> Show Result
							</a>
						  `,
            });
            navigate("/certifications");
          }
        });
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [PathCourseName]);

  const handleAnswerChange = (questionId, selectedOption, option) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
    setOptionStyle(option);
    console.log(userAnswers, "user answers");
  };

  const setToDatabase = () => {
    fetch(`https://quiz-five-beta.vercel.app/certifications/${PathCourseName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        const ExamData = data;
        const GetLocalExamResult = JSON.parse(
          localStorage.getItem("ExamResult")
        );
        const MatchedResultData = GetLocalExamResult.find(
          (result) => result.Title === PathCourseName
        );

        console.log(MatchedResultData);

        const formattedExamDate = new Date(MatchedResultData.ExamDate)
          .toLocaleString()
          .split(",")[0];

        //   user's answers
        const userAnswersArray = Object.entries(
          MatchedResultData.userAnswers
        ).map(([key, value]) => ({
          SubmitQNo: key,
          SubmitAnswer: value,
        }));

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

        console.log(correctAns.length);
        //   calculation of total mark

        let totalMark =
          correctAns.length - wrongAns.length <= 0
            ? 0
            : correctAns.length - wrongAns.length;

        console.log(totalMark);

        const markSheet = {
          courseName: MatchedResultData.Title,
          examDate: formattedExamDate,
          totalMark,
        };

        console.log("Mark sheet", markSheet);

        fetch(
          `https://quiz-five-beta.vercel.app/userResult?id=${employeeInfo?._id}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(markSheet),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            if (result.acknowledged) {
              toast.success("Result added");
            } else {
              toast.success("Failed to added");
            }
          })
          .catch(() => {
            toast.error("Server error");
          });
      });
  };

  // Employee Answer Submit Function
  const handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you want to Submit?",
      text: "You won't be able to back on exam page!",
      icon: "info",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit!",
    }).then((result) => {
      if (result.isConfirmed) {
        AddResultToLocal();
        Swal.fire({
          allowOutsideClick: true,
          allowEscapeKey: true,
          showCancelButton: false,
          showConfirmButton: false,
          icon: "success",
          title: "Answer Submitted!",
          html: `
					<a href="/certifications/${PathCourseName}/result"  target="_blank"
					onClick=${setToDatabase()}
					style='display: inline-block;
								padding: 10px 20px;
								background-color: #007bff;
								color: #fff;
								text-decoration: none;
								border-radius: 4px;
								box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
								transition: background-color 0.3s;
								font-size: 16px;
								font-weight: bold;'> Show Result
					</a>`,
        });
        navigate("/certifications");
      }
    });
  };

  const AddResultToLocal = () => {
    // Add Employee Answer to Local Storage
    const data = {
      Title: PathCourseName,
      userAnswers: userAnswers,
      ExamDate: new Date().toISOString(),
    };

    console.log(data);

    const getItemData = localStorage.getItem("ExamResult");
    if (!getItemData) {
      localStorage.setItem("ExamResult", JSON.stringify([data]));

      return;
    }

    const ParseGetItemData = JSON.parse(getItemData);

    const existingIndex = ParseGetItemData.findIndex(
      (obj) => obj.Title === Title
    );
    if (existingIndex !== -1) {
      // Updating existing answer
      ParseGetItemData[existingIndex].userAnswers = userAnswers;
    } else {
      // Adding new answer
      ParseGetItemData.push(data);
    }
    localStorage.setItem("ExamResult", JSON.stringify(ParseGetItemData));

    // setToDatabase();
  };

  // Time Duration Setting
  let timer;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeRemaining]);

  // Looking If Exam Duration Finished
  useEffect(() => {
    if (timeRemaining === 0) {
      setIsTimeUp(true);
      clearTimeout(timer); // Stop the timer when time reaches 0
    }
  }, [timeRemaining, timer]);

  if (!ExamData) {
    return <Loading></Loading>;
  }
  // Exam Time Formatting
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`max-w-3xl mx-auto pb-24 font-roboto`}
      style={{ fontFamily: "Roboto Slab, serif" }}
    >
      {/*Exam Close Button  */}
      <p className="fixed bottom-10 right-10 z-40"></p>
      {/* Exam Title */}

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

        <div className="border-2 border-[#12bcb8] rounded-full w-[55px] h-[55px] lg:w-[80px] lg:h-[80px] fixed top-40 right-0 md:top-24 md:right-10">
          <p className="absolute top-[16px] right-[6px] lg:top-[25px] lg:left-[12px] font-bold font-roboto text-sm lg:text-xl">
            {formatTime(timeRemaining)}
          </p>
        </div>
      </div>

      {/* Exam Body */}
      {/* Questions Json File Mapping */}
      {ExamData.questionPaper.map((Question) => {
        const { questionNo, question, options } = Question;
        return (
          <div key={questionNo} className="mt-24 " id={questionNo}>
            <div className="my-10 bg-gray-100 shadow-xl px-10 py-5 rounded-lg">
              <p className="text-base md:text-lg  text-white bg-black inline-block rounded p-1">
                Question-{questionNo}
              </p>
              <h3 className="my-5 font-bold font-roboto font-IBM text-lg md:text-xl">
                {question}
              </h3>

              {/*Question's Options Mapping */}
              <div className="space-y-5">
                {options.map((Option) => {
                  const { id, option } = Option;
                  return (
                    <p
                      key={option}
                      onClick={() => handleAnswerChange(questionNo, id, option)}
                      className={`p-4  rounded-md flex items-center cursor-pointer ${
                        userAnswers[questionNo] === id
                          ? "bg-[#1dd1a180] text-white"
                          : "border bg-gray-50 border-gray-300"
                      } 
														${OptionStyle === option ? "font-extrabold" : "font-normal"}`}
                    >
                      <span className="pt-1 md:pt-2 text-center rounded-full w-[35px] h-[35px] md:w-[40px] md:h-[40px] bg-[#1dd1a1] text-white">
                        {id}
                      </span>
                      <span className={`pl-3 text-black`}>{option}</span>
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      {/* Question Submit Button */}
      <button
        onClick={handleSubmit}
        className="btn bg-[#1dd1a1]  text-base font-roboto rounded-full font-semibold py-2 px-4 block w-fit mx-auto"
      >
        {" "}
        Submit Answers{" "}
      </button>

      {/* Exam Time Over Audio */}
      {isTimeUp && (
        <audio autoPlay>
          <source src={Alert} type="audio/mpeg" />
        </audio>
      )}

      {/* Exam Time Over Screen Close */}
      {isTimeUp &&
        Swal.fire({
          title: "Exam Time Over!",
          text: "Please, Submit Your Answer!",
          icon: "success",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Submit!",
        }).then((result) => {
          if (result.isConfirmed) {
            AddResultToLocal();
            Swal.fire({
              allowOutsideClick: true,
              allowEscapeKey: true,
              showCancelButton: false,
              showConfirmButton: false,
              icon: "success",
              title: "Your work has been saved",
              html: `
					<a href="/certifications/${PathCourseName}/result" target="_blank" 
					onClick=${setToDatabase()} style='display: inline-block;
								padding: 10px 20px;
								background-color: #007bff;
								color: #fff;
								text-decoration: none;
								border-radius: 4px;
								box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
								transition: background-color 0.3s;
								font-size: 16px;
								font-weight: bold;'> Show Result
					</a>`,
            });
            navigate("/certifications");
          }
        })}
      {/* Question Scrolling Button */}
      <div className="hidden lg:block fixed top-56 right-1 sm:right-5 md:top-60 md:right-14 space-y-3">
        {ExamData.questionPaper.map((question, index) => {
          if (index % 10 === 0) {
            return (
              <div key={index + 1}>
                <a
                  href={`#${index + 1}`}
                  className="btn bg-green-200 btn-sm border-none w-[25px] h-[25px] md:w-[40px] md:h-[40px] rounded-full"
                >
                  {index + 1}
                </a>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ExamPage;
