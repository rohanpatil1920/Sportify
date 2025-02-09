import React, { useState } from "react";
import FilterSection from "../Components/FilterSection";
import ActivityCard from "../Components/ActivityCard";

const Activities = () => {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [selectedActivityType, setSelectedActivityType] = useState<string>("all");

  // Sample activities data
  const activities = [
    {
      image: "https://via.placeholder.com/300",
      title: "Tennis Court Booking",
      location: "Pune, Maharashtra",
      timeSlots: ["6:00 AM - 8:00 AM", "4:00 PM - 6:00 PM"],
      type: "tennis",
      price: "₹200/hr",
      rating: 4.5,
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Badminton Court Booking",
      location: "Pune, Maharashtra",
      timeSlots: ["8:00 AM - 10:00 AM", "6:00 PM - 8:00 PM"],
      type: "badminton",
      price: "₹150/hr",
      rating: 4.2,
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Cricket Ground Booking",
      location: "Pune, Maharashtra",
      timeSlots: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
      type: "cricket",
      price: "₹1000/hr",
      rating: 4.7,
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Swimming Pool Booking",
      location: "Pune, Maharashtra",
      timeSlots: ["12:00 PM - 2:00 PM", "8:00 PM - 10:00 PM"],
      type: "swimming",
      price: "₹300/hr",
      rating: 4.0,
    },
  ];

  // Filter activities based on selected time slots and activity type
  const filteredActivities = activities.filter((activity) => {
    // Filter by activity type
    const matchesActivityType =
      selectedActivityType === "all" || activity.type === selectedActivityType;

    // Filter by time slots
    const matchesTimeSlots =
      selectedTimeSlots.length === 0 ||
      activity.timeSlots.some((slot) => selectedTimeSlots.includes(slot));

    return matchesActivityType && matchesTimeSlots;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filter Section */}
        <div className="md:col-span-1">
          <FilterSection
            selectedTimeSlots={selectedTimeSlots}
            onTimeSlotChange={setSelectedTimeSlots}
            selectedActivityType={selectedActivityType}
            onActivityTypeChange={setSelectedActivityType}
          />
        </div>

        {/* Activity Cards */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity, index) => (
              <ActivityCard
                key={index}
                image={activity.image}
                title={activity.title}
                location={activity.location}
                timeSlots={activity.timeSlots}
                price={activity.price}
                rating={activity.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;