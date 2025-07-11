import React from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import Profile from "./Profile";
import Logo from "../Logo/Logo";


const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have been successfully logged out.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Logout Error:", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while logging out.",
              icon: "error",
            });
          });
      }
    });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home </NavLink>
      </li>
      <li>
        <NavLink to="/1">Community</NavLink>
      </li>
      <li>
        <NavLink to="/2">Trips</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard">DashBoard</NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-300 shadow-sm sticky top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
<div>
  <Logo></Logo>
</div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <Profile handleLogOut={handleLogOut}></Profile>
        ) : (
          <div>
            <Link to="/login">
              <button className="btn btn-primary text-black">Login</button>
            </Link>{" "}
            <Link to="/register">
              <button className="btn btn-primary text-black">Register</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
