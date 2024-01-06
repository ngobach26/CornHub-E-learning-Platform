import axios from "axios";

const VITE_APP_BASE_URL = "http://localhost:3000/api";

const baseUrl = VITE_APP_BASE_URL + "/admin";

const listUsers = async (token) => {
    try{
        const response = await axios.get(`${baseUrl}/listusers`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        console.log("Response data", response.data);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
};

const listCourses = async (token) => {
    try{
        const response = await axios.get(`${baseUrl}/listcourses`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        console.log("Response data", response.data);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
};

const acceptCourse = async (token, id) => {
    try{
        const response = await axios.patch(`${baseUrl}/acceptcourse/${id}`, {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        console.log("Course approved to be published!");
        return response.data;
    }
    catch(err){
        console.log(err);
    }
};

const denyCourse = async (token, id) => {
    try{
        const response = await axios.patch(`${baseUrl}/denycourse/${id}`, {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    }
    catch(err){
        console.log(err);
    }
};

export default { listUsers, listCourses, acceptCourse, denyCourse };