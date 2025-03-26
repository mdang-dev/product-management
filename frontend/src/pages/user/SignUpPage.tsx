import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/RegisterPage.scss";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../../lib/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleRegister: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/auth/register", {
        username: data.username,
        password: data.password,
      });

      if (response.status !== 201) {
        toast.error(response.data.message || "Failed to register.");
        return;
      }

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form
        className="register-page__form"
        onSubmit={handleSubmit(handleRegister)}
      >
        <h2 className="register-page__title">Register</h2>
        <div className="register-page__field">
          <label htmlFor="username" className="register-page__label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="register-page__input"
            {...register("username")}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="register-page__error">{errors.username.message}</p>
          )}
        </div>
        <div className="register-page__field">
          <label htmlFor="password" className="register-page__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="register-page__input"
            {...register("password")}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="register-page__error">{errors.password.message}</p>
          )}
        </div>
        <div className="register-page__field">
          <label htmlFor="confirmPassword" className="register-page__label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="register-page__input"
            {...register("confirmPassword")}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="register-page__error">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="register-page__button"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
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
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
