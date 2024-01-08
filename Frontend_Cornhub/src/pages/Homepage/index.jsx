import React, { useState, useEffect, useParams } from "react";
import CarouselComp from "../../components/CarouselComp";
import Brand from "../../assets/image/Brand";
import Footer from "../../components/Footer";
import CourseCarousel from "../../components/CourseCarousel";

import { useAuthContext } from "../../hooks/useAuthContext";
import api from "../../services/searchAPI";
import cartApi from "../../services/cartAPI";
import instructorAPI from "../../services/instructorAPI";
import CenterAligned from "../../components/CenterAligned";
import { CircularProgress } from "@mui/material";

export default function Homepage() {
  const { applemusic, amd, mmm, github, nintendo, samsung } = Brand;
  const brands = [
    { icon: applemusic },
    { icon: amd },
    { icon: mmm },
    { icon: github },
    { icon: nintendo },
    { icon: samsung },
  ];
  const { user } = useAuthContext();
  const [publishedCourses, setPublishedCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [createdCourses, setCreatedCourses] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublishedCourses = async () => {
      try {
        const { courses } = await api.getCourses();
        setPublishedCourses(courses);
        if (user) {
          const { purchasedCourses } = await api.getPurchasedCourses(
            user.token
          );
          setPurchasedCourses(purchasedCourses);
          const getCart = await cartApi.viewCart(user.token);
          setCart(getCart);
          const getCreatedCourses = await instructorAPI.getPublishedCourse(
            user.token
          );
          setCreatedCourses(getCreatedCourses);
          console.log("Created courses: ", getCreatedCourses);
        }
        console.log(courses);
        console.log(purchasedCourses);
      } catch (error) {
        console.error("Error fetching published courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublishedCourses();
  }, []);

  return isLoading ? (
    <CenterAligned height="screen">
      <CircularProgress />
    </CenterAligned>
  ) : (
    <>
      <CarouselComp />
      <div className="flex flex-col items-start mx-12 mb-8 space-y-3 mt-14">
        <h2 className="text-4xl font-bold">A broad selection of courses</h2>
        <h3 className="text-xl text-left">
          Choose from 69,000 online video courses with new additions published
          every month
        </h3>
      </div>
      <div className="px-12 my-10 ml-10 xl:px-0">
        {/* <CourseCarousel /> */}
        <CourseCarousel
          publishedCourses={publishedCourses}
          purchasedCourses={purchasedCourses}
          cart={cart}
          createdCourses={createdCourses}
        />
      </div>
      <div className="flex items-center justify-center w-full h-auto text-gray-900 bg-gray-100">
        <div className="flex flex-col items-center justify-center w-4/5 h-full my-8">
          <h2 className="text-[2rem] font-semibold">Trusted by the best</h2>
          <div className="my-2">
            Leading companies use the same courses to help employees keep their
            skills fresh.
          </div>
          <div className="flex flex-wrap justify-between w-full mt-4 ml-2">
            {brands?.map((item, index) => (
              <div key={index}> {item.icon} </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
