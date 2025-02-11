import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type CourtResponseDTO = {
  id: number;
  sportId: number;
  pricePerHour: number;
};

type BookingFormProps = {
  pricePerHour: number;
  slots: string[];
};

const BookingForm: React.FC<BookingFormProps> = ({ pricePerHour, slots }) => {
  const { venueId } = useParams<{ venueId: string }>();
  // const playerId = JSON.parse(sessionStorage.getItem("user") || "{}").id;

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const playerId = user.id; // Extract playerId from session storage.

  if (!playerId) {
    alert("Player ID not found. Please log in again.");
    return;
  }

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [availableCourts, setAvailableCourts] = useState<CourtResponseDTO[]>([]);
  const [formDetails, setFormDetails] = useState({ name: "", email: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch available courts for the venue
    const fetchCourts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/venue/${venueId}/courts`
        );
        setAvailableCourts(response.data);
        if (response.data.length > 0) {
          setSelectedCourt(response.data[1].id); // Default to the first court
        }else {
          setError("No courts available for this venue.");
        }
      } catch (ex) {
        console.error("Error fetching courts:", ex);
        setError("Failed to load courts. Please try again later.");
      }
    };

    fetchCourts();
  }, [venueId]);

  const handleBooking = async () => {
    if (
      !formDetails.name ||
      !formDetails.email ||
      selectedSlots.length === 0 ||
      !selectedCourt
    ) {
      setError("Please fill in all the details and select at least one slot.");
      return;
    }

// const startTime = new Date(
//     `${selectedDate}T${selectedSlots[0].split(" - ")[0]}`
//   ).toISOString(); // Ensure proper ISO format
//   const endTime = new Date(
//     `${selectedDate}T${selectedSlots[selectedSlots.length - 1].split(" - ")[1]}`
//   ).toISOString(); // Ensure proper ISO format

// const bookingRequestDTO = {
//     bookingDate: selectedDate,
//     startTime,
//     endTime,
//     courtId: selectedCourt,
//     venueId: parseInt(venueId, 10),
//   };

    try {

      // Format the date in `yyyy-MM-dd` format
    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

    // Convert slot times to `HH:mm:ss` format and construct startTime and endTime
    const startTimeString = `${formattedDate}T${convertTo24Hour(
      selectedSlots[0].split(" - ")[0]
    )}`;
    const endTimeString = `${formattedDate}T${convertTo24Hour(
      selectedSlots[selectedSlots.length - 1].split(" - ")[1]
    )}`;


    // Remove the 'Z' to make it compatible with LocalDateTime
     const startTime = startTimeString; // Already formatted without 'Z'
    const endTime = endTimeString; // Already formatted without 'Z'

     const bookingRequestDTO = {
      bookingDate: selectedDate, // `yyyy-MM-dd`
      startTime,
      endTime,
      court: selectedCourt,
      venueId: parseInt(venueId, 10),
    };

      const response = await axios.post(
        `http://localhost:8080/booking/${playerId}/create`,
        bookingRequestDTO
      );
      alert("Booking successfully created!");
      console.log("Booking Response:", response.data);
    } catch (ex: any) {
      console.error("Booking failed:", ex);
      setError(
        ex.response?.data?.message ||
          "An error occurred while creating the booking. Please try again."
      );
    }
  };

  const convertTo24Hour = (time: string) => {
  // Example input: "10:00 AM", "03:30 PM"
  const [hours, minutes] = time.split(/[: ]/);
  const period = time.slice(-2).toUpperCase(); // AM or PM

  let hour = parseInt(hours, 10);
  if (period === "PM" && hour < 12) hour += 12; // Add 12 hours for PM
  if (period === "AM" && hour === 12) hour = 0; // Midnight case

  return `${hour.toString().padStart(2, "0")}:${minutes}:00`; // HH:mm:ss
};

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
          className="w-full p-2 border rounded-md bg-white"
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
              Court {court.id} (Sport ID: {court.sportId}, ₹{court.pricePerHour}/hour)
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Available Slots</h3>
        <div className="grid grid-cols-2 gap-2 bg-white">
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() =>
                setSelectedSlots(
                  selectedSlots.includes(slot)
                    ? selectedSlots.filter((s) => s !== slot)
                    : [...selectedSlots, slot]
                )
              }
              className={`p-2 border rounded-md ${
                selectedSlots.includes(slot)
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
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
          ₹{pricePerHour}/hour • {selectedSlots.length} slots selected
        </p>
        <p className="text-xl font-bold mt-2">
          Total: ₹{pricePerHour * selectedSlots.length}
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleBooking();
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={formDetails.name}
          onChange={(e) =>
            setFormDetails({ ...formDetails, name: e.target.value })
          }
          className="w-full p-2 border rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          value={formDetails.email}
          onChange={(e) =>
            setFormDetails({ ...formDetails, email: e.target.value })
          }
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
