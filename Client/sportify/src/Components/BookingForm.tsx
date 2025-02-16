import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../Services/api";

type CourtResponseDTO = {
  id: number;
  sportId: number;
  pricePerHour: number;
};

const BookingForm: React.FC = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();
  const playerId = JSON.parse(sessionStorage.getItem("id") || "{}");

  if (!playerId) {
    toast.error("Player ID not found. Please log in again.");
    navigate("/login");
    return null;
  }

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [availableCourts, setAvailableCourts] = useState<CourtResponseDTO[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await API.get(`/venue/${venueId}/courts`);
        setAvailableCourts(response.data);
        if (response.data.length > 0) {
          setSelectedCourt(response.data[0].id);
        } else {
          toast.error("No courts available for this venue.");
          setError("No courts available for this venue.");
        }
      } catch (ex) {
        toast.error("Failed to load courts. Please try again later.");
        setError("Failed to load courts. Please try again later.");
      }
    };

    fetchCourts();
  }, [venueId]);

  useEffect(() => {
    const generateSlots = () => {
      const slots = [];
      const startTime = 6;
      const endTime = 23;

      for (let hour = startTime; hour < endTime; hour++) {
        const slot = `${hour}:00 - ${hour + 1}:00`;
        slots.push(slot);
      }

      const today = new Date().toISOString().split("T")[0];
      if (selectedDate === today) {
        const currentHour = new Date().getHours();
        return slots.filter(
          (slot) => parseInt(slot.split(":")[0], 10) > currentHour
        );
      }

      return slots;
    };

    setAvailableSlots(generateSlots());
  }, [selectedDate]);

  const handleBooking = async () => {
    if (selectedSlots.length === 0 || !selectedCourt) {
      toast.error("Please select at least one slot.");
      setError("Please select at least one slot.");
      return;
    }

    try {
      const formattedDate = new Date(selectedDate).toISOString().split("T")[0];
      const startTimeString = `${formattedDate}T${convertTo24Hour(
        selectedSlots[0].split(" - ")[0]
      )}`;
      const endTimeString = `${formattedDate}T${convertTo24Hour(
        selectedSlots[selectedSlots.length - 1].split(" - ")[1]
      )}`;

      const bookingRequestDTO = {
        bookingDate: selectedDate,
        startTime: startTimeString,
        endTime: endTimeString,
        court: selectedCourt,
        venueId: parseInt(venueId, 10),
      };

      const response = await API.post(
        `/players/bookings/${playerId}/create`,
        bookingRequestDTO
      );
      toast.success("Booking successfully created!");
      navigate("/player-dashboard");
    } catch (ex: any) {
      toast.error("Booking failed:", ex);
      setError(
        ex.response?.data?.message ||
          "An error occurred while creating the booking. Please try again."
      );
    }
  };

  const convertTo24Hour = (time: string) => {
    const [hours, minutes] = time.split(/[: ]/);
    const period = time.slice(-2).toUpperCase();
    let hour = parseInt(hours, 10);
    if (period === "PM" && hour < 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, "0")}:${minutes}:00`;
  };

  const selectedCourtPrice = availableCourts.find(
    (court) => court.id === selectedCourt
  )?.pricePerHour;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Book Now</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 border rounded-md bg-white text-black"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Select Court</label>
        <select
          value={selectedCourt || ""}
          onChange={(e) => setSelectedCourt(Number(e.target.value))}
          className="w-full p-2 border rounded-md bg-white"
        >
          {availableCourts.map((court) => (
            <option key={court.id} value={court.id}>
              Court {court.id} (Sport ID: {court.sportId}, ₹
              {court.pricePerHour}/hour)
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Available Slots</h3>
        <div className="grid grid-cols-2 gap-2">
          {availableSlots.map((slot) => (
            <button
              key={slot}
              onClick={() =>
                setSelectedSlots(
                  selectedSlots.includes(slot)
                    ? selectedSlots.filter((s) => s !== slot)
                    : [...selectedSlots, slot]
                )
              }
              className={`p-2 border rounded-md transition-all ${
                selectedSlots.includes(slot)
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Pricing</h3>
        <p className="text-gray-600">
          ₹{selectedCourtPrice || 0}/hour • {selectedSlots.length} slots
          selected
        </p>
        <p className="text-xl font-bold mt-2">
          Total: ₹{(selectedCourtPrice || 0) * selectedSlots.length}
        </p>
      </div>

      <button
        onClick={handleBooking}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default BookingForm;
