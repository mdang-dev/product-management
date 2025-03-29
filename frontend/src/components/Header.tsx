import React, { useState } from "react";
import "../styles/Header.scss";
import {
  Home,
  Box,
  Phone,
  LogIn,
  UserPlus,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../auth/useUser";

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <h3>Product Management</h3>
        </div>
        <div
          className={`header__search ${
            isMenuOpen ? "header__search--visible" : ""
          }`}
        >
          <Search size={16} />
          <input
            type="text"
            className="header__search-input"
            placeholder="Search products..."
          />
        </div>
        <button className="header__menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Home size={16} /> Home
            </li>
            <li className="header__nav-item">
              <Box size={16} /> Products
            </li>
            <li className="header__nav-item">
              <Phone size={16} /> Contact
            </li>
          </ul>
        </nav>
        <div
          className={`header__auth ${
            isMenuOpen ? "header__auth--visible" : ""
          }`}
        >
          {!user ? (
            <>
              <button
                className="header__auth-button"
                onClick={() => navigate("/auth/sign-in")}
              >
                <LogIn size={16} /> Login
              </button>
              <button
                className="header__auth-button"
                onClick={() => navigate("/auth/sign-up")}
              >
                <UserPlus size={16} /> Sign Up
              </button>
            </>
          ) : (
            <>
              <div className="flex">
                <span className="header__hi-user">Hi:</span>
                <span>@{user?.username}</span>
                <button
                  className="header__auth-button"
                  onClick={() => setLogoutModalOpen(true)}
                >
                  <LogIn size={16} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isLogoutModalOpen && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="logout-modal-buttons">
              <button className="confirm-logout-btn" onClick={() => {}}>
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
    </header>
  );
};

export default Header;
