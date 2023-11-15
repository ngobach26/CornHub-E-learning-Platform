import { Navigate, useRoutes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/Login";
import Logout from "./pages/logout";
import Signup from "./pages/Signup";
import NotFoundPage from "./pages/NotFoundPage";
import Homepage from "./pages/Homepage";
import UserProfileEditing from "./pages/UserProfileEditing";
import AccountSecurity from "./pages/AccountSecurity";
import ViewPublicProfile from "./pages/ViewPublicProfile";

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
