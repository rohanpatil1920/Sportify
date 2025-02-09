import axios from "axios";
import { createUrl} from "./apiService";

export const register = async (username, email, password, contact) => {
  try {
    const response = await axios.post(createUrl("users/signup/player"), {
      username,
      email,
      password,
      contact,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const registerPartner = async (username, email, password, contact) => {
  try {
    const response = await axios.post(createUrl("users/signup/facilityowner"), {
      username,
      email,
      password,
      contact,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
