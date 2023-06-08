import { useEffect, useState } from "react";

const ExamPage = () => {
const [Marked,setMarked]=useState(false)

const  handleChecked=()=>{
  setMarked(!Marked)
}

  return (
    <div className="max-w-3xl mx-auto">
      {/* Exam Title */}
      <div className="flex justify-between items-center my-10">
        <h2>Exam Name</h2>
        <h2>Duration</h2>
        <h2>Time Remaining</h2>
      </div>

      {/* Exam Body */}
      <div className="my-5">
       
        <p>Question 01</p>
        <h3 className="mt-3 mb-5 font-extrabold">Question Title</h3>
        <div className="flex flex-col justify-center space-y-5">

          <p onClick={()=>handleChecked()} className={`${Marked?"bg-green-500":"bg-gray-300"} p-4 rounded-md flex items-center cursor-pointer`}>
          <input type="checkbox" checked={Marked?true:false} className={`checkbox checkbox-sm`} />
            <span className="pl-3">Option A</span>
          </p>
          <p onClick={()=>handleChecked()} className={`${Marked?"bg-green-500":"bg-gray-300"} p-4 rounded-md flex items-center cursor-pointer`}>
          <input type="checkbox" checked={Marked?true:false} className={`checkbox checkbox-sm`} />
            <span className="pl-3">Option B</span>
          </p>
          <p onClick={()=>handleChecked()} className={`${Marked?"bg-green-500":"bg-gray-300"} p-4 rounded-md flex items-center cursor-pointer`}>
          <input type="checkbox" checked={Marked?true:false} className={`checkbox checkbox-sm`} />
            <span className="pl-3">Option C</span>
          </p>
          <p onClick={()=>handleChecked()} className={`${Marked?"bg-green-500":"bg-gray-300"} p-4 rounded-md flex items-center cursor-pointer`}>
          <input type="checkbox" checked={Marked?true:false} className={`checkbox checkbox-sm`} />
            <span className="pl-3">Option D</span>
          </p>
        </div>
        </div>
    </div>
  )
};

export default ExamPage;
