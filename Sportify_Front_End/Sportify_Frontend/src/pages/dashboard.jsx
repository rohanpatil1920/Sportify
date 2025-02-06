import { useAuth } from "../context/authenticationContext";
import { colors, spacing } from "../styles/constants";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div
      style={{
        padding: spacing.large,
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ color: colors.primary, marginBottom: spacing.large }}>
        Dashboard
      </h1>

      <div
        style={{
          backgroundColor: "white",
          padding: spacing.large,
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: spacing.medium }}>Profile Information</h2>

        <div style={{ marginBottom: spacing.small }}>
          <strong>Username:</strong> {user?.username}
        </div>

        <div style={{ marginBottom: spacing.small }}>
          <strong>Email:</strong> {user?.email}
        </div>

        <div style={{ marginBottom: spacing.small }}>
          <strong>Contact:</strong> {user?.contact}
        </div>

        <div style={{ marginBottom: spacing.medium }}>
          <strong>Role:</strong> {user?.role}
        </div>

        <div
          style={{
            display: "flex",
            gap: spacing.small,
            marginTop: spacing.large,
          }}
        >
          <button
            style={{
              padding: `${spacing.small} ${spacing.medium}`,
              backgroundColor: colors.primary,
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Edit Profile
          </button>

          {user?.role === "player" && (
            <button
              style={{
                padding: `${spacing.small} ${spacing.medium}`,
                backgroundColor: colors.secondary,
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              View Bookings
            </button>
          )}

          {user?.role === "facilityowner" && (
            <button
              style={{
                padding: `${spacing.small} ${spacing.medium}`,
                backgroundColor: colors.secondary,
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Manage Facilities
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
