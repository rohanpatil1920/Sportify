import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authenticationContext";
import API from "../../context/api";
import { colors, spacing } from "../../styles/constants";

const VenueManagement = () => {
  const { user } = useAuth();
  const [venues, setVenues] = useState([]);
  const [newVenue, setNewVenue] = useState({
    name: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });
  const [searchParams, setSearchParams] = useState({
    locality: "",
    sportName: "",
    available: false,
  });

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await API.searchVenues(searchParams);
        setVenues(res.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };
    fetchVenues();
  }, [searchParams]);

  const handleCreateVenue = async (e) => {
    e.preventDefault();
    try {
      await API.registerVenue(user.id, newVenue);
      setNewVenue({
        name: "",
        description: "",
        address: { street: "", city: "", state: "", zipCode: "" },
      });
      const res = await API.searchVenues(searchParams);
      setVenues(res.data);
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  };

  return (
    <div style={{ padding: spacing.large }}>
      {user.role === "FACILITYOWNER" && (
        <div
          style={{
            marginBottom: spacing.large,
            padding: spacing.medium,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Register New Venue</h2>
          <form onSubmit={handleCreateVenue}>
            <div style={{ marginBottom: spacing.medium }}>
              <input
                type="text"
                placeholder="Venue Name"
                value={newVenue.name}
                onChange={(e) =>
                  setNewVenue({ ...newVenue, name: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: spacing.small,
                  marginBottom: spacing.small,
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
                required
              />
              <textarea
                placeholder="Description"
                value={newVenue.description}
                onChange={(e) =>
                  setNewVenue({ ...newVenue, description: e.target.value })
                }
                style={{
                  width: "100%",
                  height: "100px",
                  padding: spacing.small,
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: spacing.small,
                }}
              >
                <input
                  type="text"
                  placeholder="Street"
                  value={newVenue.address.street}
                  onChange={(e) =>
                    setNewVenue({
                      ...newVenue,
                      address: { ...newVenue.address, street: e.target.value },
                    })
                  }
                  style={{
                    padding: spacing.small,
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newVenue.address.city}
                  onChange={(e) =>
                    setNewVenue({
                      ...newVenue,
                      address: { ...newVenue.address, city: e.target.value },
                    })
                  }
                  style={{
                    padding: spacing.small,
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
                <input
                  type="text"
                  placeholder="State"
                  value={newVenue.address.state}
                  onChange={(e) =>
                    setNewVenue({
                      ...newVenue,
                      address: { ...newVenue.address, state: e.target.value },
                    })
                  }
                  style={{
                    padding: spacing.small,
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={newVenue.address.zipCode}
                  onChange={(e) =>
                    setNewVenue({
                      ...newVenue,
                      address: { ...newVenue.address, zipCode: e.target.value },
                    })
                  }
                  style={{
                    padding: spacing.small,
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              style={{
                padding: `${spacing.small} ${spacing.medium}`,
                backgroundColor: colors.primary,
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Register Venue
            </button>
          </form>
        </div>
      )}

      <div style={{ marginBottom: spacing.large }}>
        <h2>Search Venues</h2>
        <div
          style={{
            display: "flex",
            gap: spacing.small,
            marginBottom: spacing.medium,
          }}
        >
          <input
            type="text"
            placeholder="Locality"
            value={searchParams.locality}
            onChange={(e) =>
              setSearchParams({ ...searchParams, locality: e.target.value })
            }
            style={{
              padding: spacing.small,
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          <input
            type="text"
            placeholder="Sport Name"
            value={searchParams.sportName}
            onChange={(e) =>
              setSearchParams({ ...searchParams, sportName: e.target.value })
            }
            style={{
              padding: spacing.small,
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.small,
            }}
          >
            <input
              type="checkbox"
              checked={searchParams.available}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  available: e.target.checked,
                })
              }
            />
            Available Only
          </label>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: spacing.medium,
        }}
      >
        {venues.map((venue) => (
          <div
            key={venue.id}
            style={{
              padding: spacing.medium,
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{venue.name}</h3>
            <p>{venue.description}</p>
            <p>
              Location: {venue.address.street}, {venue.address.city}
            </p>
            <div style={{ marginTop: spacing.medium }}>
              <h4>Courts:</h4>
              {venue.courts.map((court) => (
                <div
                  key={court.id}
                  style={{
                    padding: spacing.small,
                    margin: spacing.small,
                    backgroundColor: colors.background,
                    borderRadius: "4px",
                  }}
                >
                  <p>Sport: {court.sportName}</p>
                  <p>Price: ₹{court.pricePerHour}/hour</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueManagement;
