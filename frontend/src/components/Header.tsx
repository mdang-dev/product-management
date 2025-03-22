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
import { useAuth } from "../provider/AuthProvider";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <h3>Product Management</h3>
        </div>
        <div className="header__search">
          <Search size={16} />
          <input
            type="text"
            className="header__search-input"
            placeholder="Search products..."
          />
        </div>
        <button className="header__menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
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
        <div className="header__auth">
          {!isAuthenticated ? (
            <>
              <button
                className="header__auth-button"
                onClick={() => navigate("/login")}
              >
                <LogIn size={16} /> Login
              </button>
              <button
                className="header__auth-button"
                onClick={() => navigate("/sign-up")}
              >
                <UserPlus size={16} /> Sign Up
              </button>
            </>
          ) : (
            <>
              <div className="flex">
                <span className="header__hi-user">Hi:</span>
                <span>@{user?.username}</span>

                <button className="header__auth-button" onClick={logout}>
                  <LogIn size={16} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
