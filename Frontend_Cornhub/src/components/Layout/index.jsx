import classnames from "classnames";
import Footer from "../Footer";
import CenterAligned from "../CenterAligned";
import { CircularProgress } from "@mui/material";
import Navbar from "../Navbar";

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
      <main
        className={classnames(
          { "xl:px-24 pb-10": !containerClass },
          containerClass
        )}
      >
        {props.chilren}
      </main>
      <Footer />
    </>
  );
}
