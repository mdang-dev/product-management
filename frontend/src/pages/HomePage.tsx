import React, { useState } from "react";
import "../styles/HomePage.scss";
import { useAuth } from "../provider/AuthProvider";

const HomePage: React.FC = () => {
  const { logout } = useAuth();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setLogoutModalOpen(false);
  };

  return (
    <div className="home-page">
      <h1>Welcome to Product Management</h1>
      <button
        className="logout-button"
        onClick={() => setLogoutModalOpen(true)}
      >
        Logout
      </button>

      {isLogoutModalOpen && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="logout-modal-buttons">
              <button
                className="confirm-logout-btn"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>
              <button
                className="cancel-logout-btn"
                onClick={() => setLogoutModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
