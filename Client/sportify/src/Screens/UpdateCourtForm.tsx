// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const UpdateCourtForm = () => {
//   const { courtId } = useParams<{ courtId: string }>();
//   const [pricePerHour, setPricePerHour] = useState("");
//   const [sportName, setSportName] = useState("");
//   const [equipmentChoice, setEquipmentChoice] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}");

//   useEffect(() => {
//     const fetchCourtDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/venue/courts/${courtId}`);
//         const { pricePerHour, sport } = response.data;
//         setPricePerHour(pricePerHour);
//         setSportName(sport.sportName);
//         setEquipmentChoice(sport.equipmentChoice);
//       } catch (error) {
//         alert("Error fetching court details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourtDetails();
//   }, [courtId]);

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(
//         `http://localhost:8080/venue/courts/${courtId}/${ownerId}`,
//         {
//           pricePerHour,
//           sport: { sportName, equipmentChoice },
//         }
//       );

//       if (response.status === 200) {
//         alert("Court updated successfully!");
//         navigate("/MainContent");
//       } else {
//         alert("Error updating court.");
//       }
//     } catch (error) {
//       alert("Error updating court. Please try again.");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Update Court</h2>
//       <form onSubmit={handleUpdate}>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Price Per Hour</label>
//           <input
//             type="text"
//             value={pricePerHour}
//             onChange={(e) => setPricePerHour(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none bg-white"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Sport Name</label>
//           <input
//             type="text"
//             value={sportName}
//             onChange={(e) => setSportName(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none bg-white"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Equipment Choice</label>
//           <input
//             type="checkbox"
//             checked={equipmentChoice}
//             onChange={(e) => setEquipmentChoice(e.target.checked)}
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//         >
//           Update Court
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateCourtForm;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCourtForm = () => {
  const { courtId } = useParams<{ courtId: string }>();
  const [pricePerHour, setPricePerHour] = useState("");
  const [selectedSportId, setSelectedSportId] = useState<number | null>(null);
  const [venueId, setVenueId] = useState<number | null>(null);
  const [equipmentChoice, setEquipmentChoice] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}");

  // List of sports (static data from the Sport table)
  const sports = [
    { id: 1, sportName: "CRICKET", equipmentChoice: true },
    { id: 2, sportName: "SOCCER", equipmentChoice: true },
    { id: 3, sportName: "SWIMMING", equipmentChoice: false },
    { id: 4, sportName: "GOLF", equipmentChoice: true },
    { id: 5, sportName: "TENNIS", equipmentChoice: true },
    { id: 6, sportName: "TABLE_TENNIS", equipmentChoice: true },
    { id: 7, sportName: "PICKLE_BALL", equipmentChoice: true },
  ];

  useEffect(() => {
    const fetchCourtDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/venue/courts/${courtId}`);
        const { pricePerHour, sport, venue } = response.data;

        setPricePerHour(pricePerHour);
        setSelectedSportId(sport?.id || null);
        setVenueId(venue?.id || null); // Fetch and set venueId
        setEquipmentChoice(sport?.equipmentChoice || false);
      } catch (error) {
        console.error("Error fetching court details:", error);
        alert("Failed to load court details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourtDetails();
  }, [courtId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/venue/courts/${courtId}/${ownerId}`, {
        pricePerHour,
        sportId: selectedSportId,
        venueId, // Include venueId in the payload
      });

      alert("Court updated successfully!");
      navigate("/MainContent");
    } catch (error) {
      console.error("Error updating court:", error);
      alert("Failed to update court. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Update Court</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price Per Hour</label>
          <input
            type="text"
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none bg-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Select Sport</label>
          <select
            value={selectedSportId || ""}
            onChange={(e) => setSelectedSportId(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none bg-white"
            required
          >
            <option value="" disabled>
              -- Select a Sport --
            </option>
            {sports.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.sportName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Venue ID</label>
          <input
            type="text"
            value={venueId || ""}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Equipment Choice</label>
          <input
            type="checkbox"
            checked={equipmentChoice}
            onChange={(e) => setEquipmentChoice(e.target.checked)}
            disabled // Make this read-only since equipmentChoice is derived from the sport
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Update Court
        </button>
      </form>
    </div>
  );
};

export default UpdateCourtForm;
