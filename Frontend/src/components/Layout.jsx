import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Navbarmenu from "./menu/Navbarmenu";
const Layout = () => {
  return (
    <div>
      <Header />
      {/* <Navbarmenu/> */}
      <div className="content">
        <Outlet />
      </div>
      <div className="footer-at-bottom">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
