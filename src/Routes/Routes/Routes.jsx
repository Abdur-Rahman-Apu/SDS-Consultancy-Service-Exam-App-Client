import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";

import LogIn from "../../Pages/LogIn/LogIn";
import Home from "../../Pages/Home/Home/Home";
import Error from "../../Pages/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
    ],
  },
]);
