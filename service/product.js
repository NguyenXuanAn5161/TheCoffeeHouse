import axios from "@/utils/axios";

export const getAllProduct = async () => {
  try {
    const response = await axios.get(`/api/products`);
    return response.data;
  } catch (error) {
    console.log("error api register: ", error);

    return error.response.data;
  }
};
