import React from 'react'
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const Layout = () => {
    return (
      <div className="font-sans text-white bg-slate-800">
        <Navbar />
        <div className="flex">
          <div className="w-64 px-5 py-1.5 border-r-[2px] border-solid">
            <Menu />
          </div>
          <div className="px-5 py-1.25 w-full">
            {/* <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider> */}
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/courses",
          element: <Courses />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/courses/:id",
          element: <Course />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;