import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateVenueForm = () => {
  const { venueId } = useParams<{ venueId: string }>(); 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}");

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/venue/${venueId}`);
        const { name, description } = response.data;
        setName(name);
        setDescription(description);
      } catch (error) {
        console.error("Error fetching venue details:", error);
        alert("Error fetching venue details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [venueId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/venue/${ownerId}/update/${venueId}`,
        null, 
        {
          params: {
            name,
            description,
          },
        }
      );

      if (response.status === 200) {
        alert("Venue updated successfully!");
        navigate("/MainContent"); 
      } else {
        alert("Error updating venue.");
      }
    } catch (error) {
      console.error("Error updating venue:", error);
      alert("Error updating venue. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Update Venue</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Venue Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none bg-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Venue Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none bg-white"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Update Venue
        </button>
      </form>
    </div>
  );
};

export default UpdateVenueForm;
