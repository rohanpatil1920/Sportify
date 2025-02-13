// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerCourt } from "../Services/registerService";

// export default function RegisterCourt(): JSX.Element {
//   const [venueId, setVenueId] = useState("");
//   const [sportId, setSportId] = useState("");
//   const [pricePerHour, setPricePerHour] = useState("");
//   const navigate = useNavigate();

//   const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}"); // Replace with actual ownerId

//   const handleRegister = async () => {
//     try {

//         if (!venueId || !sportId || !pricePerHour) {
//             alert("All fields are required.");
//             return;
//           }
//           const parsedPrice = parseFloat(pricePerHour);
//         const courtData = {
//             venueId: parseInt(venueId),
//             sportId: parseInt(sportId),
//             pricePerHour: parsedPrice,
//           };

//           console.log("venueId:", venueId);
//          console.log("sportId:", sportId);
//          console.log("pricePerHour:", pricePerHour);
//         console.log("courtData:", courtData);
//       const response = await registerCourt(ownerId,courtData); // API call

//       alert(response.message);

//       navigate("/MainContent");
//     } catch (error) {
//       console.error("Registration failed:", error);
//     }
//   };

//   return (
//     <section className="mt-10">
//       <div className="container h-full px-6 py-24">
//         <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
//           {/* <!-- Left column container with background--> */}
//           {/* <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
//           </div> */}

//           {/* <!-- Right column container with form --> */}
//           <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
//             <form>
//               {/* <!-- Venue ID input --> */}
//               <div className="mb-6">
//                 <label className="block text-gray-700 dark:text-black-300 mb-2" htmlFor="venueId">
//                 venueId
//                 </label>
//                 <input
//                   type="text"
//                   id="venueId"
//                   className="form-input block w-full mt-1 rounded-lg border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={(e) => setVenueId(e.target.value)}
//                 />
//               </div>

//               {/* <!-- Sports ID input --> */}
//               <div className="mb-6">
//                 <label className="block text-black-700 dark:text-black-300 mb-2" htmlFor="sportsId">
//                   Sports
//                 </label>
//                 <select
//                   id="sportId"
//                   className="form-select block w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={(e) => setSportId(e.target.value)}
//                 >
//                   <option value="">Select Sports</option>
//                   <option value="1">CRICKET</option>
//                   <option value="2">SOCCER</option>
//                   <option value="3">SWIMMING</option>
//                   <option value="4">GOLF</option>
//                   <option value="5">TENNIS</option>
//                   <option value="6">TABLE_TENNIS</option>
//                   <option value="7">PICKLE_BALL</option>
//                 </select>
//               </div>

//               {/* <!-- Price Per Hour input --> */}
//               <div className="mb-6">
//                 <label className="block text-black-700 dark:text-black-300 mb-2" htmlFor="pricePerHour">
//                     pricePerHour
//                 </label>
//                 <input
//                   type="text"
//                   id="pricePerHour"
//                   className="form-input block w-full mt-1 rounded-lg border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={(e) => setPricePerHour(e.target.value)}
//                 />
//               </div>

//               {/* <!-- Submit button --> */}
//               <div className="w-full">
//                 <button
//                   type="button"
//                   className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
//                   onClick={handleRegister}
//                 >
//                   Register Court
//                 </button>
//               </div>

//               {/* <!-- Divider --> */}
//               <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCourt } from "../Services/registerService";

export default function RegisterCourt(): JSX.Element {
  const [venueId, setVenueId] = useState("");
  const [sportId, setSportId] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const navigate = useNavigate();
  const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}");

  const handleRegister = async () => {
    try {
      if (!venueId || !sportId || !pricePerHour) {
        alert("All fields are required.");
        return;
      }

      const parsedPrice = parseFloat(pricePerHour);
      const courtData = {
        venueId: parseInt(venueId),
        sportId: parseInt(sportId),
        pricePerHour: parsedPrice,
      };

      const response = await registerCourt(ownerId, courtData);

      alert(response.message);
      navigate("/MainContent");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Register Court</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="venueId">
          Venue ID
        </label>
        <input
          type="text"
          id="venueId"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setVenueId(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="sportId">
          Sport
        </label>
        <select
          id="sportId"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setSportId(e.target.value)}
        >
          <option value="">Select Sport</option>
          <option value="1">Cricket</option>
          <option value="2">Soccer</option>
          <option value="3">Swimming</option>
          <option value="4">Golf</option>
          <option value="5">Tennis</option>
          <option value="6">Table Tennis</option>
          <option value="7">Pickle Ball</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="pricePerHour">
          Price Per Hour
        </label>
        <input
          type="text"
          id="pricePerHour"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setPricePerHour(e.target.value)}
        />
      </div>

      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Register Court
      </button>
    </div>
  );
}
