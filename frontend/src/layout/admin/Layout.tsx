import Sidebar from "../../components/admin/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import "../../styles/Layout.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

const Layout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("is")!) || [];
    if (storedRoles.includes("ADMIN")) {
      navigate("/admin/products/list");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
};

export default Layout;
