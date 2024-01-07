import axios from "axios";

const VITE_APP_BASE_URL = "http://localhost:3000/api";

const baseUrl = VITE_APP_BASE_URL + "/cart";

const addToCart = async (token, id) => {
  try {
    const response = await axios.post(`${baseUrl}/add/${id}`, {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const viewCart = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/viewcart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.cart;
  } catch (err) {
    console.log(err);
  }
};

const removeFromCart = async (token, id) => {
  try {
    const response = await axios.post(`${baseUrl}/remove/${id}`, {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.cart;
  } catch (err) {
    console.log(err);
  }
};

const checkout = async (token) => {
    const response = await axios.post(`${baseUrl}/checkout`, {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.order;
};

export default {
  addToCart,
  viewCart,
  removeFromCart,
  checkout,
};
