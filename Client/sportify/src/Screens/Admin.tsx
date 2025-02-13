import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import {
  deletionRequestsService,
  playerService,
  facilityOwnerService,
} from "../Services/adminService";
const AdminDashboard = () => {
  // Dummy data for players and facility owners
  const [players, setPlayers] = useState([]);

  const [facilityOwners, setFacilityOwners] = useState([]);

  // Dummy data for account deletion requests
  // const [deletionRequest, setDeletionRequests] = useState([]);
  // useEffect(() => {
  //   const fetchDeletionRequests = async () => {
  //     try {
  //       const data = await deletionRequestsService(); // Call your service function
  //       setDeletionRequests(data); // Update state with the fetched data
  //     } catch (error) {
  //       console.error("Error fetching deletion requests:", error);
  //     }
  //   };
  //   fetchDeletionRequests();
  // }, []);

  useEffect(() => {
    const fetchPlayersList = async () => {
      try {
        const data = await playerService(); // Call your service function
        setPlayers(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching deletion requests:", error);
      }
    };

    fetchPlayersList();
  }, []);
    
  useEffect(() => {
    const facilityOwnersList = async () => {
      try {
        const data = await facilityOwnerService(); // Call your service function
        setFacilityOwners(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching deletion requests:", error);
      }
    };

    facilityOwnersList();
  }, []);

  // // Function to handle account deletion approval or denial
  // const handleDeletionRequest = async(id, action) => {
  //   const request = deletionRequest.find((req) => req.id === id);
  //   if (!request) return;

  //   if (action === "approve") {
  //     // Update the isActive status of the user
  //     if (request.role === "PLAYER") {
  //       setPlayers((prevPlayers) =>
  //         prevPlayers.map((player) =>
  //           player.id === request.userId ? { ...player, isActive: false } : player
  //         )
  //       );
  //     } else if (request.type === "FACILITYOWNER") {
  //       setFacilityOwners((prevOwners) =>
  //         prevOwners.map((owner) =>
  //           owner.id === request.userId ? { ...owner, isActive: false } : owner
  //         )
  //       );
  //     }
  //   }

  //   // Remove the request from the list
  //   setDeletionRequests((prevRequests) =>
  //     prevRequests.filter((req) => req.id !== id)
  //   );

  //   console.log(
  //     `Request ${id} has been ${action === "approve" ? "approved" : "denied"}`
  //   );
  // };

  // Calculate data for the Pie Chart
  const activePlayers = players.filter((player) => player.isActive).length;
  const inactivePlayers = players.length - activePlayers;

  const activeOwners = facilityOwners.filter((owner) => owner.isActive).length;
  const inactiveOwners = facilityOwners.length - activeOwners;

  const pieChartData = [
    { name: "Active Players", value: activePlayers },
    { name: "Inactive Players", value: inactivePlayers },
    { name: "Active Facility Owners", value: activeOwners },
    { name: "Inactive Facility Owners", value: inactiveOwners },
  ];

  // Colors for the Pie Chart
  const COLORS = ["#00abff", "#ff6175", "#0b9a9c", "#FF9D3A"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r to-[rgba(11,185,1,1)] via-[rgba(41,121,9,1)] from-[rgba(2,102,6,1)] text-white p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-200">
          Manage players, facility owners, and account deletion requests
        </p>
      </div>
      <div className="flex justify-between   items-center">
        {/* Pie Chart Section */}
        <section className="mb-12 bg-white p-2 w-1/4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            User Statistics
          </h2>
          <div className="flex justify-center">
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </section>
        <div className="flex flex-col  justify-start">
          {/* Players List Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Players
            </h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-[rgba(11,185,1,1)] via-[rgba(41,121,9,1)] to-[rgba(2,102,6,1)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {players.map((player) => (
                    <tr
                      key={player.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {player.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {player.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {player.contact}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            player.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {player.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Facility Owners List Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Facility Owners
            </h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-[rgba(11,185,1,1)] via-[rgba(41,121,9,1)] to-[rgba(2,102,6,1)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Phone
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Turfs Listed
                    </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {facilityOwners.map((owner) => (
                    <tr
                      key={owner.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {owner.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {owner.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {owner.contact}
                      </td>
                      {/* <td className="px-6 py-4 text-sm text-gray-800">
                        {owner.turfs}
                      </td> */}
                      <td className="px-6 py-4 text-sm text-gray-800">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            owner.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {owner.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      {/* Account Deletion Requests Section
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Account Deletion Requests
        </h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-[rgba(11,185,1,1)] via-[rgba(41,121,9,1)] to-[rgba(2,102,6,1)]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {deletionRequests.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {request.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {request.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {request.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {request.reason}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <button
                      onClick={() =>
                        handleDeletionRequest(request.id, "approve")
                      }
                      className="bg-gradient-to-r from-[rgba(11,185,1,1)] to-[rgba(2,102,6,1)] text-white px-3 py-1 rounded-md mr-2 hover:opacity-90 transition-opacity"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeletionRequest(request.id, "deny")}
                      className="bg-gradient-to-r from-red-500 to-red-700 text-white px-3 py-1 rounded-md hover:opacity-90 transition-opacity"
                    >
                      Deny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section> */}
    </div>
  );
};

export default AdminDashboard;
