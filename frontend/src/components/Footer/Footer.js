// Footer.jsx
import React from "react";
import "./Footer.css"; // Make sure to create a Footer.css file for styling
import { FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaTwitter />
          </a>
        </div>
        <div className="footer-info">
          <p>&copy; 2024 E-Waste Management. All rights reserved.</p>
          <p>Contact us: info@ewastemanagement.com | +123 456 7890</p>
          <p>Address: 123 Green Way, Sustainability City, Earth</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
