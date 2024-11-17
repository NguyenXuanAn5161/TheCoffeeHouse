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

export const updateUser = async (userId, fullName, phoneNumber, address) => {
  try {
    const response = await axios.put(
      `/api/auth/update?userId=${userId}&fullName=${fullName}&phoneNumber=${phoneNumber}&address=${address}`
    );
    return response.data;
  } catch (error) {
    console.log("error api updateUser: ", error);
    return error.response.data;
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(`/api/auth/user?id=${id}`);
    return response.data;
  } catch (error) {
    console.log("error api get user: ", error);
    return error.response.data;
  }
};
