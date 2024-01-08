import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CenterAligned from "../../components/CenterAligned";
import Layout from "../../components/Layout";
import api from "../../services/searchAPI";
import { useAuthContext } from "../../hooks/useAuthContext";
import CourseInfoCard from "../../components/CourseInfoCard";
import { CircularProgress } from "@mui/material";

export default function Search() {
  const [results, setResults] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { user } = useAuthContext();

  const isPurchased = (id) => {
    for (let purchasedCourse of purchasedCourses) {
      if (purchasedCourse.courseId && purchasedCourse.courseId._id === id)
        return true;
    }
    return false;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const keyword = searchParams.get("keyword");
        const { courses } = await api.getCourses(keyword);
        setResults(courses);
        if (user) {
          const { purchasedCourses } = await api.getPurchasedCourses(
            user.token
          );
          setPurchasedCourses(purchasedCourses);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]); // Refetch when searchParams change

  const renderContent = () => {
    if (isLoading) {
      return (
        <CenterAligned>
          <CircularProgress />
        </CenterAligned>
      ); 
    }

    if (results.length === 0) {
      return (
        <CenterAligned>
          <img
            src="https://cdn.dribbble.com/users/7813810/screenshots/18154037/media/07fdbbd1e6c3e7440bc45a6b2477219d.gif"
            alt="404 Not Found"
            style={{ width: "250px", height: "250px" }}
          />
          <p className="mt-10 text-lg font-medium">No courses found</p>
        </CenterAligned>
      );
    }

    return (
      <>
        <p className="my-5 text-2xl font-bold">{results.length} result(s)</p>
        <div className="flex flex-wrap gap-10 ml-10">
          {results.map((course) => (
            <div key={course._id} className="w-60">
              <CourseInfoCard
                course={course}
                isPurchased={isPurchased(course._id)}
              />
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="px-10 my-10 xl:px-0">
        <p className="mb-5 text-2xl font-semibold">
          Search Results for "{searchParams.get("keyword")}"
        </p>
      </div>
      {renderContent()}
    </>
  );
}