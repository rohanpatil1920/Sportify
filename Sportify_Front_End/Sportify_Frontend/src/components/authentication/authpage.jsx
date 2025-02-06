import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authenticationContext";
import * as Components from "../Components";
import { colors } from "../../styles/constants";
import API from "../../context/api";

const AuthPage = () => {
  const [signIn, toggle] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Login State
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});

  // Signup State
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "+91",
    role: "player",
  });
  const [signupErrors, setSignupErrors] = useState({});

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginCredentials);
      navigate("/dashboard");
    } catch (error) {
      setLoginErrors({
        message: error.response?.data?.message || "Login failed",
      });
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/users/signup/${signupData.role}`, signupData);
      toggle(true); // Switch to login after successful registration
      setSignupErrors({});
    } catch (error) {
      setSignupErrors(
        error.response?.data || { message: "Registration failed" }
      );
    }
  };

  return (
    <Components.Container>
      {/* Sign Up Container */}
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignupSubmit}>
          <Components.Title>Create Account</Components.Title>

          <Components.Input
            type="text"
            placeholder="Username"
            value={signupData.username}
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
          />

          <Components.Input
            type="email"
            placeholder="Email"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />

          <div style={{ width: "100%", display: "flex", gap: "10px" }}>
            <select
              value={signupData.contact.substring(0, 3)}
              onChange={(e) =>
                setSignupData({ ...signupData, contact: e.target.value })
              }
              style={{
                width: "30%",
                padding: "12px 15px",
                border: "none",
                borderRadius: "4px",
              }}
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
            </select>
            <Components.Input
              type="tel"
              placeholder="Mobile Number"
              value={signupData.contact.substring(3)}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  contact: signupData.contact.substring(0, 3) + e.target.value,
                })
              }
            />
          </div>

          <Components.Input
            type="password"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />

          <select
            value={signupData.role}
            onChange={(e) =>
              setSignupData({ ...signupData, role: e.target.value })
            }
            style={{
              width: "100%",
              padding: "12px 15px",
              border: "none",
              borderRadius: "4px",
            }}
          >
            <option value="player">Player</option>
            <option value="facilityowner">Facility Owner</option>
            <option value="admin">Admin</option>
          </select>

          {signupErrors.message && (
            <div style={{ color: colors.error, fontSize: "0.9em" }}>
              {signupErrors.message}
            </div>
          )}

          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      {/* Sign In Container */}
      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleLoginSubmit}>
          <Components.Title>Sign in</Components.Title>

          <Components.Input
            type="email"
            placeholder="Email"
            value={loginCredentials.email}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                email: e.target.value,
              })
            }
          />

          <div style={{ position: "relative", width: "100%" }}>
            <Components.Input
              type={showLoginPassword ? "text" : "password"}
              placeholder="Password"
              value={loginCredentials.password}
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  password: e.target.value,
                })
              }
            />
            <button
              type="button"
              onClick={() => setShowLoginPassword(!showLoginPassword)}
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
              {showLoginPassword ? "Hide" : "Show"}
            </button>
          </div>

          {loginErrors.message && (
            <div style={{ color: colors.error, fontSize: "0.9em" }}>
              {loginErrors.message}
            </div>
          )}

          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button type="submit">Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      {/* Overlay Container */}
      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default AuthPage;
