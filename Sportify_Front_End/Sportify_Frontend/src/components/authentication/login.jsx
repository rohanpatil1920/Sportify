import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authenticationContext";
import { colors, spacing } from "../../styles/constants";

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login button clicked!");

    try {
      const response = await login({
        email: credentials.email,
        password: credentials.password,
      });
      console.log("Login API Response:", response);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data);
      setErrors({ message: error.response?.data?.message || "Login failed" });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        padding: spacing.large,
        backgroundColor: colors.background,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: spacing.large,
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: spacing.medium }}>
            <label>Email</label>
            <input
              type="text"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  email: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: spacing.small,
                margin: "8px 0",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: spacing.medium }}>
            <label>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    password: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: spacing.small,
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: colors.text,
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: spacing.medium,
            }}
          >
            <label style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" style={{ marginRight: spacing.small }} />
              Remember me
            </label>
            <Link to="/forgot-password" style={{ color: colors.primary }}>
              Forgot password?
            </Link>
          </div>

          {errors.message && (
            <div style={{ color: "red", marginBottom: spacing.small }}>
              {errors.message}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: spacing.medium,
              backgroundColor: colors.primary,
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Log in
          </button>
        </form>

        <div
          style={{
            margin: `${spacing.large} 0`,
            textAlign: "center",
            color: colors.text,
          }}
        >
          <span style={{ padding: `0 ${spacing.small}` }}>
            Or continue with
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: spacing.small,
            marginBottom: spacing.large,
          }}
        >
          <button
            style={{
              flex: 1,
              padding: spacing.small,
              backgroundColor: "#DB4437",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Google
          </button>
          <button
            style={{
              flex: 1,
              padding: spacing.small,
              backgroundColor: "#4267B2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Facebook
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            color: colors.text,
            marginBottom: spacing.medium,
          }}
        >
          By continuing, you agree to our{" "}
          <Link to="/terms" style={{ color: colors.primary }}>
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" style={{ color: colors.primary }}>
            Privacy Policy
          </Link>
        </p>

        <p style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: colors.primary }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
