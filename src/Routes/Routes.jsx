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
import Test from "../pages/Dashboard/Test/Test";
import UpdateTest from "../pages/Dashboard/UpdateTest/UpdateTest";
import AddBanner from "../pages/Dashboard/Banner/AddBanner";
import AllBanner from "../pages/Dashboard/Banner/AllBanner";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import Profile from "../pages/Dashboard/Profile/Profile";
import Alltests from "../pages/AllTests/Alltests";
import TestDetail from "../pages/AllTests/TestDetail/TestDetail";
import Payment from "../pages/Dashboard/Payment/Payment";
import BookedTest from "../pages/Dashboard/Test/BookedTest";
import UpdateProfile from "../pages/Dashboard/Profile/UpdateProfile";
import PrivateRoutes from "./PrivateRoutes";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import MyTestResult from "../pages/Dashboard/MyTestResult/MyTestResult";
import AllBookings from "../pages/Dashboard/AllBookings/AllBookings";
import UpdateBooking from "../pages/Dashboard/AllBookings/UpdateBooking";

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
      {
        path: "allTest",
        element: <Alltests></Alltests>,
      },
      {
        path: "test/:id",
        element: (
          <PrivateRoutes>
            <TestDetail></TestDetail>
          </PrivateRoutes>
        ),
        loader: () => fetch("https://diagnostic-center-management-server-smoky.vercel.app/tests"),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // Admin Routes
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
      {
        path: "allTest",
        element: (
          <AdminRoutes>
            <Test></Test>
          </AdminRoutes>
        ),
      },
      {
        path: "updatetest/:id",
        element: (
          <AdminRoutes>
            <UpdateTest></UpdateTest>
          </AdminRoutes>
        ),
        loader: ({ params }) => fetch(`https://diagnostic-center-management-server-smoky.vercel.app/test/${params.id}`),
      },
      {
        path: "bookedTest/:id",
        element: (
          <AdminRoutes>
            <BookedTest></BookedTest>
          </AdminRoutes>
        ),
        loader: ({ params }) => fetch(`https://diagnostic-center-management-server-smoky.vercel.app/test/${params.id}`),
      },
      {
        path: "addBanners",
        element: (
          <AdminRoutes>
            <AddBanner></AddBanner>
          </AdminRoutes>
        ),
      },
      {
        path: "allBanners",
        element: (
          <AdminRoutes>
            <AllBanner></AllBanner>
          </AdminRoutes>
        ),
      },
      {
        path: "allbookings",
        element: (
          <AdminRoutes>
            <AllBookings></AllBookings>
          </AdminRoutes>
        ),
      },
      {
        path: "updatePayment/:id",
        element: (
          <AdminRoutes>
            <UpdateBooking></UpdateBooking>
          </AdminRoutes>
        ),
        loader: ({ params }) => fetch(`https://diagnostic-center-management-server-smoky.vercel.app/single/payments/${params.id}`),
      },

      // Admin Route End

      // User Route Start
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "updateProfile/:id",
        element: <UpdateProfile></UpdateProfile>,
        loader: ({ params }) => fetch(`https://diagnostic-center-management-server-smoky.vercel.app/singleUser/${params.id}`),
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "appointments",
        element: <MyBookings></MyBookings>,
      },
      {
        path: "testResult",
        element: <MyTestResult></MyTestResult>,
      },
    ],
  },
]);

export default Routes;
