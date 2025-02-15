import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBookingById,
  updateBooking,
  getPlayerBookings,
} from "../Services/bookingServices";
import API from "../Services/api";
import { toast } from "react-toastify";

const UpdateBookingPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    venueId: null,
    courtId: null,
    bookingDate: "",
    startTime: "",
    endTime: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const playerId = sessionStorage.getItem("id");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getPlayerBookings(playerId);
        const booking = data.find((b) => b.id === parseInt(bookingId));
        console.log(booking);
        if (booking) {
          setBookingData({
            venueId: booking.venueId,
            courtId: booking.courtId,
            bookingDate: booking.date,
            startTime: extractTime(booking.time.split(" - ")[0]),
            endTime: extractTime(booking.time.split(" - ")[1]),
          });
        }
      } catch (err) {
        toast.error("Error fetching booking details");
        // console.log(booking);
        setError("Error fetching booking details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const extractTime = (timeString) => {
    return timeString.length === 5 ? timeString : timeString.slice(0, 5);
  };

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (
      !bookingData.venueId ||
      !bookingData.courtId ||
      !bookingData.bookingDate
    ) {
      toast.warning("Venue ID, Court ID, and Booking Date are required.");
      alert("Venue ID, Court ID, and Booking Date are required.");
      setIsLoading(false);
      return;
    }

    const updatedBooking = {
      venueId: bookingData.venueId,
      courtId: bookingData.courtId,
      bookingDate: bookingData.bookingDate,
      startTime: `${bookingData.bookingDate}T${bookingData.startTime}`,
      endTime: `${bookingData.bookingDate}T${bookingData.endTime}`,
    };

    const response = await updateBooking(playerId, bookingId, updatedBooking);

    if (response) {
      toast.success("Booking updated successfully!");
      alert("Booking updated successfully!");
      navigate("/home");
    } else {
      toast.error("Error updating booking.");
      alert("Error updating booking.");
    }

    setIsLoading(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Update Booking</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Booking Date:</label>
          <input
            type="date"
            name="bookingDate"
            value={bookingData.bookingDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={bookingData.startTime}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">End Time:</label>
          <input
            type="time"
            name="endTime"
            value={bookingData.endTime}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isLoading ? "Updating..." : "Update Booking"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBookingPage;
