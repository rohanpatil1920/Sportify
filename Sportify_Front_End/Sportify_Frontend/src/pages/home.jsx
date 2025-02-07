import { useAuth } from "../context/authenticationContext";
import { colors } from "../styles/constants";

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ color: colors.primary }}>
        {user ? `Welcome back, ${user.username}!` : "Welcome to Sportify"}
      </h1>
      <p style={{ color: colors.text, fontSize: "18px" }}>
        Your ultimate sports community platform
      </p>
    </div>
  );
};

export default Home;
