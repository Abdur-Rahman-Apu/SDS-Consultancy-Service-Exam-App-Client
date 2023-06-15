import { createBrowserRouter } from "react-router-dom";

import LogIn from "../../Pages/LogIn/LogIn";
import Error from "../../Pages/Error/Error";
import Certification from "../../Pages/Certification/Certification";
import MainLayout from "../../Layout/MainLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import DashboardLayout from "../../Layout/DashboardLayout";
import Profile from "../../Pages/Dashboard/Admin/Profile/Profile";
import AddEmployee from "../../Pages/Dashboard/Admin/AddEmployee/AddEmployee";
import Employees from "../../Pages/Dashboard/Admin/Employees/Employees/Employees";
import Courses from "../../Pages/Dashboard/Admin/Courses/Courses/Courses";
import AddCourseQuestion from "../../Pages/Dashboard/Admin/Courses/AddCourseQuestion/AddCourseQuestion";
import UpdateRegId from "../../Pages/Dashboard/Admin/Employees/UpdateRegId/UpdateRegId";

import EachCourseResult from "../../Pages/Dashboard/Employee/Result/EachCourseResult/EachCourseResult";
import ExamPage from "../../Pages/ExamPage/ExamPage";
import MarkDashboard from "../../Pages/Dashboard/Employee/Result/MarkDashboard/MarkDashboard";
import Result from "../../Pages/ExamPage/Result";
import AssignCourses from "../../Pages/Dashboard/Admin/AssignCourses/AssignCourses";
import Marks from "../../Pages/Dashboard/Admin/Marks/Marks/Marks";
import EmployeeMark from "../../Pages/Dashboard/Admin/Marks/EmployeeMark/EmployeeMark";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
    errorElement: <Error />,
  },
  {
    path: "/certifications",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/certifications",
        element: <Certification />,
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
        element: <Dashboard />,
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
        path: "/dashboard/employees/assignCourses/:id",
        element: (
          <PrivateRoute>
            <AssignCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/marks",
        element: (
          <PrivateRoute>
            <Marks />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/employeeMarks/:id",
        element: (
          <PrivateRoute>
            <EmployeeMark />
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
