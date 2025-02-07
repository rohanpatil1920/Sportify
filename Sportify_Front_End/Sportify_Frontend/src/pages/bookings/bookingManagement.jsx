import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authenticationContext";
import API from "../../context/api";
import { colors, spacing } from "../../styles/constants";

const BookingManagement = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    venueId: "",
    courtId: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
  });
  const [venues, setVenues] = useState([]);
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, venuesRes] = await Promise.all([
          API.getBookings(user.id),
          API.searchVenues({}),
        ]);
        setBookings(bookingsRes.data);
        setVenues(venuesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (user.role === "PLAYER") fetchData();
  }, [user]);

  useEffect(() => {
    const fetchCourts = async () => {
      if (newBooking.venueId) {
        try {
          const res = await API.getVenueCourts(newBooking.venueId);
          setCourts(res.data);
        } catch (error) {
          console.error("Error fetching courts:", error);
        }
      }
    };
    fetchCourts();
  }, [newBooking.venueId]);

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    try {
      await API.createBooking(user.id, newBooking);
      setNewBooking({
        venueId: "",
        courtId: "",
        bookingDate: "",
        startTime: "",
        endTime: "",
      });
      const res = await API.getBookings(user.id);
      setBookings(res.data);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div style={{ padding: spacing.large }}>
      {user.role === "PLAYER" && (
        <div
          style={{
            marginBottom: spacing.large,
            padding: spacing.medium,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Create New Booking</h2>
          <form onSubmit={handleCreateBooking}>
            <div style={{ marginBottom: spacing.medium }}>
              <select
                value={newBooking.venueId}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, venueId: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: spacing.small,
                  marginBottom: spacing.small,
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
                required
              >
                <option value="">Select Venue</option>
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name}
                  </option>
                ))}
              </select>

              <select
                value={newBooking.courtId}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, courtId: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: spacing.small,
                  marginBottom: spacing.small,
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
                required
                disabled={!newBooking.venueId}
              >
                <option value="">Select Court</option>
                {courts.map((court) => (
                  <option key={court.id} value={court.id}>
                    {court.sportName} (₹{court.pricePerHour}/hour)
                  </option>
                ))}
              </select>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: spacing.small,
                }}
              >
                <input
                  type="date"
                  value={newBooking.bookingDate}
                  onChange={(e) =>
                    setNewBooking({
                      ...newBooking,
                      bookingDate: e.target.value,
                    })
                  }
                  style={{
                    padding: spacing.small,
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                  required
                />
                <input
                  type="time"
                  value={newBooking.startTime}
                  onChange={(e) =>
                    setNewBooking({ ...newBooking, startTime: e.target.value })
                  }
                  style={{
                    padding: spacing.small,
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                  required
                />
                <input
                  type="time"
                  value={newBooking.endTime}
                  onChange={(e) =>
                    setNewBooking({ ...newBooking, endTime: e.target.value })
                  }
                  style={{
                    padding: spacing.small,
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                  required
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
              Book Now
            </button>
          </form>
        </div>
      )}

      <h2>Your Bookings</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: spacing.medium,
        }}
      >
        {bookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              padding: spacing.medium,
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{booking.venueName}</h3>
            <p>Court: {booking.courtSport}</p>
            <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
            <p>
              Time: {booking.startTime} - {booking.endTime}
            </p>
            <p>Total: ₹{booking.totalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingManagement;
