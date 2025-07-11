import React from "react";
import { NavLink, Outlet } from "react-router";

import {
  FaHome,
  FaBoxOpen,
  FaSearch,
  FaUserEdit,
  FaUserCheck,
  FaUserClock,
  FaUserShield,
  FaMotorcycle,
} from "react-icons/fa";
import Logo from "../Component/Logo/Logo";
// import UseUserRole from "../Hooks/UseUserRole";
const DashBoardLayout = () => {

//   const {roleLoading , role}  = UseUserRole()
//   console.log("Role from hook:", role); // এটা check করো
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">DashBoard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <Logo></Logo>
          <li>
            <NavLink to="">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myParcel">
              <FaBoxOpen /> My Parcel
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">
              <FaUserEdit /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/track">
              <FaSearch /> Track a Package
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <FaUserEdit /> Update profile
            </NavLink>
          </li>
          {/* { !roleLoading && role === 'admin' && */}
            {/* <> */}
             <li>
            <NavLink to="/dashboard/AssignRider">
              <FaMotorcycle  className="inline-block"/> Assign Riders
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/active-Riders">
              <FaUserCheck /> Active Riders
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/pending-riders">
              <FaUserClock /> Pending Riders
            </NavLink>
          </li>

          {/* admin */}
          <li>
            <NavLink to="/dashboard/makeAdmin">
              <FaUserShield className="inline-block" /> Make Admin
            </NavLink>
          </li>
          {/* </> */}
          {/* } */}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
