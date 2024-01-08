import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LanguageIcon from "@mui/icons-material/Language";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import DoneIcon from "@mui/icons-material/Done";
import Rating from '@mui/material/Rating';

import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Description from "../../components/CourseLandingPage/Description";
import CurriculumAccordion from "../../components/Curriculum/CurriculumAccordion";
import Reviews from "../../components/Reviews";
import VideoPlayer from "../../components/VideoPlayer";
import CourseCTA from "../../components/CourseCTA";

import { useAuthContext } from "../../hooks/useAuthContext";
import api from "../../services/searchAPI";
import cartApi from "../../services/cartAPI";
import instructorAPI from "../../services/instructorAPI";

const exampleCourse = {
  courseurlPreview:
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
};

export default function CourseLandingPage() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [courseDetail, setCourseDetail] = useState({
    courseTitle: "",
    description: "",
    language: "English",
    level: "",
    category: "",
    subcategory: "",
    demoVideo: "",
    author: "",
    details: {
      outcomes: [{ points: "" }],
      prerequisites: [{ points: "" }],
      target_audience: [{ points: "" }],
    },
    // coverImage: ""
  });
  const [curriculumItems, setCurriculumItems] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [cart, setCart] = useState([]);
  const [createdCourses, setCreatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(null);
  const [oldRating, setOldRating] = useState(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openThankYouSnackbar, setOpenThankYouSnackbar] = useState(false);

  const isPurchased = (id) => {
    for (let purchasedCourse of purchasedCourses) {
      if (purchasedCourse.courseId && purchasedCourse.courseId._id === id)
        return true;
    }
    return false;
  };

  const isInCart = (id) => {
    for (let inCart of cart) {
      if (inCart._id === id) return true;
    }
    return false;
  };

  const belongToUser = (id) => createdCourses.some(createdCourse => createdCourse._id===id);

  const handleRatingChange = async (e, value) => {
    if (value != null) {
      setRating(value);
      setOpenConfirmationDialog(true);
    }
  }
  
  const handleCloseDialog = () => {
    setRating(oldRating);
    setOpenConfirmationDialog(false);
  }

  const handleConfirmRating = async () => {
    try {
      await api.updateRating(id, user.token, rating);
      setOldRating(rating);
      setOpenConfirmationDialog(false);
      setOpenThankYouSnackbar(true);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user);
        const courseData = await api.getCourseById(id);
        setCourseDetail({
          courseTitle: courseData.courseTitle || "",
          description: courseData.description || "",
          language: courseData.language || "English",
          level: courseData.level || "",
          category: courseData.category || "",
          subcategory: courseData.subcategory || "",
          demoVideo: courseData.demoVideo || "",
          author:
            `${courseData.author?.firstName} ${courseData.author?.lastName}` ||
            "",
          details: {
            outcomes:
              courseData.outcomes.length > 0
                ? JSON.parse(courseData.outcomes)
                : [{ points: "" }],
            prerequisites:
              courseData.prerequisites.length > 0
                ? JSON.parse(courseData.prerequisites)
                : [{ points: "" }],
            target_audience:
              courseData.target_audience.length > 0
                ? JSON.parse(courseData.target_audience)
                : [{ points: "" }],
          },
        });
        setCurriculumItems(courseData.contents);
        if (user) {
          const { purchasedCourses } = await api.getPurchasedCourses(user.token);
          setPurchasedCourses(purchasedCourses);

          const userRating = purchasedCourses.find(purchasedCourse => purchasedCourse.courseId && purchasedCourse.courseId._id===id)?.rating;
          if (userRating) {
            setRating(userRating);
            setOldRating(userRating);
          }

          const getCart = await cartApi.viewCart(user.token);
          setCart(getCart);
          const getCreatedCourses = await instructorAPI.getPublishedCourse(user.token);
          setCreatedCourses(getCreatedCourses);        
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user?.token]);

  const renderHeader = () => {
    return (
      <div className="pt-8 pb-12 text-sm bg-sky-400 lg:h-80">
        <div className="flex justify-between w-9/12 mx-auto xl:w-18/25">
          <div className="w-11/12 mx-auto md:w-3/4 lg:w-61/100 lg:m-0">
            <p className="flex items-center my-3 text-sm">
              {courseDetail?.category}{" "}
              <NavigateNextIcon fontSize="small" className="text-sm" />
              {courseDetail?.subcategory}
            </p>
            <div className="block lg:hidden">
              <VideoPlayer
                url={
                  courseDetail.demoVideo
                    ? courseDetail.demoVideo
                    : "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                }
              />
            </div>
            <div className="flex flex-col gap-2 my-5 text-left">
              <h1 className="text-3xl font-medium">
                {courseDetail?.courseTitle}{" "}
              </h1>
            </div>
            <div className="flex gap-3 text-sm divide-x divide-solid">
              <p>
                Course Creator:{" "}
                {/* <span className="font-bold">{getInstructors(course)}</span> */}
                <span className="font-bold">{courseDetail.author}</span>
              </p>
              <p className="flex items-center gap-2 pl-3">
                <LanguageIcon fontSize="small" />
                {courseDetail.language}
              </p>
            </div>
            {isPurchased(id) && (
              <div className="flex flex-col items-start my-3 mt-20">
                <h3 className="text-lg font-semibold">{rating ? 'Your Rating' : 'Please rate our course'}</h3>
                <Rating
                  name="courseRating"
                  value={rating}
                  precision={0.5}
                  onChange={handleRatingChange}
                  size="large"  // Making the stars slightly bigger
                  sx={{
                    color: 'gold',  // Change the color of the stars
                    '& .MuiRating-iconFilled': { color: '#ffc107' },
                    '& .MuiRating-iconHover': { color: '#ff3d47' }
                  }}
                />
              </div>
            )}

            <Dialog
              open={openConfirmationDialog}
              onClose={handleCloseDialog}
            >
              <DialogTitle>Confirm Rating</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to rate this course with {rating} stars?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmRating}
                  color="primary"
                  variant="contained"
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>

            <Snackbar
              open={openThankYouSnackbar}
              autoHideDuration={4000}
              onClose={() => setOpenThankYouSnackbar(false)}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={() => setOpenThankYouSnackbar(false)}
                severity="success"
              >
                Thank you for your rating!
              </MuiAlert>
            </Snackbar>

          </div>
          {renderSidebar()}
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="hidden text-black lg:block w-96">
        <VideoPlayer
          url={
            courseDetail.demoVideo
              ? courseDetail.demoVideo
              : "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
          }
        />
        <div className="px-6 py-8 bg-white shadow-md">
          {!loading && <CourseCTA
            courseID={id}
            isPurchased={isPurchased(id)}
            isInCart={isInCart(id)}
            belongToUser={belongToUser(id)}
          />}
          <div>
            <p className="mt-8 mb-3 font-bold text-left">
              This course includes:
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <p className="flex items-center gap-3">
                <OndemandVideoIcon fontSize="small" />
                21 hours+ on-demand video
              </p>
              <p className="flex items-center gap-3">
                <AllInclusiveIcon fontSize="small" />
                Full lifetime access
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCourseContent = () => {
    return (
      <div className="text-left">
        <h3 className="mb-4 text-2xl font-bold">Course curriculum</h3>
        {/* <p className="mb-3 text-sm">
          {course?.curriculum.length} chapters &#8226; {course?.duration} total
          duration
        </p> */}
        <p className="mb-3 text-sm">
          {/* {courseDetail.numChapters} chapters &#8226; {courseDetail.duration}{" "} */}
        </p>
        <CurriculumAccordion viewOnly curriculumItems={curriculumItems} />
      </div>
    );
  };

  return (
    <>
      {renderHeader()}
      <div className="flex justify-between w-9/12 py-10 mx-auto text-left xl:w-20/25">
        <div className="flex flex-col mx-auto w-17/18 gap-14 md:w-3/5 lg:w-62/100 lg:m-0">
          <div className="p-4 border border-gray-300">
            <h3 className="mb-4 text-2xl font-bold">What you'll learn</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {courseDetail.details.outcomes.map((outcome, index) => (
                <p key={index} className="flex gap-3">
                  <span>
                    <DoneIcon fontSize="small" />
                  </span>
                  {outcome.points}
                </p>
              ))}
            </div>
          </div>
          {renderCourseContent()}
          <div>
            <h3 className="mb-4 text-2xl font-bold">Requirements</h3>
            <div className="text-sm">
              {courseDetail.details.prerequisites.map((point, index) => (
                <p key={index} className="flex items-center">
                  <span className="mr-4 text-2xl">&#8226;</span> {point.points}
                </p>
              ))}
            </div>
          </div>
          <Description description={courseDetail?.description} />
          <div>
            <h3 className="mb-4 text-2xl font-bold">Who this course is for?</h3>
            <div className="text-sm">
              {courseDetail.details.target_audience.map((point, index) => (
                <p key={index} className="flex items-center">
                  <span className="mr-4 text-2xl">&#8226;</span> {point.points}
                </p>
              ))}
            </div>
          </div>
          <Reviews />
        </div>
      </div>
    </>
  );
}