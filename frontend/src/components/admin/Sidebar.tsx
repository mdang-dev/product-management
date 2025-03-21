import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { AlignJustify, Tag, Box, CornerRightUp } from "lucide-react";
import "../../styles/Sidebar.scss";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [menuState, setMenuState] = useState({
    categories: false,
    products: false,
  });

  const toggleMenu = useCallback((menu: "categories" | "products") => {
    setMenuState((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  }, []);

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
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
