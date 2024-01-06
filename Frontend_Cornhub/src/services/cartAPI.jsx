import axios from "axios";

const VITE_APP_BASE_URL = "http://localhost:3000/api";

export const cartApi = axios.create({
  baseURL: VITE_APP_BASE_URL + "/cart",
  headers: {
    "Content-Type": "application/json",
  },
});

cartApi.interceptors.request.use(
  (config) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const { token } = user;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.log(e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const addToCart = async (courseID) => {
  const res = await cartApi({
    method: "POST",
    url: `add/${courseID}`,
  });

  console.log(res.message);
  return res.message;
};

export const viewCart = async () => {
  const res = await cartApi({
    method: "GET",
    url: "viewcart",
  });

  return res.data.cart;
};

export const removeFromCart = async (courseID) => {
  const res = await cartApi({
    method: "POST",
    url: `remove/${courseID}`,
  });

  console.log(res.message);
  return res.message;
};

export const checkout = async () => {
  const res = await cartApi({
    method: "POST",
    url: "checkout",
  });

  console.log(res.message)
  return res.message;
};
