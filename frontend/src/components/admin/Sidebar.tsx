import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlignJustify, Tag, Box, CornerRightUp, LogOut } from "lucide-react";
import "../../styles/Sidebar.scss";

import { useAuth } from "../../provider/AuthProvider";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [menuState, setMenuState] = useState({
    categories: false,
    products: false,
  });
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleMenu = useCallback((menu: "categories" | "products") => {
    setMenuState((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button
        className="toggle-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <AlignJustify
          size={24}
          className={`arrow ${isCollapsed ? "rotated" : "margin-left"}`}
        />
      </button>

      <nav>
        <ul>
          <li>
            <div className="menu-item" onClick={() => toggleMenu("categories")}>
              <Tag size={20} />
              <span className="text">Categories</span>
            </div>
            <div>
              <ul
                className={`submenu ${
                  menuState.categories && !isCollapsed ? "open" : ""
                }`}
              >
                <li>
                  <CornerRightUp size={18} className="rotated-submenu" />
                  <Link to="/admin/categories/list"> List</Link>
                </li>
                <li>
                  <CornerRightUp size={18} className="rotated-submenu" />
                  <Link to="/admin/categories/form">Form</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="menu-item" onClick={() => toggleMenu("products")}>
              <Box size={20} />
              <span className="text">Products</span>
            </div>
            <div>
              <ul
                className={`submenu ${
                  menuState.products && !isCollapsed ? "open" : ""
                }`}
              >
                <li>
                  <CornerRightUp size={18} className="rotated-submenu" />
                  <Link to="/admin/products/list">List</Link>
                </li>
                <li>
                  <CornerRightUp size={18} className="rotated-submenu" />
                  <Link to="/admin/products/form">Form</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div
              className="menu-item"
              onClick={() => setLogoutModalOpen(true)} // Open logout modal
            >
              <LogOut size={20} />
              <span className="text">Logout</span>
            </div>
          </li>
        </ul>
      </nav>

      {isLogoutModalOpen && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <h3 style={{ color: "black" }}>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="logout-modal-buttons">
              <button className="confirm-logout-btn" onClick={handleLogout}>
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

export default Sidebar;
