// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface Sport {
//   sportName: string;
//   equipmentChoice: boolean;
// }

// interface Venue {
//   id: number;
//   name: string;
// }

// interface Court {
//   id: number;
//   name: string;
//   pricePerHour: string;
//   sport: Sport;
//   venue: Venue;
// }

// const CourtsList = () => {
//   const [courts, setCourts] = useState<Court[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}"); // Retrieve owner ID from session storage

//   useEffect(() => {
//     const fetchCourts = async () => {
//       if (!ownerId) {
//         setError("Owner ID is required.");
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:8080/venue/owner/${ownerId}/courts`);
//         if (Array.isArray(response.data)) {
//           console.log("Fetched courts:", response.data);
//           setCourts(response.data);
//         } else {
//           console.error("Unexpected response format:", response.data);
//           setError("Unexpected response format received from the server.");
//         }
//       } catch (error) {
//         console.error("Error fetching courts:", error);
//         setError("Error fetching courts. Please try again later.");
//       }
//     };

//     fetchCourts();
//   }, [ownerId]);

//   if (error) {
//     return <div className="text-red-500 p-6">{error}</div>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">List of Courts</h2>
//       {courts.length === 0 ? (
//         <p>No courts found.</p>
//       ) : (
//         <table className="min-w-full border-collapse border border-gray-200">
//           <thead>
//             <tr>
//               <th className="text-left border border-gray-200 px-4 py-2">Court ID</th>
//               <th className="text-left border border-gray-200 px-4 py-2">Price Per Hour</th>
//               <th className="text-left border border-gray-200 px-4 py-2">Sport</th>
//               <th className="text-left border border-gray-200 px-4 py-2">Venue</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courts.map((court) => (
//               <tr key={court.id} className="hover:bg-gray-100">
//                 <td className="border border-gray-200 px-4 py-2">{court.id}</td>
//                 <td className="border border-gray-200 px-4 py-2">{court.pricePerHour}</td>
//                 <td className="border border-gray-200 px-4 py-2">
//                   {court.sport?.sportName || "N/A"}
//                 </td>
//                 <td className="border border-gray-200 px-4 py-2">
//                   {court.venue?.name || "N/A"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CourtsList;

//

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        setError("Owner ID is required.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/venue/owner/${ownerId}/courts`);
        if (Array.isArray(response.data)) {
          setCourts(response.data);
        } else {
          setError("Unexpected response format received from the server.");
        }
      } catch (error) {
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
      await axios.delete(`http://localhost:8080/venue/courts/${courtId}/${ownerId}`);
      setCourts(courts.filter((court) => court.id !== courtId));
      alert("Court deleted successfully!");
    } catch (error) {
      alert("Error deleting court. Please try again.");
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


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface Sport {
//   sportName: string;
//   equipmentChoice: boolean;
// }

// interface Venue {
//   id: number;
//   name: string;
// }

// interface Court {
//   id: number;
//   pricePerHour: string;
//   sport: Sport;
//   venue: Venue;
// }

// const CourtsList = ({ refresh }: { refresh: boolean }) => {
//   const [courts, setCourts] = useState<Court[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}");

//   // Fetch courts from backend
//   const fetchCourts = async () => {
//     if (!ownerId) {
//       setError("Owner ID is required.");
//       return;
//     }

//     try {
//       const response = await axios.get(`http://localhost:8080/venue/owner/${ownerId}/courts`);
//       setCourts(response.data);
//     } catch (error) {
//       console.error("Error fetching courts:", error);
//       setError("Error fetching courts. Please try again later.");
//     }
//   };

//   // Handle delete court
//   const handleDelete = async (courtId: number) => {
//     try {
//       await axios.delete(`http://localhost:8080/venue/courts/${courtId}`);
//       alert("Court deleted successfully!");
//       fetchCourts(); // Refresh court list after deletion
//     } catch (error) {
//       console.error("Error deleting court:", error);
//       alert("Failed to delete court. Please try again.");
//     }
//   };

//   // Redirect to update page for court
//   const handleUpdate = (courtId: number) => {
//     window.location.href = `/update-court/${courtId}`;
//   };

//   useEffect(() => {
//     fetchCourts();
//   }, [refresh]); // Re-fetch courts when `refresh` state changes

//   if (error) {
//     return <div className="text-red-500 p-6">{error}</div>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">List of Courts</h2>
//       {courts.length === 0 ? (
//         <p>No courts found.</p>
//       ) : (
//         <table className="min-w-full border-collapse border border-gray-200">
//           <thead>
//             <tr>
//               <th className="text-left border border-gray-200 px-4 py-2">Court ID</th>
//               <th className="text-left border border-gray-200 px-4 py-2">Price Per Hour</th>
//               <th className="text-left border border-gray-200 px-4 py-2">Sport</th>
//               <th className="text-left border border-gray-200 px-4 py-2">Venue</th>
//               <th className="text-left border border-gray-200 px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courts.map((court) => (
//               <tr key={court.id} className="hover:bg-gray-100">
//                 <td className="border border-gray-200 px-4 py-2">{court.id}</td>
//                 <td className="border border-gray-200 px-4 py-2">{court.pricePerHour}</td>
//                 <td className="border border-gray-200 px-4 py-2">{court.sport?.sportName || "N/A"}</td>
//                 <td className="border border-gray-200 px-4 py-2">{court.venue?.name || "N/A"}</td>
//                 <td className="border border-gray-200 px-4 py-2">
//                   <button
//                     onClick={() => handleUpdate(court.id)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => handleDelete(court.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CourtsList;
