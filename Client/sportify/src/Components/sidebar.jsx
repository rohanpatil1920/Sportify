import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="text-white flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">Turf Booking</span>
      </div>
      <nav>
        <a
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Bookings
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Courts
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Players
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
