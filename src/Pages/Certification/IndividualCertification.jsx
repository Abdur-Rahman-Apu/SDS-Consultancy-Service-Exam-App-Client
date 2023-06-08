/* eslint-disable react/prop-types */

import { useState } from "react";
import RuleImage from "../../assets/Certifications/rule.png";
import style from "./individualCertification.module.css";

const IndividualCertification = ({ course }) => {
  const { courseId, courseName, courseImg, courseInfo, courseDesc } = course;

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(modalOpen === true ? false : true);
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
        <div className="flex justify-between">
          <h2 className="card-title font-bold text-2xl">{courseName}</h2>

          {/* rule modal  */}
          <button onClick={toggleModal}>
            <img src={RuleImage} alt="image" className="w-[50px] h-[50px]" />
          </button>

          {/* modal box  */}
          {modalOpen && (
            <div className={`${style.popup} px-[6%]`}>
              <div className={`${style.overlay}`}>
                <div className={`${style.content}`}>
                  {/* course image  */}
                  <div className="w-[50%] mx-auto">
                    <img
                      src={courseImg}
                      alt="course image"
                      className="w-full object-cover"
                    />
                  </div>

                  {/* course name  */}
                  <h1 className="text-3xl font-bold my-4">
                    Topic: {courseName}
                  </h1>

                  {/* course description  */}
                  <p className="font-bold text-start text-2xl mb-3">
                    Description:
                  </p>
                  <p className="text-start">{courseDesc}</p>

                  {/* Exam rules  */}
                  <h1 className="text-2xl text-start font-bold my-3">Rules</h1>
                  <ul className="text-start">
                    <li>The exam duration is 2 hours</li>
                    <li>Total number of question is 100</li>
                    <li>
                      Each correct answer will be awarded +1 mark, while each
                      wrong answer will result in -1 mark.
                    </li>
                    <li>
                      Users scoring 80 marks or more will pass, while those
                      scoring less than 80 will fail.
                    </li>
                  </ul>

                  <button onClick={toggleModal}>Close</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <p>{courseDesc.split(".")[0]}</p>
        <div className="card-actions justify-end">
          <button className="btn bg-[#1abc9c] rounded-3x">Give Exam</button>
        </div>
      </div>
    </div>
  );
};

export default IndividualCertification;