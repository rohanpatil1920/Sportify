// import API from "./api";

// export const playerService = async () => {
//   try {
//     const response = await API.get(`admins/players`);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
// export const facilityOwnerService = async () => {
//   try {
//     const response = await API.get(`admins/facility-owners`);
//     console.log(response.data);

//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
// export const deletionRequestsService = async () => {
//   try {
//     const response = await API.get(`admins/deletion-requests`);
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };

// export const processdeletionRequest = async (reqId, isActive) => {
//   try {
//     const response = await axios.post(
//       createUrl(
//         `admins/${sessionStorage.getItem(id)}/process-deletion/${reqId}`
//       )
//     );
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };

import API from "./api";

export const playerService = async () => {
  try {
    const response = await API.get("/admins/players");
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

export const facilityOwnerService = async () => {
  try {
    const response = await API.get("/admins/facility-owners");
    return response.data; //
  } catch (error) {
    console.error("Error fetching facility owners:", error);
    throw error;
  }
};

export const deletionRequestsService = async () => {
  try {
    const response = await API.get("/admins/deletion-requests");
    return response.data;
  } catch (error) {
    console.error("Error fetching deletion requests:", error);
    throw error;
  }
};

export const processdeletionRequest = async (adminId, requestId, approve) => {
  try {
    if (approve === "approve") {
      const response = await API.post(
        `/admins/${adminId}/process-deletion/${requestId}?approve=${true}`
      );
      return response.data;
    } else if (approve === "deny") {
      const response = await API.post(
        `/admins/${adminId}/process-deletion/${requestId}?approve=${false}`
      );
      return response.data;
    }
  } catch (error) {
    console.error(`Error processing deletion request ${requestId}:`, error);
    throw error;
  }
};
