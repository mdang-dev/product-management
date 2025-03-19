import React from "react"; // Ensure the file exists and is correctly imported

const Header: React.FC = () => {
  return (
    <header className="header">
      <div>
        <h3>Product Management</h3>
      </div>
      <div>
        <span>Home</span>
        <span>Products</span>
        <span>Contact</span>
      </div>
      <div>
        <span>Login</span>
        <span>Sign Up</span>
      </div>
    </header>
  );
};

export default Header;
