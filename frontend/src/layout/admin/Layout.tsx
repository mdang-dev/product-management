import Sidebar from "../../components/admin/Sidebar";
import { Outlet } from "react-router-dom";
import "../../styles/Layout.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
        <ToastContainer />
      </main>
    </div>
  );
};

export default Layout;
