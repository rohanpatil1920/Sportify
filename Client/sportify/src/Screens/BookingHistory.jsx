// BookingHistoryPage.jsx
import React, { useEffect, useState } from "react";
import { getPlayerBookings } from "../Services/bookingServices";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { toast } from "react-toastify";
import API from "../Services/api";

export default function BookingHistoryPage() {
  const playerId = sessionStorage.getItem("id");
  // console.log(playerId);
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      const data = await getPlayerBookings(playerId);
      console.log(data);
      const historyData = data.filter((booking) => {
        const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
        return bookingDateTime < new Date();
      });

      setBookingHistory(historyData);
    } catch (error) {
      toast.error("Error fetching booking history");
      // console.error("Error fetching booking history:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <section className="text-center py-16 bg-blue-600 text-white rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Booking History</h1>
        <p className="text-lg">Your past bookings</p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Your Booking History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookingHistory.length > 0 ? (
            bookingHistory.map((booking) => (
              <div
                key={booking.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-xl font-semibold">{booking.venueName}</h3>
                <p className="text-gray-600 text-sm">
                  Booking ID: {booking.id}
                </p>
                <div className="mt-2">
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold">Payment Status: </span>
                    {booking.paymentStatus}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold">Date: </span>
                    {booking.date}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold">Time Slot: </span>
                    {booking.time}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No booking history available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
