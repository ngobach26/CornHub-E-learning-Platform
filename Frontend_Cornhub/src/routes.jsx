import { Navigate, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFoundPage from "./pages/NotFoundPage";
import Homepage from "./pages/Homepage";

export default function Router() {
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
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/notfound",
      element: <NotFoundPage />,
    },
  ]);

  return routes;
}
