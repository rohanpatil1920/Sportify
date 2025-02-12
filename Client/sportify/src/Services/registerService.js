import axios from "axios";
import { createUrl } from "./apiService";

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
};

export const registerVenue = async (
  name,
  description,
  locality,
  ownerId,
  { adrLine1, adrLine2, city, state, country, zipCode }
) => {
  try {
    const VenueRequestDTO = {
      name,
      description,
      locality,
      address: {
        adrLine1,
        adrLine2,
        city,
        state,
        country,
        zipCode,
      },
    };

    const response = await axios.post(
      createUrl(`venue/${ownerId}/register`),
      VenueRequestDTO
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const registerCourt = async (ownerId, courtData) => {
  try {
    // const CourtsRequestDTO = {
    // venueId,
    // sportsId,
    // pricePerHour
    // }
    const response = await axios.post(
      createUrl(`venue/${ownerId}/courts`),
      courtData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
