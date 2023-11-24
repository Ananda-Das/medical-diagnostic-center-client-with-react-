import { createBrowserRouter } from "react-router-dom";

import MainLayouts from "../layouts/MainLayout.jsx/MainLayouts";
import Home from "../pages/Home/Home";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);

export default Routes;
