import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import API from "../Services/api"

interface Venue {
  id: number;
  name: string;
  locality: string;
}

const VenueList = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await API.get(`/venue/owner/${ownerId}`);
        if (Array.isArray(response.data)) {
          setVenues(response.data);
        } else {
          toast.error(response.data.message || "Error fetching venues.");
          // console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        toast.error("Error fetching venues.");
        // console.error("Error fetching venues:", error);
        alert("Error fetching venues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [ownerId]);

  const handleUpdate = (venueId: number) => {
    navigate(`/update-venue/${venueId}`);
  };

  const handleDelete = async (venueId: number) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      try {
        const response = await API.delete(
          `/owners/${ownerId}/delete/${venueId}`
        );

        if (response.status === 200) {
          toast.success("Venue deleted successfully.");
          // alert("Venue deleted successfully!");
          setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== venueId));
        } else {
          alert(response.data.message || "Error deleting venue.");
        }
      } catch (error) {
        toast.error("Error deleting venue.");
        // console.error("Error deleting venue:", error);
        alert("Error deleting venue. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">List of Venues</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="text-left px-4 py-2 border border-gray-200">Venue ID</th>
            <th className="text-left px-4 py-2 border border-gray-200">Venue Name</th>
            <th className="text-left px-4 py-2 border border-gray-200">Locality</th>
            <th className="text-left px-4 py-2 border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-200">{venue.id}</td>
              <td className="px-4 py-2 border border-gray-200">{venue.name}</td>
              <td className="px-4 py-2 border border-gray-200">{venue.locality}</td>
              <td className="px-4 py-2 border border-gray-200">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                  onClick={() => handleUpdate(venue.id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(venue.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VenueList;