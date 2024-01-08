import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseInfoCard from "../../components/CourseInfoCard";

import { useAuthContext } from "../../hooks/useAuthContext";
import api from "../../services/searchAPI"

export default function MyLearning() {
  const { user } = useAuthContext();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    const fetchPublishedCourses = async () => {
      try {
        if (user){
          const {purchasedCourses} = await api.getPurchasedCourses(user.token);
          console.log(purchasedCourses)
          setPurchasedCourses(purchasedCourses.map(course => course.courseId));
        }
      } catch (error) {
        console.error("Error fetching published courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedCourses();
  }, []);
  
//   const renderCourses = ({ purchasedCourses, cart }) => {
  const renderCourses = () => {
    return loading ? <h1>Loading...</h1> : (
    <div className="flex flex-wrap gap-10">
      {purchasedCourses.map((course) => (
        <div key={course._id} className="w-60">
          <CourseInfoCard course={course} isPurchased={true}/>
        </div>
      ))}
    </div>
    )
  };

  return (
    <div className="px-10 my-10 ml-10 text-left xl:px-0">
      <h1 className="mb-5 text-2xl font-semibold">My Learning</h1>
      {renderCourses()}
    </div>
  );
}