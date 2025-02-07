import React from "react";

type FilterSectionProps = {
  selectedTimeSlots: string[];
  onTimeSlotChange: (timeSlots: string[]) => void;
  selectedActivityType: string;
  onActivityTypeChange: (activityType: string) => void;
};

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedTimeSlots,
  onTimeSlotChange,
  selectedActivityType,
  onActivityTypeChange,
}) => {
  // Available time slots
  const timeSlots = [
    "6:00 AM - 8:00 AM",
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
    "8:00 PM - 10:00 PM",
  ];

  // Available activity types
  const activityTypes = [
    { value: "all", label: "All" },
    { value: "tennis", label: "Tennis" },
    { value: "badminton", label: "Badminton" },
    { value: "cricket", label: "Cricket" },
    { value: "swimming", label: "Swimming" },
  ];

  // Handle time slot selection
  const handleTimeSlotChange = (timeSlot: string) => {
    const updatedTimeSlots = selectedTimeSlots.includes(timeSlot)
      ? selectedTimeSlots.filter((slot) => slot !== timeSlot) // Remove if already selected
      : [...selectedTimeSlots, timeSlot]; // Add if not selected

    onTimeSlotChange(updatedTimeSlots); // Notify parent component
  };

  // Handle activity type selection
  const handleActivityTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onActivityTypeChange(e.target.value); // Notify parent component
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        {/* Location Filter */}
        <div>
          <h3 className="font-medium mb-2">Location</h3>
          <input
            type="text"
            placeholder="Enter location"
            className="w-full p-2 border border-gray-300 rounded-md text-white"
          />
        </div>

        {/* Activity Type Filter */}
        <div>
          <h3 className="font-medium mb-2">Activity Type</h3>
          <select
            value={selectedActivityType}
            onChange={handleActivityTypeChange}
            className="w-full p-2 border border-gray-300 rounded-md text-white"
          >
            {activityTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Time Slot Filter */}
        <div>
          <h3 className="font-medium mb-2">Time Slots</h3>
          <div className="space-y-2">
            {timeSlots.map((timeSlot) => (
              <label key={timeSlot} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedTimeSlots.includes(timeSlot)}
                  onChange={() => handleTimeSlotChange(timeSlot)}
                  className="form-checkbox h-5 w-5 text-blue-500 rounded"
                />
                <span>{timeSlot}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Filters Button */}
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;