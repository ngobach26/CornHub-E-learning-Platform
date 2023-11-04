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
        <h3>Error fetching data. Please refresh the page.</h3>
      </CenterAligned>
    );
  }

  return (
    <>
      <Navbar />
      <main
        className={classnames(
          { 'xl: pb-10': !containerClass },
          containerClass
        )}
      >
        {props.children}
      </main>
      <Footer />
    </>
  );
}