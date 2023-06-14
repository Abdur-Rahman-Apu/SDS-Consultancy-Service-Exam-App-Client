import { useContext, useEffect, useState } from "react";
import Alert from "../../assets/Audio/alert.mp3";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useExamData from "../../CustomHook/useExamData/useExamData";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";
import Logo from "../../assets/Logo/logo.png";
import ExamPageTitle from "./ExamPageTitle";

const ExamPage = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [OptionStyle, setOptionStyle] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(3600 * 2); // 2 hours
  const [isTimeUp, setIsTimeUp] = useState(false);
  const { employeeInfo } = useContext(AuthContext);
  const d = new Date();

  const Params = useParams();
  const navigate = useNavigate();
  const PathCourseName = Params.courseName;

  // Data Fetching From Custom-Hooks
  const [ExamData, RandomExamData] = useExamData(PathCourseName);
  const Title = ExamData?.courseName;

  // set user answers at localStorage
  localStorage.setItem(
    "TempSubmittedData",
    JSON.stringify({ Title: PathCourseName, userAnswers })
  );

  // Show confirm page before Reload the website
  useEffect(() => {
    const unloadCallback = (event) => {
      const e = event || window.event;

      e.preventDefault();
      if (e) {
        e.returnValue = "";
      }
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
    };
  }, []);

  // You are out of Exam For Screen Minimize
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
          const SumbitData = JSON.parse(
            localStorage.getItem("TempSubmittedData")
          );

          if (SumbitData) {
            AddResultToLocal(SumbitData.userAnswers, SumbitData.Title);
          }
          if (result.isConfirmed) {
            setToDatabase();
            Swal.fire({
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              html: `<a href="/certifications/${PathCourseName}/result" 
							 target="_blank" style='display: inline-block;padding: 10px 20px;background-color: #007bff; color: #fff;text-decoration: none;border-radius: 4px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);transition: background-color 0.3s;font-size: 16px;font-weight: bold;'> Show Result</a>`,
            });
            delete localStorage.TempSubmittedData;
            navigate("/");
          }
        });
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Exam Time Over
  const handleAnswerChange = (questionId, selectedOption, option) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
    setOptionStyle(option);
  };

  // send user answers to the database
  const setToDatabase = () => {
    fetch(`http://localhost:5000/certifications/${PathCourseName}`)
      .then((res) => res.json())
      .then((data) => {
        const ExamData = data;
        const GetLocalExamResult = JSON.parse(
          localStorage.getItem("ExamResult")
        );
        const MatchedResultData = GetLocalExamResult.find(
          (result) => result.Title === PathCourseName
        );

        const formattedExamDate = new Date(MatchedResultData.ExamDate)
          .toLocaleString()
          .split(",")[0];

        //   User's Answers
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

        //   calculation of total mark
        let totalMark =
          correctAns.length - wrongAns.length <= 0
            ? 0
            : correctAns.length - wrongAns.length;

        const markSheet = {
          courseName: MatchedResultData.Title,
          examDate: `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`,
          totalMark,
        };

        fetch(`http://localhost:5000/userResult?id=${employeeInfo?._id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(markSheet),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.acknowledged) {
              toast.success("Result Saved");
            } else {
              toast.success("Failed to Result Saved");
            }
          })
          .catch(() => {
            toast.error("Network Issuses!");
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
        AddResultToLocal(userAnswers, Title);
        Swal.fire({
          allowOutsideClick: true,
          allowEscapeKey: true,
          showCancelButton: false,
          showConfirmButton: false,
          icon: "success",
          title: "Answer Submitted!",
          html: `<a href="/certifications/${PathCourseName}/result"  target="_blank" onClick=${setToDatabase()} style='display: inline-block;padding: 10px 20px;background-color: #007bff;color: #fff;text-decoration: none;border-radius: 4px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);transition: background-color 0.3s;font-size: 16px;font-weight: bold;'> Show Result</a>`,
        });
        delete localStorage.TempSubmittedData;

        navigate("/");
      }
    });
  };

  const AddResultToLocal = (userAnswers, Title) => {
    // Add Employee Answer to Local Storage

    const data = {
      Title: PathCourseName,
      userAnswers: userAnswers,
      ExamDate: `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`,
    };

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
    timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Looking If Exam Duration Finished
  useEffect(() => {
    if (timeRemaining === 0) {
      setIsTimeUp(true);
      clearInterval(timer); // Stop the timer when time reaches 0
    }
  }, [timeRemaining, timer]);

  // Loader
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
  // Exam Time Over
  isTimeUp
    ? Swal.fire({
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
          AddResultToLocal(userAnswers, Title);
          Swal.fire({
            allowOutsideClick: true,
            allowEscapeKey: true,
            showCancelButton: false,
            showConfirmButton: false,
            icon: "success",
            title: "Your work has been saved",
            html: `<a href="/certifications/${PathCourseName}/result" target="_blank" onClick=${setToDatabase()} style='display: inline-block;padding: 10px 20px;background-color: #007bff;color: #fff;text-decoration: none;border-radius: 4px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);transition: background-color 0.3s;font-size: 16px;font-weight: bold;'> Show Result</a>`,
          });
          delete localStorage.TempSubmittedData;
          return navigate("/");
        }
      })
    : "";
  return (
    <div
      className={`max-w-3xl mx-auto pb-24 font-roboto`}
      style={{ fontFamily: "Roboto Slab, serif" }}
    >
      {/* Exam Title */}
      <ExamPageTitle
        ExamData={ExamData}
        Logo={Logo}
        formatTime={formatTime}
        timeRemaining={timeRemaining}
      ></ExamPageTitle>
      {/* Exam Body */}
      {RandomExamData.map((Question, index) => {
        const { questionNo, question, options } = Question;
        return (
          <div
            key={questionNo}
            className="mt-24 w-[320px] md:w-[80%] lg:w-[100%]"
            id={index + 1}
          >
            <div className="my-10 ml-5 lg:ml-0 bg-gray-100 shadow-xl px-8 lg:px-10 py-5 rounded-lg w-[100%]">
              <p className="text-sm md:text-lg  text-white bg-black inline-block rounded p-1">
                Question-{index + 1}
              </p>
              <h3 className="my-5 font-bold font-roboto font-IBM text-base md:text-xl">
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
                      <span className="pt-1 md:pt-2 text-center rounded-full w-[25px] h-[25px] md:w-[40px] md:h-[40px] bg-[#1dd1a1] text-white text-xs md:text-base">
                        {id}
                      </span>
                      <span className={`pl-3 text-black text-xs md:text-base`}>
                        {option}
                      </span>
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

      {/* Question Scrolling Button */}
      <div className="  fixed top-60 right-1 lg:top-36 lg:right-[60px] space-y-3">
        {ExamData.questionPaper.map((question, index) => {
          if (index % 10 === 0 || index === 0) {
            return (
              <div key={index}>
                <a
                  href={`#${index === 0 ? 1 : index}`}
                  className="btn bg-green-200 btn-sm border-none w-[25px] h-[25px] md:w-[40px] md:h-[40px] rounded-full text-xs lg:text-lg"
                >
                  {index === 0 ? 1 : index}
                </a>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ExamPage;
