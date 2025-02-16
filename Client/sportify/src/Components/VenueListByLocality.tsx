import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import API from "../Services/api"

const dummyImages = [
  "/images/download (1).jpg",
  "/images/download (2).jpg",
  "/images/download (3).jpg",
  "/images/download (4).jpg",
  "/images/download (5).jpg",
  "/images/download (6).jpg",
  "/images/download (7).jpg",
  "/images/download.jpg",
  "/images/images (1).jpg",
  "/images/images (2).jpg",
  "/images/images (3).jpg",
  "/images/images (4).jpg",
  "/images/images.jpg",
];

const VenueListByLocality = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract locality from query parameters
  const searchParams = new URLSearchParams(location.search);
  const locality = searchParams.get("locality");

  // Fetch venues by locality from the API
  useEffect(() => {
    const fetchVenuesByLocality = async () => {
      try {
        const response = await API.get(
          `/venue/search/${locality}`
        );

        if (response.data.length === 0) {
          toast.error(`No venues found in the locality "${locality}"`);
          // setError(`No venues found in the locality "${locality}"`);
        } else {
          setVenues(response.data);
        }
        setLoading(false);
      } catch (err) {
        toast.error(`Failed to load venues in the locality "${locality}"`);
        // setError(`Failed to load venues in the locality "${locality}"`);
        setLoading(false);
      }
    };

    if (locality) {
      fetchVenuesByLocality();
    }
  }, [locality]);

  if (loading) {
    return <div className="text-center py-8">Loading venues...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Venues in {locality}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue, index) => (
          <div
            key={venue.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={dummyImages[index % dummyImages.length]} // Cycle through images
              alt={venue.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
              <p className="text-gray-600 mb-2">{venue.location}</p>
              <button
                onClick={() => navigate(`/venue/${venue.id}`)}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueListByLocality;
