// src/components/VenueCard.jsx
import React from "react";

const VenueCard = ({ venue }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={venue.image}
        alt={venue.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{venue.name}</h2>
        <p className="text-gray-600">{venue.location}</p>
        <p className="text-gray-600">{venue.distance}</p>
        <div className="flex flex-wrap mt-2">
          {venue.sports.map((sport) => (
            <span
              key={sport}
              className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
            >
              {sport}
            </span>
          ))}
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
