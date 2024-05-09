import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="about">About</a>
          <a href="articles">Resources</a>
          <a href="contact">Contact</a>
        </div>
        <div className="footer-copyright">
          &copy; {currentYear} Calm. @Cynthia.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
