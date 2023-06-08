import { useEffect, useState } from "react";
import Questions from "../../assets/JsonFiles/Question.json";
import Alert from "../../assets/Audio/alert.mp3"
import { ZoomControl } from "react-leaflet";
import { Link } from "react-router-dom";

const ExamPage = () => {
	const [userAnswers, setUserAnswers] = useState({});
	const [OptionStyle, setOptionStyle] = useState(null);
	const [TimeFinished,setTimeFinished]= useState(false)


	const handleAnswerChange = (questionId, selectedOption, option) => {
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
// Time Duration
const [timeRemaining, setTimeRemaining] = useState(5); // 1800 seconds = 30 minutes
const [isTimeUp, setIsTimeUp] = useState(false);
let timer;
  useEffect(() => {
    timer = setTimeout(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeRemaining]);

	useEffect(() => {
    if (timeRemaining === 0) {
      setIsTimeUp(true);
      clearTimeout(timer); // Stop the timer when time reaches 0
			setTimeFinished(true);
    }
  }, [timeRemaining,timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
	
	return (
		<div className={`max-w-3xl mx-auto pb-24 font-Roboto`}>
			{/* Exam Title */}
			<div className="fixed top-0 inset-0 flex justify-around items-center h-10 bg-gray-500 py-10 text-white">
				<h2>Course Name: Biology</h2>
				<h2>Exam Duration: 2 Hours</h2>
				<h2>Time Remaining: {formatTime(timeRemaining)}</h2>
			</div>
			{/* Exam Body */}
			{/* Question Json File Mapping */}
			{Questions.map((Question, index) => {
				const { question, options, answer } = Question;
				return (
					<div key={question.question} className="mt-24">
						<div className="my-10 bg-gray-100 shadow-xl px-10 py-5 rounded-lg">
							<p className="text-gray-600 bg-purple-300 inline-block rounded p-2">Question-{index + 1}</p>
							<h3 className="my-5 font-extrabold font-IBM sm:text-xl">{question}</h3>

							{/*Questions Options Mapping */}
							<div className="space-y-5">
								{
									options.map((Option) => {
										const { id, option } = Option;
										return (
											<p
												key={option}
												onClick={() => handleAnswerChange(index, id, option)}
												className={`p-4 rounded-md flex items-center cursor-pointer ${userAnswers[index] === id ? 'bg-green-600 text-white' : 'border bg-gray-50 border-gray-300'} 
														${OptionStyle === option ? "font-extrabold" : "font-normal"}`}>
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

			{isTimeUp && (
        <audio autoPlay>
          <source src={Alert} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
			{
				TimeFinished? <div className="fixed inset-0 flex justify-center transition-opacity duration-900 items-center h-full w-full bg-black bg-opacity-70">
				<div className="flex flex-col gap-4">
				<h1 className="text-4xl text-white">Exam Time Over!</h1>
				
			<p className="mt-10 text-xl text-green-500 space-x-10" >	
				<Link className="underline link-success" to="/">Home</Link>
				<Link className="underline link-success" to="/python/exam/result">Show Your Result</Link>
				</p>
				</div>
			</div>:""
			}
		</div>
	)
};

export default ExamPage;
