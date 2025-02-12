// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const VenueListBySports = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [venues, setVenues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Extract sport from query parameters
//   const searchParams = new URLSearchParams(location.search);
//   const sport = searchParams.get("sport");

//   // Fetch venues by sport
//   useEffect(() => {
//     const fetchVenuesBySport = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/venue/search/sport?sport=${sport}`
//         );
//         setVenues(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load venues for the selected sport");
//         setLoading(false);
//       }
//     };

//     if (sport) {
//       fetchVenuesBySport();
//     }
//   }, [sport]);

//   if (loading) {
//     return <div className="text-center py-8">Loading venues...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-8">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Venues for {sport}</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {venues.map((venue) => (
//           <div
//             key={venue.id}
//             className="bg-white rounded-lg shadow-md overflow-hidden"
//           >
//             <img
//               src={venue.images?.[0] || "https://via.placeholder.com/600x400"}
//               alt={venue.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
//               <p className="text-gray-600 mb-2">{venue.location}</p>
//               <button
//                 onClick={() => navigate(`/venue/${venue.id}`)}
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VenueListBySports;


// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const VenueListBySports = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [venues, setVenues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Extract sport from query parameters
//   const searchParams = new URLSearchParams(location.search);
//   const sport = searchParams.get("sport");

//   // Fetch venues by sport
//   useEffect(() => {
//     const fetchVenuesBySport = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/venue/search/sport?sport=${sport}`
//         );
//         setVenues(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load venues for the selected sport");
//         setLoading(false);
//       }
//     };

//     if (sport) {
//       fetchVenuesBySport();
//     }
//   }, [sport]);

//   if (loading) {
//     return <div className="text-center py-8">Loading venues...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-8">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Venues for {sport}</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {venues.map((venue) => (
//           <div
//             key={venue.id}
//             className="bg-white rounded-lg shadow-md overflow-hidden"
//           >
//             {/* Placeholder image */}
//             <img
//               src={"https://via.placeholder.com/600x400"}
//               alt={venue.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
//               <p className="text-gray-600 mb-2">{venue.locality}</p>
//               <p className="text-gray-500 text-sm mb-4">{venue.description}</p>
//               <button
//                 onClick={() => navigate(`/venue/${venue.id}`)}
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VenueListBySports;


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const VenueListBySports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract sport from query parameters
  const searchParams = new URLSearchParams(location.search);
  const sport = searchParams.get("sport");

  // Fetch venues filtered by sport
  useEffect(() => {
    const fetchVenuesBySport = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/venue/search/sport?sport=${sport}`
        );
        setVenues(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load venues for the selected sport");
        setLoading(false);
      }
    };

    if (sport) {
      fetchVenuesBySport();
    }
  }, [sport]);

  if (loading) {
    return <div className="text-center py-8">Loading venues...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Venues for {sport}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Placeholder image */}
            <img
              src={"https://via.placeholder.com/600x400"}
              alt={venue.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
              <p className="text-gray-600 mb-2">{venue.locality}</p>
              <p className="text-gray-500 text-sm mb-4">{venue.description}</p>
              <button
                onClick={() => navigate(`/venue/${venue.id}`)}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueListBySports;
