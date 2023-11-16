import { Navigate, useRoutes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/Login";
import Logout from "./pages/logout";
import Signup from "./pages/Signup";
import NotFoundPage from "./pages/NotFoundPage";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Instructor from "./pages/Instructor";
import Courses from "./pages/Instructor/Courses";
import Settings from "./pages/Instructor/Settings";
import Team from "./pages/Instructor/Team";
import UserProfileEditing from "./pages/UserProfileEditing"
import AccountSecurity from "./pages/AccountSecurity"
import ViewPublicProfile from "./pages/ViewPublicProfile"
import AddInstructor from "./pages/Instructor/Team/AddInstructor";
import ManageCourse from "./components/ManageCourse"; // test only

export default function Router() {
  const { user } = useAuthContext();
  const routes = useRoutes([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/home",
      element: <Homepage />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/login",
      element: !user ? <Login /> : <Navigate to="/" />,
    },
    {
      path: "/signup",
      element: !user ? <Signup /> : <Navigate to="/" />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/instructor",
      element: <Instructor />
    },
    {
      path: "/instructor/settings",
      element: <Settings />
    },
    {
      path: "/instructor/courses",
      element: <Courses />
    },
    {
      path: "/instructor/team",
      element: <Team />
    },
    {
      path: "/instructor/team/add",
      element: <AddInstructor />
    },
    {
      path: "/instructor/courses/manage",
      element: <ManageCourse /> // this tag is for test only
    },
    {
      path: "/notfound",
      element: <NotFoundPage />,
    },
    {
      path: "/userprofileediting",
      element: <UserProfileEditing />,
    },
    {
      path: "/account-security",
      element: <AccountSecurity />,
    },
    {
       path: "/view-public-profile",
      element: <ViewPublicProfile />
    },
  ]);

  return routes;
}