import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../Services/api";

const LandingPage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Dummy images array
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

  // Localities data
  const localities = [
    { id: 1, name: "KOTHRUD" },
    { id: 2, name: "SINHAGAD ROAD" },
    { id: 3, name: "KARVENAGAR" },
    { id: 4, name: "DECCAN" },
    { id: 5, name: "DP ROAD" },
    { id: 6, name: "GURUGANESH NAGAR" },
    { id: 7, name: "SAHAKAR NAGAR" },
    { id: 8, name: "AAPTE ROAD" },
  ];

  // Fetch venues from API
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await API.get("/venue/all");
        setVenues(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 403) {
          toast.error("Access denied. Please log in.");
          navigate("/login"); // Redirect to login if unauthorized
        } else {
          setError("Failed to load venues");
          toast.error("Failed to load venues. Please try again.");
        }
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleVenueClick = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  // const handleLocalityClick = (locality) => {
  //   navigate(`/venuelistbylocality?locality=${locality}`);
  // };

  const handleLocalityClick = (locality) => {
    const formattedLocality = locality.replace(/\s+/g, "_");
    navigate(`/venuelistbylocality?locality=${formattedLocality}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Blurred Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{ backgroundImage: `url('/public/bg.jpg')` }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        {/* Logo and Content */}
        <div className="relative z-10 text-center">
          <img
            src="/public/sportify_logo.png"
            alt="Sportify Logo"
            className="mx-auto mb-6"
          />
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to Sportify
          </h1>
          <p className="text-xl text-gray-200">
            Book your favorite turfs with ease
          </p>
        </div>
      </section>

      {/* Infinite Scroll Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Explore Venues
        </h2>
        <div
          className="overflow-hidden whitespace-nowrap"
          style={{ display: "flex", position: "relative" }}
        >
          <div
            className="inline-flex"
            style={{
              display: "flex",
              animation: "infiniteScroll 20s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            {venues.map((venue, index) => (
              <div
                key={venue.id}
                className="mx-4 w-64 bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => handleVenueClick(venue.id)} // Navigate on click
              >
                <img
                  src={dummyImages[index % dummyImages.length]} // Assign an image using modulus operator
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {venue.name}
                  </h3>
                  <p className="text-gray-600">{venue.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Complex Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Find Venues Near You
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4">
          {localities.map((locality) => (
            <button
              key={locality.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition-all hover:scale-105 text-center"
              onClick={() => handleLocalityClick(locality.name)} // Navigate on click
            >
              <span className="text-xl font-semibold text-gray-800">
                {locality.name}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
