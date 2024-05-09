import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import logo from "../images/mainlogo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="hamburger" onClick={toggleMenu}>
          <div />
          <div />
          <div />
        </div>
        <div ref={menuRef}>
          <Navbar menuOpen={menuOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
