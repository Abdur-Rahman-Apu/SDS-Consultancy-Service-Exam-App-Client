import { useEffect, useState } from "react";
import Questions from "../../assets/JsonFiles/Question.json"

const ExamPage = () => {
  const [Marked, setMarked] = useState([])
var SelcetedData=[];
  const handleChecked = (data) => {
    setMarked(data)
  }
  const Selected = "text-white bg-green-600 border-2 border-green-600 font-semibold"
console.log(Marked,SelcetedData,"Marked,SelectedData")
  return (
    <div className="max-w-3xl mx-auto">
      {/* Exam Title */}
      <div className="flex justify-between items-center my-10 px-10">
        <h2>Course Name:</h2>
        <h2>Exam Duration:</h2>
        <h2>Time Remaining:</h2>
      </div>
      {/* Exam Body */}
      {Questions.map((question,index )=> {
        return (
          <div key={question.question}>

            <div className="my-10 bg-gray-100 shadow-xl px-10 py-5 rounded-lg">
              <p className="text-gray-600">Question-{index+1}</p>
              <h3 className="mt-3 mb-5 font-extrabold">{question.question}</h3>

              <div className="space-y-5">
                <p onClick={() => handleChecked(question.A)} className={`${Marked === question.A ? Selected : "border border-gray-300"}
                    p-4 rounded-md flex items-center cursor-pointer`}>
                  <span className={`p-3 py-1 rounded-md ${Marked === question.A ? "bg-green-600 text-white ml" : ""}`}>A</span>
                  <span className={`${Marked === question.A ? "border-none" : "border-l-2"} pl-3`}>{question.A}</span>
                </p>

                <p onClick={() => handleChecked(question.B)} className={`${Marked === question.B ? Selected : "border border-gray-300"} p-4 rounded-md flex items-center cursor-pointer`}>
                  <span className={`p-3 py-1 rounded-md ${Marked === question.B ? "bg-green-600 text-white" : ""}`}>B</span>
                  <span className={`${Marked === question.B ? "border-none" : "border-l-2"} pl-3`}>{question.B}</span>
                </p>

                <p onClick={() => handleChecked(question.C)} className={`${Marked === question.C ? Selected : "border border-gray-300"} p-4 rounded-md flex items-center cursor-pointer`}>
                  <span className={`p-3 py-1 rounded-md ${Marked === question.C ? "bg-green-600 text-white" : ""}`}>C</span>
                  <span className={`${Marked === question.C ? "border-none" : "border-l-2"} pl-3`}>{question.C}</span>
                </p>

                <p onClick={() => handleChecked(question.D)} className={`${Marked === question.D ? Selected : "border border-gray-300"} p-4 rounded-md flex items-center cursor-pointer`}>
                  <span className={`px-3 py-1 rounded-md ${Marked === question.D ? "bg-green-600 text-white" : ""}`}>D</span>
                  <span className={`${Marked === question.D ? "border-none" : "border-l-2"} pl-3`}>{question.D}</span>
                </p>
              </div>
            </div>
          </div>
        )
      })}
      {


      }
    </div>
  )
};

export default ExamPage;
