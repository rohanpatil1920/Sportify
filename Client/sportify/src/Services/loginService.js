import API from "./api";

export const login = async (email, password) => {
  try {
    const response = await API.post(`users/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
