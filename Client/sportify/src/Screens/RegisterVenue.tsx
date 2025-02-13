// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerVenue } from "../Services/registerService";

// export default function RegisterVenue(): JSX.Element {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [locality, setLocality] = useState("");
//   const [adrLine1, setAdrLine1] = useState("");
//   const [adrLine2, setAdrLine2] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [zipCode, setZipCode] = useState("");
//   const navigate = useNavigate();

//   const ownerId  = JSON.parse(sessionStorage.getItem("id") || "{}"); // Extract role from response

//   const handleRegister = async () => {
//     try {
//       const response = await registerVenue(name, description, locality, ownerId,{
//         adrLine1,
//         adrLine2,
//         city,
//         state,
//         country,
//         zipCode,
//       }); // API call
      
        
//       alert(response.message);

//       navigate("/MainContent");
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   return (
//     <section className="mt-10">
//       <div className="container h-full px-6 py-24">
//         <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
//           {/* <!-- Left column container with background--> */}
//           <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
//             <img
//               src="C:/Users/pratikp/Desktop/Sportify2/Sportify/Sportify/Client/sportify/public/sports.png"
//               className="w-full"
//               alt="Phone image"
//             />
//           </div>

//           {/* <!-- Right column container with form --> */}
//           <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
//             <form>
//               {/* <!-- Name input --> */}
//               <div className="mb-6">
//                 <label className="block text-gray-700 dark:text-black-300 mb-2" htmlFor="name">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   className="form-input block w-full mt-1 rounded-lg border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>

//               {/* <!-- Description input --> */}
//               <div className="mb-6">
//                 <label className="block text-black-700 dark:text-black-300 mb-2" htmlFor="description">
//                   Description
//                 </label>
//                 <input
//                   type="text"
//                   id="description"
//                   className="form-input block w-full mt-1 rounded-lg border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>

//               {/* <!-- Locality input --> */}
//               <div className="mb-6">
//                 <label className="block text-black-700 dark:text-black-300 mb-2" htmlFor="locality">
//                   Locality
//                 </label>
//                 <select
//                   id="locality"
//                   className="form-select block w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={(e) => setLocality(e.target.value)}
//                 >
//                   <option value="">Select Locality</option>
//                   <option value="KOTHRUD">KOTHRUD</option>
//                   <option value="SINHAGAD_ROAD">SINHAGAD_ROAD</option>
//                   <option value="KARVENAGAR">KARVENAGAR</option>
//                   <option value="DECCAN">DECCAN</option>
//                   <option value="DP_ROAD">DP_ROAD</option>
//                   <option value="GURUGANESH_NAGAR">GURUGANESH_NAGAR</option>
//                   <option value="SAHAKAR_NAGAR">SAHAKAR_NAGAR</option>
//                   <option value="AAPTE_ROAD">AAPTE_ROAD</option>
//                 </select>
//               </div>

//               {/* <!-- Address Line 1 input --> */}
//               <div className="mb-6">
//                 <label className="block text-gray-700 dark:text-black-300 mb-2" htmlFor="adrLine1">
//                   Address Line 1
//                 </label>
//                 <input
//                   type="text"
//                   id="adrLine1"
//                   className="form-input block w-full mt-1 rounded-lg border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={(e) => setAdrLine1(e.target.value)}
//                 />
//               </div>

//                 {/* <!-- Address Line 2 input --> */}
//                 <div className="mb-6">
//                 <label className="block text-gray-700 dark:text-black-300 mb-2" htmlFor="adrLine2">
//                   Address Line 2
//                 </label>
//                 <input
//                   type="text"
//                   id="adrLine2"
//                   className="form-input block w-full mt-1 rounded-lg border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={(e) => setAdrLine2(e.target.value)}
//                 />
//               </div>

//                {/* <!-- City input --> */}
//                <div className="mb-6">
//                 <label className="block text-gray-700 dark:text-black-300 mb-2" htmlFor="city">
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   className="form-input block w-full mt-1 rounded-lg border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={(e) => setCity(e.target.value)}
//                 />
//               </div>

//               {/* <!-- State input --> */}
//               <div className="mb-6">
//                 <label className="block text-gray-700 dark:text-black-300 mb-2" htmlFor="state">
//                   State
//                 </label>
//                 <input
//                   type="text"
//                   id="state"
//                   className="form-input block w-full mt-1 rounded-lg border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={(e) => setState(e.target.value)}
//                 />
//               </div>

//                {/* <!-- Country input --> */}
//                <div className="mb-6">
//                 <label className="block text-gray-700 dark:text-black-300 mb-2" htmlFor="country">
//                   Country
//                 </label>
//                 <input
//                   type="text"
//                   id="country"
//                   className="form-input block w-full mt-1 rounded-lg border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={(e) => setCountry(e.target.value)}
//                 />
//               </div>

//                {/* <!-- Zip Code input --> */}
//                <div className="mb-6">
//                 <label className="block text-gray-700 dark:text-black-300 mb-2" htmlFor="zipCode">
//                   Zip Code
//                 </label>
//                 <input
//                   type="text"
//                   id="zipCode"
//                   className="form-input block w-full mt-1 rounded-lg border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={(e) => setZipCode(e.target.value)}
//                 />
//               </div>

//               {/* <!-- Submit button --> */}
//               <div className="w-full">
//                 <button
//                   type="button"
//                   className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
//                   onClick={handleRegister}
//                 >
//                   Register Venue
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
import { registerVenue } from "../Services/registerService";

export default function RegisterVenue(): JSX.Element {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locality, setLocality] = useState("");
  const [adrLine1, setAdrLine1] = useState("");
  const [adrLine2, setAdrLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();

  const ownerId = JSON.parse(sessionStorage.getItem("id") || "{}");

  const handleRegister = async () => {
    try {
      if (!name || !description || !locality || !adrLine1 || !city || !state || !country || !zipCode) {
        alert("All fields are required.");
        return;
      }

      const response = await registerVenue(name, description, locality, ownerId, {
        adrLine1,
        adrLine2,
        city,
        state,
        country,
        zipCode,
      });

      alert(response.message);
      navigate("/MainContent");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Register Venue</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="description">
          Description
        </label>
        <input
          type="text"
          id="description"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="locality">
          Locality
        </label>
        <select
          id="locality"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setLocality(e.target.value)}
        >
          <option value="">Select Locality</option>
          <option value="KOTHRUD">KOTHRUD</option>
          <option value="SINGHAGAD_ROAD">SINHAGAD ROAD</option>
          <option value="KARVENAGAR">KARVENAGAR</option>
          <option value="DECCAN">DECCAN</option>
          <option value="DP_ROAD">DP ROAD</option>
          <option value="GURUGANESH_NAGAR">GURUGANESH NAGAR</option>
          <option value="SAHAKAR_NAGAR">SAHAKAR NAGAR</option>
          <option value="AAPTE_ROAD">AAPTE ROAD</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="adrLine1">
          Address Line 1
        </label>
        <input
          type="text"
          id="adrLine1"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setAdrLine1(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="adrLine2">
          Address Line 2
        </label>
        <input
          type="text"
          id="adrLine2"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setAdrLine2(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="city">
          City
        </label>
        <input
          type="text"
          id="city"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="state">
          State
        </label>
        <input
          type="text"
          id="state"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setState(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="country">
          Country
        </label>
        <input
          type="text"
          id="country"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="zipCode">
          ZIP Code
        </label>
        <input
          type="text"
          id="zipCode"
          className="w-full p-2 border rounded-md bg-white text-black"
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>

      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Register Venue
      </button>
    </div>
  );
}
