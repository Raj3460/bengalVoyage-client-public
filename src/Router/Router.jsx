import { createBrowserRouter } from "react-router";
import BasicLayouts from "../Layout/BasicLayouts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registation from "../Pages/Registation/Registation";
import Forbidden from "../Forbidden/Forbidden";
import DashBoardLayout from "../Layout/DashBoardLayout";
import PrivateRouts from "../SecureRout/PrivateRouts";
import ManageProfile from "../Pages/DashBoard/ManageProfile/ManageProfile";
import AddPackage from "../Pages/DashBoard/AddPackageAdmin/AddPackage";
import PackageCardDetails from "../Pages/Home/TourismAndTravel/PackageCardDetails";
import JoinAsTourGuide from "../Pages/DashBoard/JoinAsTourGuide/JoinAsTourGuide";
import MyGuideApplications from "../Pages/DashBoard/JoinAsTourGuide/MyGuideApplications";
import ManageCandidates from "../Pages/DashBoard/ManageCandidates/ManageCandidates";
import MyBookings from "../Pages/DashBoard/MyBookings";
import Payment from "../Pages/DashBoard/MyPayment/Payment";
import AddStory from "../Pages/DashBoard/Story/AddStory";
import ManageStory from "../Pages/DashBoard/Story/ManageStory";
import UpdateStory from "../Pages/DashBoard/Story/UpdateStory";
import ManageUsersByAdmin from "../Pages/DashBoard/ManageUserAdmin/ManageUsersByAdmin";
import AssignedTours from "../Pages/DashBoard/AssignedTours.jsx/AssignedTours";
import CommunityStroies from "../Pages/CommunityPage/CommunityStroies";

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
        path: "community",
        Component: CommunityStroies,
      },
      {
        path: "register",
        Component: Registation,
      },
      {
        path: "packages/:id",
        Component: PackageCardDetails,
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
        path: "Manage_Profile",
        Component: ManageProfile,
      },
      {
        path: "my_bookings",
        Component: MyBookings,
      },
      {
        path: "assign_tours",
        Component: AssignedTours,
      },
      {
        path: "add_story",
        Component: AddStory,
      },
      {
        path: "manage_story",
        Component: ManageStory,
      },
      {
        path: "update-story/:id",
        Component: UpdateStory,
      },
      {
        path: "payment/:bookingId",
        Component: Payment,
      },
      {
        path: "add_package",
        Component: AddPackage,
      },
      {
        path: "join_as_tour_guide",
        Component: JoinAsTourGuide,
      },
      {
        path: "my_guide_applications",
        Component: MyGuideApplications,
      },
      {
        path: "manage_candidates",
        Component: ManageCandidates,
      },
      {
        path: "manage_users",
        Component: ManageUsersByAdmin,
      },
    ],
  },
]);
