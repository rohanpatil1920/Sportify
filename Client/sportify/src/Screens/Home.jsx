// HomePage.jsx
import React, { useEffect, useState } from "react";
import { CalendarIcon, ClockIcon, Trash, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { getPlayerBookings, deleteBooking } from "../Services/bookingServices";
import { toast } from "react-toastify";
import API from "../Services/api";

export default function HomePage() {
  const playerId = sessionStorage.getItem("id");
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const upcomingData = await getPlayerBookings(playerId);
      setUpcomingBookings(upcomingData);
    } catch (error) {
      toast.error("Error fetching bookings");
      // console.error("Error fetching bookings:", error);
    }
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const result = await deleteBooking(playerId, bookingId);
      if (result) {
        toast.success("Booking deleted successfully!");
        alert("Booking deleted successfully!");
        fetchBookings();
      }
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 bg-white">
      <section className="text-center py-16 bg-blue-600 text-white rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Sportify</h1>
        <p className="text-lg">Book your favorite sports venues with ease.</p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Player Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Bookings Section */}
          <div className="border p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Upcoming Bookings</h3>
            <p className="text-gray-500 mb-4">
              Your scheduled sports activities
            </p>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="mb-4 p-4 border rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold">{booking.venueName}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <ClockIcon className="mr-2 h-4 w-4" />
                      <span>{booking.time}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-white-600 hover:text-blue-900 bg-white border-gray-400"
                      onClick={() => handleDelete(booking.id)}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                    {/* <Link
                      to={`/edit-booking/${booking.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-5 w-5" />
                    </Link> */}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No upcoming bookings.</p>
            )}
          </div>

          {/* Quick Actions Section */}
          <div className="border p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
            <p className="text-gray-500 mb-4">Manage your sports activities</p>
            <div className="space-y-4">
              <Link
                to="/venues"
                className="block w-full bg-blue-600 text-white py-2 text-center rounded-lg hover:bg-blue-700"
              >
                Book a Venue
              </Link>
              <Link
                to="/history" // Link to the Booking History Page
                className="block w-full border py-2 text-center rounded-lg hover:bg-gray-100"
              >
                View Booking History
              </Link>
              <Link
                to="/profile-update" // Navigate to profile update page
                className="block w-full border py-2 text-center rounded-lg hover:bg-gray-100"
              >
                Update Profile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
