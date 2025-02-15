import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../Services/api";

const PlayersList = ({ facilityOwnerId }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await API.get(`/venue/players/${facilityOwnerId}`);
        setPlayers(response.data);
      } catch (error) {
        toast.error("Error fetching players");
        // console.error("Error fetching players:", error);
      }
    };

    if (facilityOwnerId) {
      fetchPlayers();
    }
  }, [facilityOwnerId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">List of Players</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Player Name</th>
            <th className="text-left">Contacts</th>
            <th className="text-left">Court ID</th>
            <th className="text-left">Booking Date</th>
          </tr>
        </thead>
        <tbody>
          {players.length > 0 ? (
            players.map((player, index) => (
              <tr key={index}>
                <td>{player.username}</td>
                <td>{player.contact}</td>
                <td>{player.courtId}</td>
                <td>{player.bookingDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No players found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersList;
