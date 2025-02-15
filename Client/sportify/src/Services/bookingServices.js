import axios from "axios";
import { toast } from "react-toastify";
import API from "./api";

export const getPlayerBookings = async (playerId) => {
  try {
    const response = await API.get(`players/bookings/${playerId}/view`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching bookings");
    // console.error("Error fetching bookings:", error);
    return [];
  }
};

export const updateBooking = async (playerId, bookingId, bookingData) => {
  try {
    const response = await API.put(
      `players/bookings/${playerId}/update/${bookingId}`,
      bookingData
    );
    return response.data;
  } catch (error) {
    toast.error("Error updating booking");
    // console.error("Error updating booking:", error);
    return null;
  }
};

export const deleteBooking = async (playerId, bookingId) => {
  try {
    const response = await API.delete(
      `players/bookings/${playerId}/delete/${bookingId}`
    );
    return response.data;
  } catch (error) {
    toast.error("Error deleting booking");
    // console.error("Error deleting booking:", error);
    return null;
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const response = await API.get(`players/bookings/${bookingId}`);
    return response.data; //
  } catch (error) {
    toast.error("Error fetching booking by ID");
    // console.error("Error fetching booking by ID:", error);
    return null;
  }
};
