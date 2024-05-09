import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../components/firebase-config";
import MenuItems from "./MenuItems";
import getMenuItems from "../menuItems";

const Navbar = ({ menuOpen }) => {
  const menuItems = getMenuItems();
  const [isAuth, setIsAuth] = useState(false);

  const handleLogOutClick = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
      localStorage.clear();
      window.location.pathname = "/";
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuth(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav>
      <ul className={`menus ${menuOpen ? "show" : ""}`}>
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
        <li className="menu-items">
          {!isAuth ? (
            <a href="/login">Login</a>
          ) : (
            <div className="auth-links">
              <a href="/createpost">Create</a>
              <a href="/userprofile">Profile</a>
              <button className="LogOut-Button" onClick={handleLogOutClick}>
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
