import axios from "@/utils/axios";

export const register = async (username, password) => {
  try {
    const response = await axios.post(
      `/api/auth/register?username=${username}&password=${password}`
    );
    return response.data;
  } catch (error) {
    console.log("error api register: ", error);

    return error.response.data;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(
      `/api/auth/login?username=${username}&password=${password}`
    );
    return response.data;
  } catch (error) {
    console.log("error api login: ", error);

    return error.response.data;
  }
};
