import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth-hook";
import "./Header.css";

function Header() {
  const location = useLocation();
  const { pathname } = location;
  const { token, logout, role } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="./images/logo.png" alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={pathname === "/" ? "active" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={pathname === "/about" ? "active" : ""}
          >
            About
          </NavLink>
        </li>
        <li>
          {role === "user" && (
            <NavLink
              to="/book"
              className={pathname === "/book" ? "active" : ""}
            >
              Book A Slot
            </NavLink>
          )}
          {role === "recycler" && (
            <NavLink to="/add" className={pathname === "/add" ? "active" : ""}>
              Advertise
            </NavLink>
          )}
        </li>
        <li>
          <NavLink
            to="/listing"
            className={pathname === "/listing" ? "active" : ""}
          >
            Listing
          </NavLink>
        </li>
        {/* <li>
          {token && (
            <NavLink
              to="/userBookings"
              className={pathname === "/userBookings" ? "active" : ""}
            >
              My Booking
            </NavLink>
          )}
        </li> */}
        <li>
          {token ? (
            <NavLink
              to="/auth"
              onClick={() => {
                logout();
              }}
              className={pathname === "/auth" ? "active" : ""}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="/auth"
              className={pathname === "/auth" ? "active" : ""}
            >
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
