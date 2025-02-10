import axios from "axios";

const API_BASE_URL = "http://localhost:8080/booking";

// Fetch bookings for a player
export const getPlayerBookings = async (playerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${playerId}/view`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

// Fetch booking by ID (for editing)
// export const getBookingById = async (playerId, bookingId) => {
//   try {
//     const response = await axios.get(
//       `${API_BASE_URL}/${playerId}/view/${bookingId}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching booking details:", error);
//     return null;
//   }
// };

// Update booking details
export const updateBooking = async (playerId, bookingId, bookingData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${playerId}/update/${bookingId}`,
      bookingData
    );
    return response.data; // Return the updated booking data or success message
  } catch (error) {
    console.error("Error updating booking:", error);
    return null; // Handle error appropriately
  }
};

// Delete a booking
export const deleteBooking = async (playerId, bookingId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${playerId}/delete/${bookingId}`
    );
    return response.data; // Return the success response
  } catch (error) {
    console.error("Error deleting booking:", error);
    return null; // Handle error appropriately
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/booking/${bookingId}`
    );
    return response.data; // ✅ Return single booking object
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    return null;
  }
};
