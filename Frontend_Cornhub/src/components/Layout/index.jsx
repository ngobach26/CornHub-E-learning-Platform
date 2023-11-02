import classnames from "classnames";
import Footer from "../Footer";
import CenterAligned from "../CenterAligned";
import { CircularProgress } from "@mui/material";
import Navbar from "../Navbar";
import CarouselComp from "../CarouselComp";
import SectionList from "../SectionList";

export default function Layout(props) {
  const { containerClass, loading, error } = props;

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
        <h3>Cannot fetch data. Please reload the page!</h3>
      </CenterAligned>
    );
  }

  return (
    <>
      <Navbar />
      <CarouselComp />
      <main
        className={classnames(
          { "xl:px-24 pb-10": !containerClass },
          containerClass
        )}
      >
        <div className="flex flex-col items-start mx-8 mb-8 space-y-3 mt-14">
          <h2 className="text-4xl font-bold">A broad selection of courses</h2>
          <h3 className="text-xl">
            Choose from 69,000 online video courses with new additions published
            every month
          </h3>
        </div>
        {props.chilren}
      </main>
      <CenterAligned height="screen">
        <CircularProgress />
      </CenterAligned>
      <Footer />
    </>
  );
}