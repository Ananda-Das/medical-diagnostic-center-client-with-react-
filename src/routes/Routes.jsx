import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
// import Login from "../pages/Login/Login";
// import SignUp from "../pages/SignUp/SignUp";
import MainLayouts from "../layouts/MainLayouts";
import Registration from "../pages/Registration/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  //   { path: "/login", element: <Login /> },
  { path: "/signup", element: <Registration /> },
]);
