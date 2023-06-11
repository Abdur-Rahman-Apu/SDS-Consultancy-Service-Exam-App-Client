import { useEffect, useState } from "react";
import Alert from "../../assets/Audio/alert.mp3";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useExamData from "../../CustomHook/useExamData/useExamData";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

const ExamPage = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [OptionStyle, setOptionStyle] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(300); // 2 hours
  const [isTimeUp, setIsTimeUp] = useState(false);

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
            Swal.fire({
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              html: `
							<a href="/certifications/${PathCourseName}/result" target="_blank" style='display: inline-block;
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
  }, []);

  const handleAnswerChange = (questionId, selectedOption, option) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
    setOptionStyle(option);
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
					<a href="/certifications/${PathCourseName}/result" target="_blank" style='display: inline-block;
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

  const setToDatabase = () => {
    const GetLocalExamResult = JSON.parse(localStorage.getItem("ExamResult"));
    const MatchedResultData = GetLocalExamResult.find(
      (result) => result.Title === PathCourseName
    );

    console.log(MatchedResultData);

    const formattedExamDate = new Date(MatchedResultData.ExamDate)
      .toLocaleString()
      .split(",")[0];

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

    fetch(`http://localhost:5000/userResult?id=${employeeInfo._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(markSheet),
    })
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
  };
  const AddResultToLocal = () => {
    // Add Employee Answer to Local Storage
    const data = {
      Title,
      userAnswers: userAnswers,
      ExamDate: new Date().toISOString(),
    };

    const getItemData = localStorage.getItem("ExamResult");
    if (!getItemData) {
      localStorage.setItem("ExamResult", JSON.stringify([data]));
      console.log("Hello");

      //   setToDatabase();
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
  // Exam Time Formating
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`max-w-3xl mx-auto pb-24 font-Roboto`}
      style={{ fontFamily: "Roboto Slab, serif" }}
    >
      {/*Exam Close Button  */}
      <p className="fixed bottom-10 right-10 z-40"></p>
      {/* Exam Title */}
      <div className="fixed top-0 inset-0 flex justify-around items-center h-10 bg-gray-500 py-10 text-white">
        <h2>Course Name: {ExamData.courseName}</h2>
        <h2>Exam Duration: {ExamData.examInfo.duration}</h2>
        <h2>Time Remaining: {formatTime(timeRemaining)}</h2>
      </div>

      {/* Exam Body */}
      {/* Questions Json File Mapping */}
      {ExamData.questionPaper.map((Question) => {
        const { questionNo, question, options } = Question;
        return (
          <div key={questionNo} className="mt-24" id={questionNo}>
            <div className="my-10 bg-gray-100 shadow-xl px-10 py-5 rounded-lg">
              <p className="text-white bg-gray-600 inline-block rounded p-1">
                Question-{questionNo}
              </p>
              <h3 className="my-5 font-bold font-IBM md:text-lg">{question}</h3>

              {/*Question's Options Mapping */}
              <div className="space-y-5">
                {options.map((Option) => {
                  const { id, option } = Option;
                  return (
                    <p
                      key={option}
                      onClick={() => handleAnswerChange(questionNo, id, option)}
                      className={`p-4 rounded-md flex items-center cursor-pointer ${
                        userAnswers[questionNo] === id
                          ? "bg-green-600 text-white"
                          : "border bg-gray-50 border-gray-300"
                      } 
														${OptionStyle === option ? "font-extrabold" : "font-normal"}`}
                    >
                      <span className="p-3 py-1 rounded-md bg-green-600 text-white">
                        {id}
                      </span>
                      <span className={`pl-3`}>{option}</span>
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
        className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
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
					<a href="/certifications/${PathCourseName}/result" target="_blank" style='display: inline-block;
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
      <div className="fixed top-24 right-1 sm:right-5 md:right-10 space-y-3">
        {ExamData.questionPaper.map((question, index) => {
          if (index % 10 === 0) {
            return (
              <div key={index + 1}>
                <a
                  href={`#${index + 1}`}
                  className="btn bg-green-200 btn-sm border-none"
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
