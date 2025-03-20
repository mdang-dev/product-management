import Sidebar from "../../components/admin/Sidebar";
import { Outlet } from "react-router-dom";
import "../../styles/Layout.scss";

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
