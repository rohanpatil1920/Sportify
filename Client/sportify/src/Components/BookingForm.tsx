import React, { useState } from "react";

type BookingFormProps = {
  pricePerHour: number;
  slots: string[];
};

const BookingForm: React.FC<BookingFormProps> = ({ pricePerHour, slots }) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  // Mock available time slots (replace with API data)
  const availableSlots = ["6:00 AM - 8:00 AM", "4:00 PM - 6:00 PM"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Book Now</h2>

      {/* Date Picker */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Time Slots */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Available Slots</h3>
        <div className="grid grid-cols-2 gap-2">
          {availableSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlots([...selectedSlots, slot])}
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

      {/* Pricing Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Pricing</h3>
        <p className="text-gray-600">
          ₹{pricePerHour}/hour • {selectedSlots.length} slots selected
        </p>
        <p className="text-xl font-bold mt-2">
          Total: ₹{pricePerHour * selectedSlots.length}
        </p>
      </div>

      {/* User Details Form */}
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md"
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Proceed to Payment
        </button>
      </form>

      {/* Cancellation Policy */}
      <p className="mt-4 text-sm text-gray-500">
        Free cancellation up to 24 hours before booking .
      </p>
    </div>
  );
};

export default BookingForm;
