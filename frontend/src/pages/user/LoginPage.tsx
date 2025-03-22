import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/LoginPage.scss";
import { useAuth } from "../../provider/AuthProvider";
import { User } from "../../model/user.model";
import { api } from "../../lib/api";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
    const fetchedUser = await api
      .get("/api/users/my-info")
      .then((res) => res.data);
    if ((fetchedUser as User).roles.some((role) => role.name === "ADMIN")) {
      navigate("/admin/products/list");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <form className="login-page__form" onSubmit={handleLogin}>
        <h2 className="login-page__title">Login</h2>
        <div className="login-page__field">
          <label htmlFor="username" className="login-page__label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="login-page__input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="login-page__field">
          <label htmlFor="password" className="login-page__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="login-page__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-page__button">
          Login
        </button>
        <button
          type="button"
          className="login-page__button login-page__button--secondary"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
        <div className="login-page__footer">
          <p>
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
