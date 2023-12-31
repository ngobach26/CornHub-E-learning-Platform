import axios from "axios";

const VITE_APP_BASE_URL = "http://localhost:3000/api";

const baseUrl = VITE_APP_BASE_URL + "/instructor";

const createCourse = async (token, data) => {
  try {
    const response = await axios.post(`${baseUrl}/createcourse`, data, {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Course created successfully:", response.data);
    return response.data;
    // localStorage.setItem("user", JSON.stringify(response));
  } catch (err) {
    console.log(err);
  }
};

const getPublishedCourse = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/getpublishedcourse`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Course information:", response.data);
    return response.data;
    // localStorage.setItem("user", JSON.stringify(response));
  } catch (err) {
    console.log(err);
  }
}

export default { createCourse, getPublishedCourse };