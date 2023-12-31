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
};

const getCourseById = async (token, id) => {
  try {
    const response = await axios.get(`${baseUrl}/getcourse/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Course information:", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteCourse = async (token, id) => {
  try {
    const response = await axios.get(`${baseUrl}/deletecourse/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Deleted course:", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const updateCourse = async (token, id) => {
  try {
    const response = await axios.get(`${baseUrl}/updatecourse/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("New update course information:", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default {
  createCourse,
  getPublishedCourse,
  getCourseById,
  deleteCourse,
  updateCourse,
};