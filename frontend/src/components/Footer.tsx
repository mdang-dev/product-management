import React from "react";
import "../styles/Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>
          &copy; {new Date().getFullYear()} Product Management. All rights
          reserved.
        </p>
        <ul className="footer__links">
          <li className="footer__link-item">Privacy Policy</li>
          <li className="footer__link-item">Terms of Service</li>
          <li className="footer__link-item">Contact Us</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
