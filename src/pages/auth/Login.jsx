import React, { useEffect, useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiUser,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCredentials } from "../../features/auth/authSlice";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const {
    isAuthenticated,
    user,
  } = useAppSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /*
   * If the user is already authenticated,
   * don't show the login page again.
   */
  useEffect(() => {
    if (!isAuthenticated || !user) {
      return;
    }

    if (user.userType === "SUPER_ADMIN") {
      navigate("/super-admin/dashboard", {
        replace: true,
      });

      return;
    }

    navigate("/", {
      replace: true,
    });
  }, [
    isAuthenticated,
    user,
    navigate,
  ]);

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!formData.username.trim()) {
      setErrorMessage(
        "Please enter your username."
      );

      return;
    }

    if (!formData.password) {
      setErrorMessage(
        "Please enter your password."
      );

      return;
    }

    try {
      const response = await login({
        username: formData.username.trim(),
        password: formData.password,
      }).unwrap();

      if (!response?.success) {
        setErrorMessage(
          response?.message ||
            "Login failed."
        );

        return;
      }

      const {
        token,
        user,
        role,
        company,
      } = response.data;

      dispatch(
        setCredentials({
          token,
          user,
          role,
          company,
        })
      );

      /*
       * Super Admin gets the platform dashboard.
       */
      if (
        user?.userType ===
        "SUPER_ADMIN"
      ) {
        navigate(
          "/super-admin/dashboard",
          {
            replace: true,
          }
        );

        return;
      }

      /*
       * Company users currently enter
       * the existing HRMS dashboard.
       */
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      const message =
        error?.data?.message ||
        error?.error ||
        "Unable to connect to the HRMS server.";

      setErrorMessage(message);
    }
  };

  return (
    <div className="login-page">

      <div className="login-shell">

        {/* LEFT SIDE */}

        <div className="login-brand-panel">

          <div className="brand-mark">
            H
          </div>

          <div>
            <h1>HRMS</h1>

            <p>
              Human Resource Management System
            </p>
          </div>

          <div className="brand-description">

            <span>
              Workforce management,
              simplified.
            </span>

            <p>
              Manage employees, attendance,
              leave, payroll and more from
              one secure platform.
            </p>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="login-form-panel">

          <div className="login-header">

            <span className="login-eyebrow">
              SECURE ACCESS
            </span>

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to continue to
              your HRMS portal.
            </p>

          </div>


          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* USERNAME */}

            <div className="login-field">

              <label htmlFor="username">
                Username
              </label>

              <div className="login-input-wrapper">

                <FiUser />

                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  value={
                    formData.username
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="username"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="login-field">

              <label htmlFor="password">
                Password
              </label>

              <div className="login-input-wrapper">

                <FiLock />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>

              </div>

            </div>


            {/* ERROR */}

            {errorMessage && (
              <div className="login-error">
                {errorMessage}
              </div>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading
                ? "Signing in..."
                : "Sign in"}
            </button>

          </form>


          <div className="login-footer">

            <span>
              Secure HRMS Platform
            </span>

            <span>
              ©{" "}
              {new Date().getFullYear()}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;