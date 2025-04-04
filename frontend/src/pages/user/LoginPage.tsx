import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/LoginPage.scss";
import { toast, ToastContainer } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignIn } from "../../auth/useSignIn";
import { useUser } from "../../auth/useUser";

interface FormData {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { mutate: signIn } = useSignIn();
  const { user } = useUser();

  const handleLogin: SubmitHandler<FormData> = async (data) => {
    signIn(data, {
      onSuccess: () => {
        setTimeout(() => {
          navigate(
            user?.roles.some((role) => role.name === "ADMIN")
              ? "/admin/products/list"
              : "/"
          );
        }, 2000);
      },
      onError: () => {
        toast.error("Invalid username or password !");
      },
    });
  };

  return (
    <div className="login-page">
      <form className="login-page__form" onSubmit={handleSubmit(handleLogin)}>
        <h2 className="login-page__title">Login</h2>
        <div className="login-page__field">
          <label htmlFor="username" className="login-page__label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="login-page__input"
            {...register("username")}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="login-page__error">{errors.username.message}</p>
          )}
        </div>
        <div className="login-page__field">
          <label htmlFor="password" className="login-page__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="login-page__input"
            {...register("password")}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="login-page__error">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="login-page__button"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
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
            Don't have an account? <Link to="/auth/sign-up">Sign Up</Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
