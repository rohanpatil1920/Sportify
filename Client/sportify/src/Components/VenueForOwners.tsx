// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// interface Venue {
//   id: number;
//   name: string;
//   locality: string;
// }

// const VenueList = () => {
//   const [venues, setVenues] = useState<Venue[]>([]);
//   const navigate = useNavigate();
//   const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}"); // Replace with actual ownerId

//   useEffect(() => {
//     const fetchVenues = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/venue/owner/${ownerId}`);
//         if(Array.isArray(response.data)){
//             console.log(response.data);
//             setVenues(response.data);

//         }else {
//             console.error("unexpected response format:", response.data)
//         }
//       } catch (error) {
//         console.error("Error fetching venues:", error);
//       }
//     };

//     fetchVenues();
//   }, [ownerId]);

//   const handleUpdate = (venueId: number) => {
//     navigate(`/update-venue/${venueId}`);
//   };

//   const handleDelete = async (venueId: number) => {
//     try {
//       await axios.delete(`/venue/${venueId}`);
//       setVenues(venues.filter(venue => venue.id !== venueId));
//     } catch (error) {
//       console.error("Error deleting venue:", error);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-full">
//       <h2 className="text-xl font-semibold mb-4">List of Venues</h2>
//       <table className="min-w-full">
//         <thead>
//           <tr>
//             <th className="text-left">VenuID</th>
//             <th className="text-left">Venue Name</th>
//             <th className="text-left">Locality</th>
//             <th className="text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {venues.map(venue => (
//             <tr key={venue.id}>
//                 <td>{venue.id}</td>
//               <td>{venue.name}</td>
//               <td>{venue.locality}</td>
//               <td>
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//                   onClick={() => handleUpdate(venue.id)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                   onClick={() => handleDelete(venue.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default VenueList;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        const response = await axios.get(`http://localhost:8080/venue/owner/${ownerId}`);
        if (Array.isArray(response.data)) {
          setVenues(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
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
        const response = await axios.delete(
          `http://localhost:8080/venue/${ownerId}/delete/${venueId}`
        );

        if (response.status === 200) {
          alert("Venue deleted successfully!");
          setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== venueId));
        } else {
          alert(response.data.message || "Error deleting venue.");
        }
      } catch (error) {
        console.error("Error deleting venue:", error);
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


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface Venue {
//   id: number;
//   name: string;
//   description: string;
// }

// const VenueList = ({ onVenueDeleted }: { onVenueDeleted: () => void }) => {
//   const [venues, setVenues] = useState<Venue[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}"); // Retrieve owner ID from session storage

//   useEffect(() => {
//     const fetchVenues = async () => {
//       if (!ownerId) {
//         setError("Owner ID is required.");
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:8080/venue/owner/${ownerId}`);
//         setVenues(response.data);
//       } catch (error) {
//         console.error("Error fetching venues:", error);
//         setError("Error fetching venues. Please try again later.");
//       }
//     };

//     fetchVenues();
//   }, [ownerId]);

//   const handleDelete = async (venueId: number) => {
//     try {
//       await axios.delete(`http://localhost:8080/venue/${ownerId}/delete/${venueId}`);
//       setVenues((prev) => prev.filter((venue) => venue.id !== venueId));
//       onVenueDeleted(); // Notify the court list to refresh
//     } catch (error) {
//       console.error("Error deleting venue:", error);
//       alert("Failed to delete venue. Please try again.");
//     }
//   };

//   if (error) {
//     return <div className="text-red-500 p-6">{error}</div>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">List of Venues</h2>
//       {venues.length === 0 ? (
//         <p>No venues found.</p>
//       ) : (
//         <table className="min-w-full border-collapse border border-gray-200">
//           <thead>
//             <tr>
//               <th className="text-left border border-gray-200 px-4 py-2">Venue ID</th>
//               <th className="text-left border border-gray-200 px-4 py-2">Name</th>
//               <th className="text-left border border-gray-200 px-4 py-2">Description</th>
//               <th className="text-left border border-gray-200 px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {venues.map((venue) => (
//               <tr key={venue.id} className="hover:bg-gray-100">
//                 <td className="border border-gray-200 px-4 py-2">{venue.id}</td>
//                 <td className="border border-gray-200 px-4 py-2">{venue.name}</td>
//                 <td className="border border-gray-200 px-4 py-2">{venue.description}</td>
//                 <td className="border border-gray-200 px-4 py-2">
//                   <button
//                     onClick={() => handleDelete(venue.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                     onClick={() => (window.location.href = `/update-venue/${venue.id}`)}
//                   >
//                     Update
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

// export default VenueList;

