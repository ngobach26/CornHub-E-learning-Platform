import axios from "axios";

const VITE_APP_BASE_URL = "http://localhost:3000/api";

const baseUrl = VITE_APP_BASE_URL + "/course";

const getCourses = async () => {
  try {
    const response = await axios.get(`${baseUrl}`, {
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
export default {
  getCourses,
  getPurchasedCourses
};