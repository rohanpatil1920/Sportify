import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCourt } from "../Services/registerService";
import API from "../Services/api";
import Toast from "react-toastify";

export default function RegisterCourt(): JSX.Element {
  const [venueId, setVenueId] = useState("");
  const [sportId, setSportId] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const navigate = useNavigate();
  const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}");

  const handleRegister = async () => {
    try {
      if (!venueId || !sportId || !pricePerHour) {
        alert("All fields are required.");
        return;
      }

      const parsedPrice = parseFloat(pricePerHour);
      const courtData = {
        venueId: parseInt(venueId),
        sportId: parseInt(sportId),
        pricePerHour: parsedPrice,
      };

      const response = await registerCourt(ownerId, courtData);

      alert(response.message);
      navigate("/MainContent");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Register Court</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="venueId">
          Venue ID
        </label>
        <input
          type="text"
          id="venueId"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setVenueId(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="sportId">
          Sport
        </label>
        <select
          id="sportId"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setSportId(e.target.value)}
        >
          <option value="">Select Sport</option>
          <option value="1">Cricket</option>
          <option value="2">Soccer</option>
          <option value="3">Swimming</option>
          <option value="4">Golf</option>
          <option value="5">Tennis</option>
          <option value="6">Table Tennis</option>
          <option value="7">Pickle Ball</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="pricePerHour">
          Price Per Hour
        </label>
        <input
          type="text"
          id="pricePerHour"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setPricePerHour(e.target.value)}
        />
      </div>

      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Register Court
      </button>
    </div>
  );
}
