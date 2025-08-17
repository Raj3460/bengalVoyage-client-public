import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import Profile from "./Profile";
import Logo from "../Logo/Logo";
import "./Navbar.css";

const Navbar = () => {
  const { user, logOut } = useAuth();

  // 🔥 Theme state
  const [theme, setTheme] = useState("light");

  // প্রথমবার লোডে localStorage থেকে theme নিবে
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, []);

  // theme পরিবর্তন হলে html tag এ বসাবে + localStorage এ রাখবে
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
        <NavLink to="/community">Community</NavLink>
      </li>
      <li>
        <NavLink to="/AllTrips">All Trips</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard">DashBoard</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/aboutUs">About Us</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-300 shadow-2xl sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start ">
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
            <Logo />
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end flex items-center gap-2">
          {/* 🔥 Theme Toggle */}
          <button onClick={handleThemeToggle} className="btn btn-ghost">
            {theme === "light" ? (
              <svg
                aria-label="moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
                />
              </svg>
            ) : (
              <svg
                aria-label="sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
                <path stroke="currentColor" strokeWidth="2" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            )}
          </button>

          {user ? (
            <Profile handleLogOut={handleLogOut}></Profile>
          ) : (
            <div>
              <Link to="/login">
                <button className="btn btn-primary text-black">Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
