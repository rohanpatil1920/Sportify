import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookingForm from "../Components/BookingForm";
import API from "../Services/api";
import { toast } from "react-toastify";

type VenueBookingPageProps = {};

const VenueBookingPage: React.FC<VenueBookingPageProps> = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const [pricePerHour, setPricePerHour] = useState<number>(0);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const playerId = JSON.parse(sessionStorage.getItem("user") || "{}").id;

  venueId: parseInt(venueId, 10),

  useEffect(() => {
    // Fetch venue details or any necessary data for booking
    const fetchVenueDetails = async () => {
      try {
        const response = await API.get(
          `/venue/${venueId}/courts`
        );

        if (response.data && response.data.length > 0) {
          // Set default price per hour based on the first court
          setPricePerHour(response.data[0].pricePerHour);

          // Generate available time slots
          const generatedSlots = [
            "08:00 AM - 09:00 AM",
            "09:00 AM - 10:00 AM",
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "12:00 PM - 01:00 PM",
            "01:00 PM - 02:00 PM",
            "02:00 PM - 03:00 PM",
            "03:00 PM - 04:00 PM",
          ];
          setAvailableSlots(generatedSlots);
        } else {
          toast.error("No courts are available for this venue.");
          setError("No courts are available for this venue.");
        }
      } catch (ex) {
        toast.error("Failed to load venue details. Please try again later.");
        // console.error("Error fetching venue details:", ex);
        setError("Failed to load venue details. Please try again later.");
      }
    };

    fetchVenueDetails();
  }, [venueId]);

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Venue Booking Page</h1>

      <p className="text-gray-700 mb-6">
        Welcome to the venue booking page. Select your preferred date, time
        slots, and courts to proceed.
      </p>

      <BookingForm pricePerHour={pricePerHour} slots={availableSlots} />
    </div>
  );
};

export default VenueBookingPage;
