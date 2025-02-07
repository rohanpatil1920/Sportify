import { Link } from "react-router-dom";
import { useAuth } from "../context/authenticationContext";
import { colors, spacing } from "../styles/style";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: `${spacing.medium} 50px`,
        backgroundColor: colors.secondary,
        color: "white",
      }}
    >
      <Link
        to="/"
        style={{
          fontWeight: "bold",
          fontSize: "24px",
          color: "white",
          textDecoration: "none",
        }}
      >
        Sportify
      </Link>

      <div>
        {user ? (
          <button
            onClick={logout}
            style={{
              padding: "10px 25px",
              backgroundColor: colors.primary,
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/auth"
              style={{
                marginRight: spacing.large,
                color: "white",
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
            <Link to="/auth">
              <button
                style={{
                  padding: "10px 25px",
                  backgroundColor: colors.primary,
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
