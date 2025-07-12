import { createBrowserRouter } from "react-router";
import BasicLayouts from "../Layout/BasicLayouts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registation from "../Pages/Registation/Registation";
import Forbidden from "../Forbidden/Forbidden";
import DashBoardLayout from "../Layout/DashBoardLayout";
import PrivateRouts from "../SecureRout/PrivateRouts";
import ManageProfile from "../Pages/DashBoard/ManageProfile/ManageProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayouts></BasicLayouts>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "register",
        Component: Registation,
      },
    ],
  },
  
    {
    path: "/dashboard",
    element: (
      <PrivateRouts>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRouts>
    ),
    children: [

      {
        path:"Manage_Profile",
        Component : ManageProfile
      }
    ]
  
  },
  
]);
