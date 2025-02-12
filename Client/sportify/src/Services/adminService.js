import axios from "axios";
import { createUrl } from "./apiService";

export const playerService = async () => {
  try {
    const response = await axios.get(createUrl("admins/players"));
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const facilityOwnerService = async () => {
  try {
    const response = await axios.get(createUrl("admins/facility-owners"));
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const deletionRequestsService = async () => {
  try {
    const response = await axios.get(createUrl("admins/deletion-requests"));
    console.log(response);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// export const processdeletionRequest = async (reqId,isActive) =>{
//     try{
//         const response = await axios.post(createUrl(`admins/${sessionStorage.getItem(id)}/process-deletion/${reqId}`));
//         console.log(response)
//         return response.data;
//     }
//     catch (error) {
//         return error.response.data;
//     }
// }
