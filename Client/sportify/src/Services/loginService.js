import axios from "axios";
import {createUrl} from "./apiService"

export const login = async (email, password) => {
  try {
    const response = await axios.post(createUrl("users/signin"), {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}