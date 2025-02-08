// Fetch venue data from an API or define it statically

// const fetchVenues = async () => {
//     const response = await fetch('https://api.yoursite.com/venues');
//     const data = await response.json();
//     setVenues(data);
//   };
// VenueListPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const VenueListPage = () => {
  const navigate = useNavigate();

  // Mock venue data
  const venues = [
    {
      id: 1,
      name: "Nawu Sports Club",
      location: "Gahunje, Pune",
      rating: 4.5,
      sports: ["Box Cricket", "Football"],
      images: ["img1.jpg", "img2.jpg"],
      amenities: ["Parking", "Restrooms", "Refreshments", "Changing Space"],
      timing: "6 AM - 12 AM",
      pricePerHour: 2000,
      slots: ["6:00 AM - 8:00 AM", "4:00 PM - 6:00 PM"],
    },
    {
      id: 2,
      name: "Sunbeam Sports Club",
      location: "Phase 2, Pune",
      rating: 4.5,
      sports: ["Box Cricket"],
      images: [
        "https://via.placeholder.com/600x400?text=Image+1",
        "https://via.placeholder.com/600x400?text=Image+2",
        "https://via.placeholder.com/600x400?text=Image+3",
      ],
      amenities: ["Parking", "Restrooms", "Refreshments", "Changing Space"],
      timing: "6 AM - 12 AM",
      pricePerHour: 2000,
      slots: ["6:00 AM - 8:00 AM", "4:00 PM - 6:00 PM"],
    },
    {
      id: 3,
      name: "Nawu Sports Club",
      location: "Gahunje, Pune",
      rating: 4.5,
      sports: ["Box Cricket", "Football"],
      images: ["img1.jpg", "img2.jpg"],
      amenities: ["Parking", "Restrooms", "Refreshments", "Changing Space"],
      timing: "6 AM - 12 AM",
      pricePerHour: 2000,
      slots: ["6:00 AM - 8:00 AM", "4:00 PM - 6:00 PM"],
    },
    {
      id: 4,
      name: "Sunbeam Sports Club",
      location: "Phase 2, Pune",
      rating: 4.5,
      sports: ["Box Cricket"],
      images: [
        "https://via.placeholder.com/600x400?text=Image+1",
        "https://via.placeholder.com/600x400?text=Image+2",
        "https://via.placeholder.com/600x400?text=Image+3",
      ],
      amenities: ["Parking", "Restrooms", "Refreshments", "Changing Space"],
      timing: "6 AM - 12 AM",
      pricePerHour: 2000,
      slots: ["6:00 AM - 8:00 AM", "4:00 PM - 6:00 PM"],
    },
    // Add more venues here
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Venues in Pune</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={venue.images[0]}
              alt={venue.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
              <p className="text-gray-600 mb-2">{venue.location}</p>
              <div className="flex items-center space-x-2 mb-4">
                <span>⭐ {venue.rating}</span>
                <span>⏰ {venue.timing}</span>
              </div>
              <button
                onClick={() => navigate(`/venue/${venue.id}`)}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueListPage;
