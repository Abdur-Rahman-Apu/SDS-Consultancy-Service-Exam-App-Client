import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";
import Home from "../Pages/Home/Home/Home";


const Main = () => {
  return (
    <div id="home">
      <Navbar />
      <Home></Home>
      <Footer />
    </div>
  );
};

export default Main;
