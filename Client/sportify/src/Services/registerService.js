import API from "./api";

export const register = async (username, email, password, contact) => {
  try {
    const response = await API.post(`/signup/player`, {
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
    const response = await API.post(`/signup/facilityowner`, {
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

    const response = await API.post(
      `/owners/${ownerId}/register`,
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
    const response = await API.post(`/owners/${ownerId}/courts`, courtData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
