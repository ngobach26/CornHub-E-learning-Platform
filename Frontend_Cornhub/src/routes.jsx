import React, { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import ManageCourse from "./components/ManageCourse"; // test only
import Layout from "./components/Layout";
import InstructorPageLayout from "./components/InstructorPageLayout";
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
      <Route path="/course" element={<CourseLandingPage />}/>

      </Route>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" />}
      />
      <Route path="/logout" element={<Logout />} />

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
      <Route path="/instructor/courses/manage" element={<ManageCourse />} />
      <Route path="/*" element={<NotFoundPage />} />
      <Route path="/user-profile-editing" element={<UserProfileEditing />} />
      <Route path="/account-security" element={<AccountSecurity />} />
      <Route path="/view-public-profile" element={<ViewPublicProfile />} />
    </Routes>
  );
}
