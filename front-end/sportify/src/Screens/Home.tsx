import ReactJ from "react";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  // Mock data for upcoming bookings
  const upcomingBookings = [
    { id: 1, venue: "Tennis Court A", date: "2023-06-15", time: "14:00-16:00" },
    {
      id: 2,
      venue: "Basketball Court 2",
      date: "2023-06-18",
      time: "10:00-12:00",
    },
  ];

  return (
    <div
      className=" container mx-auto px-6 py-8 bg-white text-black;"
    >
      {/* Hero Section */}
      <section className="text-center py-16 bg-blue-600 text-white rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Sportify</h1>
        <p className="text-lg">Book your favorite sports venues with ease.</p>
      </section>

      {/* Player Dashboard Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Player Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Bookings Card */}
          <div className="border p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Upcoming Bookings</h3>
            <p className="text-gray-500 mb-4">
              Your scheduled sports activities
            </p>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <div key={booking.id} className="mb-4 p-4 border rounded-lg">
                  <h4 className="font-semibold">{booking.venue}</h4>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <ClockIcon className="mr-2 h-4 w-4" />
                    <span>{booking.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No upcoming bookings.</p>
            )}
          </div>

          {/* Quick Actions */}
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
                to="/history"
                className="block w-full border py-2 text-center rounded-lg hover:bg-gray-100"
              >
                View Booking History
              </Link>
              <Link
                to="/profile"
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
