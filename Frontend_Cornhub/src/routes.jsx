import React, { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import ManageCourse from "./components/ManageCourse"; // test only
import Layout from "./components/Layout";
import InstructorPageLayout from "./components/InstructorPageLayout";
import FormPageLayout from "./components/FormPageLayout";
import CenterAligned from "./components/CenterAligned";
import Login from "./pages/Login";
import Logout from "./pages/logout";
import Signup from "./pages/Signup";
import NotFoundPage from "./pages/NotFoundPage";
const Homepage = React.lazy(() => delayForDemo(import("./pages/Homepage")));
import Search from "./pages/Search";
const Wishlist = React.lazy(() => delayForDemo(import("./pages/Wishlist")));
const Cart = React.lazy(() => delayForDemo(import("./pages/Cart")));
const Courses = React.lazy(() =>
  delayForDemo(import("./pages/Instructor/Courses"))
);
import Settings from "./pages/Instructor/Settings";
const Team = React.lazy(() => delayForDemo(import("./pages/Instructor/Team")));
import UserProfileEditing from "./pages/Profile/UserProfileEditing";
import AccountSecurity from "./pages/Profile/AccountSecurity";
import ViewPublicProfile from "./pages/Profile/ViewPublicProfile";
import AddInstructor from "./pages/Instructor/Team/AddInstructor";
import CourseLandingPage from "./pages/CourseLandingPage";
import CourseLearningPage from "./pages/CourseLearningPage";
import CourseDetails from "./components/ManageCourse/CourseDetails";
import CreateCurriculum from "./components/ManageCourse/CreateCurriculum";
import IntendedLearners from "./components/ManageCourse/IntendedLearners";
import Pricing from "./components/ManageCourse/Pricing";
import Setting from "./components/ManageCourse/Setting";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminCourse from "./pages/Admin/AdminCourse";
import AdminCourses from "./pages/Admin/AdminCourses";
import AdminHome from "./pages/Admin/AdminHome";
import AdminUser from "./pages/Admin/AdminUser";
import AdminUsers from "./pages/Admin/AdminUsers";

async function delayForDemo(promise) {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  return promise;
}

export default function Router() {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense
              fallback={
                <CenterAligned height="screen">
                  <CircularProgress />
                </CenterAligned>
              }
            >
              <Homepage />
            </Suspense>
          }
        />
        <Route path="/home" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/wishlist"
          element={
            <Suspense
              fallback={
                <CenterAligned height="screen">
                  <CircularProgress />
                </CenterAligned>
              }
            >
              <Wishlist />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense
              fallback={
                <CenterAligned height="screen">
                  <CircularProgress />
                </CenterAligned>
              }
            >
              <Cart />
            </Suspense>
          }
        />
        <Route path="/course/:id" element={<CourseLandingPage />}/>
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="home" element={<AdminHome /> } />
        <Route path="users" element={<AdminUsers />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="users/:id" element={<AdminUser />} />
        <Route path="courses/:id" element={<AdminCourse />} />
      </Route>
      <Route path="/login" element={!user ? <Login /> : (user?.isAdmin ? <Navigate to="/admin" /> : <Navigate to="/" />)} />
      {/* <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} /> */}
      {/* <Route path="/login" element={!user ? <Login /> : ({user.isAdmin} ? <Navigate to="/admin" /> : <Navigate to="/" />)  } /> */}
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" />}
      />
      <Route path="/logout" element={<Logout />} />
      <Route path="/course/:id/learn" element={<CourseLearningPage />}/>
      <Route
        path="/instructor"
        element={user ? <InstructorPageLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Courses />} />
        <Route
          path="courses"
          element={
            <Suspense
              fallback={
                <CenterAligned>
                  <CircularProgress />
                </CenterAligned>
              }
            >
              <Courses />
            </Suspense>
          }
        />
        <Route path="settings" element={<Settings />} />
        <Route
          path="team"
          element={
            <Suspense
              fallback={
                <CenterAligned>
                  <CircularProgress />
                </CenterAligned>
              }
            >
              <Team />
            </Suspense>
          }
        />
        <Route path="team/add" element={<AddInstructor />} />
      </Route>
      <Route path="/instructor/courses/manage" element={<FormPageLayout />} >
        {/* <Route index element={<CourseDetails />} /> */}
        <Route path="course-detail/:id" element={<CourseDetails />}/>
        <Route path="create-curriculum/:id" element={<CreateCurriculum />}/>
        <Route path="intended-learners/:id" element={<IntendedLearners />}/>
        <Route path="pricing/:id" element={<Pricing />} />
        <Route path="setting/:id" element={<Setting />} /> 
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
      <Route path="/user-profile-editing" element={<UserProfileEditing />} />
      <Route path="/account-security" element={<AccountSecurity />} />
      <Route path="/view-public-profile" element={<ViewPublicProfile />} />
    </Routes>
  );
}