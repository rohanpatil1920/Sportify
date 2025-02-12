// import React from 'react';

// const BookingStats = () => {
//   const totalBookings = 45; // Example data

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold">Total Bookings</h2>
//       <p className="text-gray-600 text-3xl mt-2">{totalBookings}</p>
//     </div>
//   );
// };

// export default BookingStats;

import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingStats = ({ facilityOwnerId }) => {
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    const fetchTotalBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/venue/total/${facilityOwnerId}`
        );
        setTotalBookings(response.data);
      } catch (error) {
        console.error("Error fetching total bookings:", error);
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
