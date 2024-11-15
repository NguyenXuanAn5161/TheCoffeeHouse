import axios from "@/utils/axios";

export const addShoppingCart = async (userId, productId, size, quantity) => {
  try {
    const response = await axios.post(
      `/api/cart/${userId}/add?productId=${productId}&size=${size}&quantity=${quantity}`
    );
    return response.data;
  } catch (error) {
    console.log("error api add shopping cart: ", error);
    return error.response.data;
  }
};
