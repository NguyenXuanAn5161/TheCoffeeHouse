import axios from "@/utils/axios";

export const getAllProduct = async () => {
  try {
    const response = await axios.get(`/api/products`);
    return response.data;
  } catch (error) {
    console.log("error api getAllProduct: ", error);

    return error.response.data;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.log("error api get product by id: ", error);

    return error.response.data;
  }
};
