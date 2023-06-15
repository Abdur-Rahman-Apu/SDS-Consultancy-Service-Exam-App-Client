/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RuleImage from "../../assets/Certifications/rule.png";
import ReadyImg from "../../assets/Certifications/7494932.jpg";
import style from "./individualCertification.module.css";

const IndividualCertification = ({ course, employee, employeeInfo }) => {
  const { courseName, courseImg, courseDesc } = course;
  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const d = new Date();

  let diffDays;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Calculate passed days after giving first exam
  if (
    course &&
    employee?.role != "admin" &&
    employee?.result[`${courseName}`]?.length > 0
  ) {
    const result = employee?.result[`${courseName}`];
    const latestExamDate = result[0]?.examDate;
    const todayDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

    const date1 = new Date(`${latestExamDate.toString()}`);
    const date2 = new Date(`${todayDate.toString()}`);

    diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
  }

  // modal contains rules of the exam
  const toggleRuleModal = () => {
    setRuleModalOpen(ruleModalOpen === true ? false : true);
  };

  // modal contains confirmation message to proceed
  const toggleConfirmationModal = () => {
    setConfirmModalOpen(confirmModalOpen === true ? false : true);
  };

  return (
    <div className="card my-5 bg-base-100 shadow-xl">
      <figure className="h-[220px]">
        <img
          src={courseImg}
          alt="course image"
          className="object-cover h-full w-full"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-center">
          <h2 className="card-title font-bold text-2xl font-roboto">
            {courseName}
          </h2>

          {/* <button onClick={toggleRuleModal}>
            <img src={RuleImage} alt="image" className="w-[50px] h-[50px]" />
          </button>

          {ruleModalOpen && (
            <div className={`${style.popup} px-[6%]`}>
              <div className={`${style.overlay}`}>
                <div className={`${style.content}`}>
               
                  <div className="mb-10 sm:w-[50%] sm:mx-auto">
                    <img
                      src={courseImg}
                      alt="course image"
                      className="w-full object-cover rounded-lg"
                    />
                  </div>

                 
                  <h1 className="text-3xl font-bold my-4">
                    {courseName} Certification Exam
                  </h1>

                  
                  <h2 className="font-bold text-start text-2xl mb-3">
                    Description:
                  </h2>
                  <p className="text-start">{courseDesc}</p>

                 
                  <h2 className="text-2xl text-start font-bold my-3">Rules:</h2>
                  <ol
                    className={`${style.orderList} text-start list-disc ml-[10%] pb-5`}
                  >
                    <li>The exam duration is 2 hours</li>
                    <li>Total number of question is 100</li>
                    <li>
                      Each correct answer will be awarded +1 mark, while each
                      wrong answer will result in -1 mark.
                    </li>
                    <li>
                      If you minimize your window of the browser, then your exam
                      will be finished.
                    </li>
                    <li>
                      Users scoring 80 marks or more will pass, while those
                      scoring less than 80 will fail.
                    </li>
                  </ol>

                  <button
                    className="font-roboto bg-[#1abc9c] text-white py-[10px] px-[30px] rounded-full"
                    onClick={toggleRuleModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>

        {/* <p className="font-poppins text-sm text-justify">
          {courseDesc.split(".")[0]}
        </p> */}

        <div className="card-actions justify-center">
          {/* modal of confirmation  */}
          <button
            className="btn bg-[#F5DF4E] font-roboto px-8 mt-6  rounded-full"
            onClick={toggleConfirmationModal}
            disabled={
              employeeInfo?.role === "admin" ||
              (diffDays != null && diffDays <= 7)
            }
          >
            Give Exam
          </button>

          {/* modal box of rules  */}
          {confirmModalOpen && (
            <div className={`${style.popup} px-[6%]`}>
              <div className={`${style.overlay}`}>
                <div className={`${style.content}`}>
                  {/* course name  */}
                  <h1 className="text-3xl font-bold my-4">Are you ready?</h1>

                  {/* image  */}
                  <div className=" w-[90%] md:w-[50%] h-[300px] mx-auto mb-10">
                    <img
                      src={ReadyImg}
                      alt="image"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>

                  {/* Exam rules  */}
                  <h2 className="text-2xl text-start  font-bold my-3">
                    Read the following rules again:
                  </h2>
                  <ol
                    className={`${style.orderList}  text-start list-disc ml-[10%] pb-5`}
                  >
                    <li>The exam duration is 2 hours</li>
                    <li>Total number of question is 100</li>
                    <li>
                      Each correct answer will be awarded +1 mark, while each
                      wrong answer will result in -1 mark.
                    </li>
                    <li>
                      If you minimize your window of the browser, then your exam
                      will be finished.
                    </li>
                    <li>
                      If you achieve 80 marks or more then you will pass,
                      otherwise you will fail.
                    </li>
                  </ol>

                  <div className="flex justify-between md:w-[30%] mx-auto my-10">
                    <button
                      className="bg-[#000] text-white font-bold font-roboto py-[15px] px-[20px] rounded-full"
                      onClick={toggleConfirmationModal}
                    >
                      Cancel
                    </button>
                    <Link
                      to={`/certifications/${courseName}/exam`}
                      className="bg-[#F5DF4E] text-black font-bold py-[15px] px-[20px] font-roboto rounded-full"
                    >
                      Start
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualCertification;
