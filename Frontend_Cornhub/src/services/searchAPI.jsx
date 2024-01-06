import axios from "axios";

const VITE_APP_BASE_URL = "http://localhost:3000/api";

const baseUrl = VITE_APP_BASE_URL + "/course";

const getCourses = async (keyword) => {
  try {
    const endpoint = keyword ? `${baseUrl}/?keyword=${keyword}` : baseUrl;
    const response = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Course display successfully:", response.data);
    console.log(typeof response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getPurchasedCourses = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/purchasedCourses`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("User purchased courses:", response.data);
    console.log(typeof response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

const getCourseById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Course: ", response.data);
    console.log(typeof response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getCourses,
  getPurchasedCourses,
  getCourseById
};