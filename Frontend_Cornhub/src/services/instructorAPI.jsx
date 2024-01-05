import axios from "axios";

const VITE_APP_BASE_URL = "http://localhost:3000/api";

const baseUrl = VITE_APP_BASE_URL + "/instructor";

const createCourse = async (token, data) => {
  try {
    const response = await axios.post(`${baseUrl}/createcourse`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Course created successfully:", response.data);
    return response.data;
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
    // console.log("Course information:", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteCourse = async (token, id) => {
  try {
    const response = await axios.patch(`${baseUrl}/deletecourse/${id}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Course marked for deletion:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error marking course for deletion:', err);
    throw err; 
  }
};

const updateWithImage = async (
  token,
  id,
  formData
) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/updatewithimage/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    console.log("New update course information:", response.data);
    return response.data.course;
  } catch (err) {
    console.log(err);
  }
};

const updateCourse = async (
  token,
  id,
  updateContent,
  deleteContent,
  addContent
) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/updatecourse/${id}`,
      {
        updates: updateContent,
        deletions: deleteContent,
        additions: addContent,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
  updateWithImage
};