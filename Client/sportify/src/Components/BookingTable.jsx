import React from 'react';

const BookingTable = () => {
  const bookings = [
    { id: 1, customer: 'John Doe', date: '2023-10-01', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, customer: 'Jane Smith', date: '2023-10-02', time: '02:00 PM', status: 'Pending' },
    // Add more bookings as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Customer</th>
            <th className="text-left">Date</th>
            <th className="text-left">Time</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.customer}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;