import { useState } from "react";
import Questions from "../../assets/JsonFiles/Question.json"

const ExamPage = () => {
const [userAnswers, setUserAnswers] = useState({});
	const [OptionStyle,setOptionStyle]=useState(null)

	const handleAnswerChange = (questionId, selectedOption,option) => {
		setUserAnswers((prevAnswers) => ({
			...prevAnswers,
			[questionId]: selectedOption,
		}));
		setOptionStyle(option);

	};
  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the userAnswers, e.g., send them to the server
    console.log(userAnswers);
  };

	return (
		<div className="max-w-3xl mx-auto py-24 font-Roboto">
			{/* Exam Title */}
			<div className="flex justify-between items-center my-10 px-10">
				<h2>Course Name:</h2>
				<h2>Exam Duration:</h2>
				<h2>Time Remaining:</h2>
			</div>
			{/* Exam Body */}
			{/* Question Json File Mapping */}
			{Questions.map((Question, index) => {
				const {question,options,answer}=Question;
				return (
					<div key={question.question}>

						<div className="my-10 bg-gray-100 shadow-xl px-10 py-5 rounded-lg">
							<p className="text-gray-600">Question-{index + 1}</p>
							<h3 className="mt-3 mb-5 font-extrabold font-IBM text-xl">{question}</h3>

{/*Questions Options Mapping */}
							<div className="space-y-5">
									{
									options.map((Option) => {
										const {id,option}=Option;
											return	(
											<p
														key={option}
														onClick={() => handleAnswerChange(index, id,option)}
														className={`p-4 rounded-md flex items-center cursor-pointer ${userAnswers[index] === id ? 'bg-green-600 text-white' : 'border bg-gray-50 border-gray-300'} 
														${OptionStyle===option?"font-extrabold":"font-normal"}`}>
														<span className="p-3 py-1 rounded-md bg-green-600 text-white">{id}</span>
														<span className={`pl-3`}>{option}</span>
													</p>)
												})
												}
							</div>
						</div>
						
					</div>
				)
			})}
			<button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Submit Answers
      </button>
		
		</div>
	)
};

export default ExamPage;
