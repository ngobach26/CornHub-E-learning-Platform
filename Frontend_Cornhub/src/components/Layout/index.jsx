import { Outlet } from "react-router-dom";
import classnames from "classnames";
import Footer from "../Footer";
import CenterAligned from "../CenterAligned";
import { CircularProgress } from "@mui/material";
import Navbar from "../Navbar";
import CarouselComp from "../CarouselComp";
import SectionList from "../SectionList";

export default function Layout(props) {
  const { loading, error } = props;

  if (loading) {
    return (
      <CenterAligned height="screen">
        <CircularProgress />
      </CenterAligned>
    );
  }

  if (error) {
    return (
      <CenterAligned height="screen">
        <h3>Error fetching data. Please refresh the page.</h3>
      </CenterAligned>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
