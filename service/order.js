import axios from "@/utils/axios";

export const order = async (userId, orderData) => {
  try {
    const response = await axios.post(
      `/api/orders/create?userId=${userId}`,
      orderData
    );
    return response.data;
  } catch (error) {
    console.log("error api order payment: ", error.response.data);

    return error.response.data;
  }
};

export const orderStatusData = async (userId) => {
  try {
    const response = await axios.get(`/api/orders/${userId}`);
    return response.data;
  } catch (error) {
    console.log("error api order status data: ", error.response.data);

    return error.response.data;
  }
};
