import React from "react";

type VenueDetailsProps = {
  name: string;
  location: string;
  rating: number;
  sports: string[];
  images: string[];
  amenities: string[];
  timing: string;
};

const VenueDetails: React.FC<VenueDetailsProps> = ({
  name,
  location,
  rating,
  sports,
  images,
  amenities,
  timing,
}) => {
  return (
    <div className=" bg-white container mx-auto px-4 py-8">
      {/* Image Gallery (Carousel) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={name}
            className="w-full h-64 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Basic Info */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <div className="flex items-center space-x-4 text-white">
          <span>⭐ {rating} (25 reviews)</span>
          <span>📍 {location}</span>
          <span>⏰ {timing}</span>
        </div>
      </div>

      {/* Sports & Amenities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Available Sports</h3>
          <div className="flex flex-wrap gap-2">
            {sports.map((sport) => (
              <span
                key={sport}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                {sport}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Amenities</h3>
          <ul className="grid grid-cols-2 gap-2">
            {amenities.map((amenity) => (
              <li key={amenity} className="flex items-center space-x-2">
                <span>✔️</span>
                <span>{amenity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
