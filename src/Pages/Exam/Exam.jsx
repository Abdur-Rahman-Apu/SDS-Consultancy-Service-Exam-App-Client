import { useEffect, useState } from "react";

const ExamPage = () => {
const [Marked,setMarked]=useState(null)

const  handleChecked=(data)=>{
  setMarked(data)
}

  return (
    <div className="max-w-3xl mx-auto">
      {/* Exam Title */}
      <div className="flex justify-between items-center my-10 px-10">
        <h2>Course Name:</h2>
        <h2>Exam Duration:</h2>
        <h2>Time Remaining:</h2>
      </div>

      {/* Exam Body */}
      <div className="my-2 px-10 py-5 rounded-lg">
        <p className="text-gray-600">Question-01</p>
        <h3 className="mt-3 mb-5 font-extrabold">Question Title</h3>

        <div className="space-y-3">
          <p onClick={()=>handleChecked("A")} className={`border border-gray-300 ${Marked==="A"?"text-green-600":""}
           p-4 rounded-md flex items-center cursor-pointer`}>
          <span className={`p-3 py-1 rounded-md ${Marked==="A"?"bg-green-600 text-white ml":""}`}>A</span>
            <span className="border-l-2 pl-3">Option A</span>
          </p>
          <p onClick={()=>handleChecked("B")} className={` ${Marked==="B"?"text-green-600":""} p-4 rounded-md flex items-center cursor-pointer`}>
          <span className={`p-3 py-1 rounded-md ${Marked==="B"?"bg-green-600 text-white":""}`}>B</span>
            <span className="border-l-2 pl-3">Option B</span>
          </p>
          <p onClick={()=>handleChecked("C")} className={`border border-gray-300 ${Marked==="C"?"text-green-600":""} p-4 rounded-md flex items-center cursor-pointer`}>
          <span className={`p-3 py-1 rounded-md ${Marked==="C"?"bg-green-600 text-white":""}`}>C</span>
            <span className="border-l-2 pl-3">Option C</span>
          </p>
          <p onClick={()=>handleChecked("D")} className={`border border-gray-300 ${Marked==="D"?"text-green-600":""} p-4 rounded-md flex items-center cursor-pointer`}>
          <span className={`px-3 py-1 rounded-md ${Marked==="D"?"bg-green-600 text-white":""}`}>D</span>
            <span className="border-l-2 pl-3">Option D</span>
          </p>
        </div>
        </div>
    </div>
  )
};

export default ExamPage;
