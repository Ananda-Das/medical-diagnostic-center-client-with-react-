import { createBrowserRouter } from "react-router-dom";

import MainLayouts from "../layouts/MainLayout.jsx/MainLayouts";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "signup",
        element: <Registration></Registration>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
]);

export default Routes;
