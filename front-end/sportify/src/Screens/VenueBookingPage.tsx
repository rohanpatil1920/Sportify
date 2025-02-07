// VenueBookingPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import VenueDetails from "../Components/VenueDetails";
import BookingForm from "../Components/BookingForm";

// Mock venue data (replace with API call)
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

const VenueBookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const venue = venues.find((v) => v.id === parseInt(id || ""));

  if (!venue) {
    return <div>Venue not found</div>;
  }

  return (
    <div className="bg-white container mx-auto px-4 py-8">
      <VenueDetails {...venue} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">{/* Add reviews section here */}</div>
        <div className="md:col-span-1 ">
          <BookingForm pricePerHour={venue.pricePerHour} slots={venue.slots} />
        </div>
      </div>
    </div>
  );
};

export default VenueBookingPage;
