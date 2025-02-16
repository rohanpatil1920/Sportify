import API from "./api";

export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await API.put(`user/${userId}/update`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile.");
  }
};
