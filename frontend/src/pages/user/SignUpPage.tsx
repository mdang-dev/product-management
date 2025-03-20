import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/RegisterPage.scss";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="register-page">
      <form className="register-page__form" onSubmit={handleRegister}>
        <h2 className="register-page__title">Register</h2>
        <div className="register-page__field">
          <label htmlFor="username" className="register-page__label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="register-page__input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="register-page__field">
          <label htmlFor="password" className="register-page__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="register-page__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="register-page__field">
          <label htmlFor="confirmPassword" className="register-page__label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="register-page__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" className="register-page__button">
          Register
        </button>
        <button
          type="button"
          className="register-page__button register-page__button--secondary"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
        <div className="register-page__footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
