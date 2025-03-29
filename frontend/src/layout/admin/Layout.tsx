import Sidebar from "../../components/admin/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import "../../styles/Layout.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React, { useEffect } from "react";

export const AdminLayout: React.FC = () => {
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
