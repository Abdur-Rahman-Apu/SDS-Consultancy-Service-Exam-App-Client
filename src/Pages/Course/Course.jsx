import { Link } from "react-router-dom"


const Course = () => {
  return (
    <div>
        <h1>Python</h1>
        <h2>Do you want parcipate exam?</h2>
        <Link to="/python/exam">Exam</Link>
    </div>
  )
}

export default Course;