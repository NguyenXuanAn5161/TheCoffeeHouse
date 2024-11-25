import axios from "@/utils/axios";

export const getAllproduct = async (
  page,
  size,
  category,
  isNew,
  nameProduct
) => {
  try {
    const response = await axios.get(`/api/products`, {
      params: {
        page: page,
        size: size,
        category: category,
        isNew: isNew,
        name: nameProduct,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error api getProducts: ", error);
    return error.response?.data;
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
