import { createBrowserRouter } from "react-router-dom";

import MainLayouts from "../layouts/MainLayout/MainLayouts";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import AdminRoutes from "./AdminRoutes";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import Dashboard from "../layouts/AdminLayout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUser";
import AddTest from "../pages/Dashboard/AddTest/AddTest";

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
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "adminHome",
        element: (
          <AdminRoutes>
            <AdminHome></AdminHome>
          </AdminRoutes>
        ),
      },
      {
        path: "allusers",
        element: (
          <AdminRoutes>
            <AllUsers></AllUsers>
          </AdminRoutes>
        ),
      },
      {
        path: "add/test",
        element: (
          <AdminRoutes>
            <AddTest></AddTest>
          </AdminRoutes>
        ),
      },
    ],
  },
]);

export default Routes;
