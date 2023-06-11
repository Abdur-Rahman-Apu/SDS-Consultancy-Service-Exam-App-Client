import { createBrowserRouter } from "react-router-dom";

import LogIn from "../../Pages/LogIn/LogIn";
import Home from "../../Pages/Home/Home/Home";
import Error from "../../Pages/Error/Error";
import Certification from "../../Pages/Certification/Certification";
import MainLayout from "../../Layout/MainLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import DashboardLayout from "../../Layout/DashboardLayout";
import Profile from "../../Pages/Dashboard/Admin/Profile/Profile";
import AddEmployee from "../../Pages/Dashboard/Admin/AddEmployee/AddEmployee";
import Employees from "../../Pages/Dashboard/Admin/Employees/Employees/Employees";
import About from "../../Pages/About/About";
import Courses from "../../Pages/Dashboard/Admin/Courses/Courses/Courses";
import AddCourseQuestion from "../../Pages/Dashboard/Admin/Courses/AddCourseQuestion/AddCourseQuestion";
import UpdateRegId from "../../Pages/Dashboard/Admin/Employees/UpdateRegId/UpdateRegId";

import EachCourseResult from "../../Pages/Dashboard/Employee/Result/EachCourseResult/EachCourseResult";
import ExamPage from "../../Pages/ExamPage/ExamPage";
import MarkDashboard from "../../Pages/Dashboard/Employee/Result/MarkDashboard/MarkDashboard";
import Result from "../../Pages/ExamPage/Result";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/certifications",
        element: (
          <PrivateRoute>
            <Certification />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/certifications/:courseName/exam",
    element: <ExamPage />,
  },
  {
    path: "/certifications/:courseName/result",
    element: <Result />,
  },
  {
    path: "/dashboard",
    errorElement: <Error />,
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/addEmployee",
        element: (
          <PrivateRoute>
            <AddEmployee />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/employees",
        element: (
          <PrivateRoute>
            <Employees />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/courses",
        element: (
          <PrivateRoute>
            <Courses />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/addQuestion/:courseName",
        element: (
          <PrivateRoute>
            <AddCourseQuestion />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/employees/updateRegId/:id",
        element: (
          <PrivateRoute>
            <UpdateRegId />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/result",
        element: (
          <PrivateRoute>
            <MarkDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/result/seeMark/:courseName",
        element: (
          <PrivateRoute>
            <EachCourseResult />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
