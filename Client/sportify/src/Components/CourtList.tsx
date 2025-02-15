
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import API from "../Services/api";

interface Sport {
  sportName: string; // Enum (e.g., BADMINTON, TENNIS)
  equipmentChoice: boolean;
}

interface Venue {
  name: string;
  description: string;
}

interface Court {
  id: number;
  pricePerHour: string;
  sport: Sport;
  venue: Venue;
}

const CourtsList = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [error, setError] = useState<string | null>(null);
  const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourts = async () => {
      if (!ownerId) {
        toast.error("Owner ID is required.");
        setError("Owner ID is required.");
        return;
      }

      try {
        const response = await API.get(`/venue/owner/${ownerId}/courts`);
        if (Array.isArray(response.data)) {
          setCourts(response.data);
        } else {
          toast.error("Unexpected response format received from the server.");
          setError("Unexpected response format received from the server.");
        }
      } catch (error) {
        toast.error("Error fetching courts. Please try again later.");
        setError("Error fetching courts. Please try again later.");
      }
    };

    fetchCourts();
  }, [ownerId]);

  const handleUpdate = (courtId: number) => {
    navigate(`/update-court/${courtId}`);
  };

  const handleDelete = async (courtId: number) => {
    try {
      await API.delete(`/owners/courts/${courtId}`);
      setCourts(courts.filter((court) => court.id !== courtId));
      toast.success("Court deleted successfully!");
      // alert("Court deleted successfully!");
    } catch (error) {
      toast.error("Error deleting court. Please try again.");
      // alert("Error deleting court. Please try again.");
    }
  };

  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">List of Courts</h2>
      {courts.length === 0 ? (
        <p>No courts found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="text-left border border-gray-200 px-4 py-2">Court ID</th>
              <th className="text-left border border-gray-200 px-4 py-2">Price Per Hour</th>
              <th className="text-left border border-gray-200 px-4 py-2">Sport</th>
              <th className="text-left border border-gray-200 px-4 py-2">Venue</th>
              <th className="text-left border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courts.map((court) => (
              <tr key={court.id} className="hover:bg-gray-100">
                <td className="border border-gray-200 px-4 py-2">{court.id}</td>
                <td className="border border-gray-200 px-4 py-2">{court.pricePerHour}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {court.sport?.sportName || "N/A"}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {court.venue?.name || "N/A"} - {court.venue?.description || "No description"}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleUpdate(court.id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(court.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourtsList;