import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Tag, Box, AlignJustify } from "lucide-react";
import "../../styles/Sidebar.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <AlignJustify
            size={24}
            className={`arrow ${isOpen ? "" : "rotate"}`}
          />
        </button>

        <nav>
          <ul>
            <li>
              <Link to="/admin/categories">
                <Tag size={20} />
                <span>Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/products">
                <Box size={20} />
                <span>Products</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
