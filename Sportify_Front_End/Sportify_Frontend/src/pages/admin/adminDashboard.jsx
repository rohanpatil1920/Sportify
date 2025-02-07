import React, { useState, useEffect } from "react";
import API from "../../context/api";
import { useAuth } from "../../context/authenticationContext";
import { colors, spacing } from "../../styles/constants";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("players");
  const [deletionRequests, setDeletionRequests] = useState([]);
  const [players, setPlayers] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === "players") {
          const res = await API.getAllPlayers();
          setPlayers(res.data);
        } else if (activeTab === "owners") {
          const res = await API.getAllOwners();
          setOwners(res.data);
        } else {
          const res = await API.getDeletionRequests();
          setDeletionRequests(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [activeTab]);

  const handleProcessRequest = async (requestId, approve) => {
    try {
      await API.processDeletion(user.id, requestId, approve);
      setDeletionRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Error processing request:", error);
    }
  };

  return (
    <div style={{ padding: spacing.large }}>
      <div
        style={{
          display: "flex",
          gap: spacing.medium,
          marginBottom: spacing.large,
        }}
      >
        <button
          onClick={() => setActiveTab("players")}
          style={{
            padding: `${spacing.small} ${spacing.medium}`,
            backgroundColor:
              activeTab === "players" ? colors.primary : colors.secondary,
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Players
        </button>
        <button
          onClick={() => setActiveTab("owners")}
          style={{
            padding: `${spacing.small} ${spacing.medium}`,
            backgroundColor:
              activeTab === "owners" ? colors.primary : colors.secondary,
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Facility Owners
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          style={{
            padding: `${spacing.small} ${spacing.medium}`,
            backgroundColor:
              activeTab === "requests" ? colors.primary : colors.secondary,
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Deletion Requests
        </button>
      </div>

      {activeTab === "players" && (
        <div>
          <h2>Players List</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: spacing.medium,
            }}
          >
            {players.map((player) => (
              <div
                key={player.id}
                style={{
                  padding: spacing.medium,
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <h3>{player.username}</h3>
                <p>Email: {player.email}</p>
                <p>Contact: {player.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "owners" && (
        <div>
          <h2>Facility Owners List</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: spacing.medium,
            }}
          >
            {owners.map((owner) => (
              <div
                key={owner.id}
                style={{
                  padding: spacing.medium,
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <h3>{owner.username}</h3>
                <p>Email: {owner.email}</p>
                <p>Contact: {owner.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "requests" && (
        <div>
          <h2>Pending Deletion Requests</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: spacing.medium,
            }}
          >
            {deletionRequests.map((request) => (
              <div
                key={request.id}
                style={{
                  padding: spacing.medium,
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <h3>{request.userName}</h3>
                <p>Reason: {request.reason}</p>
                <p>
                  Requested: {new Date(request.createdOn).toLocaleDateString()}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: spacing.small,
                    marginTop: spacing.medium,
                  }}
                >
                  <button
                    onClick={() => handleProcessRequest(request.id, true)}
                    style={{
                      padding: `${spacing.small} ${spacing.medium}`,
                      backgroundColor: colors.primary,
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleProcessRequest(request.id, false)}
                    style={{
                      padding: `${spacing.small} ${spacing.medium}`,
                      backgroundColor: colors.error,
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
