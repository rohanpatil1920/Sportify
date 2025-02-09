import React from "react";

type ActivityCardProps = {
  image: string;
  title: string;
  location: string;
  timeSlots: string[];
  price: string;
  rating: number;
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  image,
  title,
  location,
  timeSlots,
  price,
  rating,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{location}</p>
        <div className="mb-4">
          <h4 className="font-medium mb-1">Available Time Slots:</h4>
          <ul className="space-y-1">
            {timeSlots.map((slot, index) => (
              <li key={index} className="text-sm text-gray-600">
                {slot}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">{price}</p>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;