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

export const getAllShoppingCart = async (userId) => {
  try {
    const response = await axios.get(`/api/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.log("error api get all shopping cart: ", error);
    return error.response.data;
  }
};

export const removeCartItem = async (userId, cartItemId) => {
  try {
    const response = await axios.delete(
      `/api/cart/${userId}/remove/${cartItemId}`
    );
    return response.data;
  } catch (error) {
    console.log("error api remove cart item: ", error);
    return error.response.data;
  }
};

export const udpateQuantityCartItem = async (userId, cartItemId, quantity) => {
  try {
    const response = await axios.put(
      `/api/cart/${userId}/update/${cartItemId}?quantity=${quantity}`
    );
    return response.data;
  } catch (error) {
    console.log("error api udpate quantity cart item: ", error);
    return error.response.data;
  }
};
