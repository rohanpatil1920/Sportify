import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API from "../Services/api";

const BookingStats = ({ facilityOwnerId }) => {
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    const fetchTotalBookings = async () => {
      try {
        const response = await API.get(`/venue/total/${facilityOwnerId}`);
        setTotalBookings(response.data);
      } catch (error) {
        toast.error("Error fetching total bookings");
        // console.error("Error fetching total bookings:", error);
      }
    };

    fetchTotalBookings();
  }, [facilityOwnerId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Total Bookings</h2>
      <p className="text-gray-600 text-3xl mt-2">{totalBookings}</p>
    </div>
  );
};

export default BookingStats;
