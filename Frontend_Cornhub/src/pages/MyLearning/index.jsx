import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseInfoCard from "../../components/CourseInfoCard";

import { useAuthContext } from "../../hooks/useAuthContext";
import api from "../../services/searchAPI"

export default function MyLearning() {
  const { user } = useAuthContext();
  const [purchased, setPurchased] = useState([]);
  const [publishedCourses, setPublishedCourses] = useState([]);
    
  useEffect(() => {
    const fetchPublishedCourses = async () => {
      try {
        const {courses} = await api.getCourses();
        setPublishedCourses(courses);
        if (user){
          const {purchasedCourses} = await api.getPurchasedCourses(user.token);
          setPurchased((prevPurchased) => [...prevPurchased, ...purchasedCourses]);
          console.log("Hihihi", purchasedCourses);
          console.log("hihi", purchased);
        }
      } catch (error) {
        console.error("Error fetching published courses:", error);
      }
    };

    fetchPublishedCourses();
  }, []);
  
//   const renderCourses = ({ purchasedCourses, cart }) => {
  const renderCourses = () => {
    return <div className="flex gap-5">hello</div>;
  };

  return (
    <div className="px-10 my-10 ml-10 text-left xl:px-0">
      <h1 className="mb-5 text-2xl font-semibold">My Learning</h1>
      {renderCourses()}
    </div>
  );
}