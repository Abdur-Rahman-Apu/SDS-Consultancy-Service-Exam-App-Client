import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";
import ExamPage from "../Pages/Exam/Exam";

const Main = () => {
  return (
    <div>
      <Navbar />
      <ExamPage></ExamPage>
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Main;
