// Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./images/instagram.png" alt="Instagram" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./images/twitter.png" alt="Twitter" />
          </a>
        </div>
        <p className="copyright">
          &copy; {year} E-Waste Management. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
