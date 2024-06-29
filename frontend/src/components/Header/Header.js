import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  return (
    <React.Fragment>
      <div>
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="./logo.png" alt="Logo" />
          </div>
          <ul className="navbar-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/book">Book A Slot</Link>
            </li>
            <li>
              <Link to="/listing">Listing</Link>
            </li>
            <li>
              <Link to="/auth">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
}

export default Header;
