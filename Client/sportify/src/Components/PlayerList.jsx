// import React, { useState } from 'react';

// const PlayersList = () => {
//   const players = [
//     { id: 1, name: 'John Doe', email: 'john@example.com', court: 'Court 1' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', court: 'Court 2' },
//     { id: 3, name: 'Alice Johnson', email: 'alice@example.com', court: 'Court 3' },
//   ];

// const[player,setplayer] = useState([]);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">List of Players</h2>
//       <table className="min-w-full">
//         <thead>
//           <tr>
//             <th className="text-left">Player Name</th>
//             <th className="text-left">Contacts</th>
//             <th className="text-left">Court Booked</th>
//           </tr>
//         </thead>
//         <tbody>
//           {players.map(player => (
//             <tr key={player.id}>
//               <td>{player.name}</td>
//               <td>{player.email}</td>
//               <td>{player.court}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PlayersList;

import React, { useState, useEffect } from "react";
import axios from "axios";

const PlayersList = ({ facilityOwnerId }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/venue/players/${facilityOwnerId}`
        );
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
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
