// 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerVenue } from "../Services/registerService";
import API from "../Services/api";
import { toast } from "react-toastify";

export default function RegisterVenue(): JSX.Element {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locality, setLocality] = useState("");
  const [adrLine1, setAdrLine1] = useState("");
  const [adrLine2, setAdrLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();

  const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}");

  const handleRegister = async () => {
    try {
      if (!name || !description || !locality || !adrLine1 || !city || !state || !country || !zipCode) {
        alert("All fields are required.");
        return;
      }

      const response = await registerVenue(name, description, locality, ownerId, {
        adrLine1,
        adrLine2,
        city,
        state,
        country,
        zipCode,
      });

      alert(response.message);
      toast.success("Venue registered successfully.");
      navigate("/MainContent");
    } catch (error) {
      alert("There was an issue registering the venue.");
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Register Venue</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="description">
          Description
        </label>
        <input
          type="text"
          id="description"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="locality">
          Locality
        </label>
        <select
          id="locality"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setLocality(e.target.value)}
        >
          <option value="">Select Locality</option>
          <option value="KOTHRUD">KOTHRUD</option>
          <option value="SINHAGAD_ROAD">SINHAGAD ROAD</option>
          <option value="KARVENAGAR">KARVENAGAR</option>
          <option value="DECCAN">DECCAN</option>
          <option value="DP_ROAD">DP ROAD</option>
          <option value="GURUGANESH_NAGAR">GURUGANESH NAGAR</option>
          <option value="SAHAKAR_NAGAR">SAHAKAR NAGAR</option>
          <option value="AAPTE_ROAD">AAPTE ROAD</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="adrLine1">
          Address Line 1
        </label>
        <input
          type="text"
          id="adrLine1"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setAdrLine1(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="adrLine2">
          Address Line 2
        </label>
        <input
          type="text"
          id="adrLine2"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setAdrLine2(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="city">
          City
        </label>
        <input
          type="text"
          id="city"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="state">
          State
        </label>
        <input
          type="text"
          id="state"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setState(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="country">
          Country
        </label>
        <input
          type="text"
          id="country"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="zipCode">
          ZIP Code
        </label>
        <input
          type="text"
          id="zipCode"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>

      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Register Venue
      </button>
    </div>
  );
}
