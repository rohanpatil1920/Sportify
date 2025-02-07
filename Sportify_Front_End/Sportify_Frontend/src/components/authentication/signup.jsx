import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../context/api";
import { colors, spacing } from "../../styles/constants";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "+91",
    role: "player",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `/users/signup/${formData.role}`;
      await API.post(endpoint, formData);
      navigate("/login");
    } catch (error) {
      setErrors(error.response?.data || { message: "Registration failed" });
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
          Create your account
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: spacing.medium }}>
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
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
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
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
            <label>Mobile Number</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <select
                value={formData.contact.substring(0, 3)}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                style={{
                  width: "80px",
                  padding: spacing.small,
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
              </select>
              <input
                type="tel"
                value={formData.contact.substring(3)}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: formData.contact.substring(0, 3) + e.target.value,
                  })
                }
                style={{
                  flex: 1,
                  padding: spacing.small,
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: spacing.medium }}>
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
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
            <label>Role</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              style={{
                width: "100%",
                padding: spacing.small,
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              <option value="player">Player</option>
              <option value="facilityowner">Facility Owner</option>
              <option value="admin">Admin</option>
            </select>
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
            Sign Up
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: spacing.medium }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: colors.primary }}>
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
