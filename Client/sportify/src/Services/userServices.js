import axios from "axios";

const API_BASE_URL = "http://localhost:8080/users";

export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${userId}/update`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile.");
  }
};
