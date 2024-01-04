import React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import DoneIcon from "@mui/icons-material/Done";
import CourseCTA from "../CourseCTA";

const sampleCourse = {
  title: "Sample Course",
  level: "Intermediate",
  subtitle: "A sample subtitle for the course",
  highlights: [
    { points: "Highlight 1" },
    { points: "Highlight 2" },
    { points: "Highlight 3" },
    { points: "Highlight 4" },
    // ... add more highlights as needed
  ],
};

const Info = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff", // Set the background color to white
    color: "#000", // Set the text color to black
    maxWidth: 350,
    padding: "1.3rem",
    boxShadow: "0px 4px 40px 0px #00000029",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.body,
  },
}));

const CourseInfoPopover = (props) => {
  const { children, course } = props;

  const renderHighlights = () => {
    // if (!course.highlights) return null;

    const topHighlights = sampleCourse.highlights.slice(0, 3);

    return (
      <div className="flex flex-col gap-2 mt-2 text-sm">
        {topHighlights.map(({ points }, index) => (
          <p key={index} className="flex gap-3">
            <span>
              <DoneIcon fontSize="small" />
            </span>
            {points}
          </p>
        ))}
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <div className="flex flex-col gap-1">
        {/* <h3 className="text-xl font-bold">{course.title}</h3> */}
        <h3 className="text-xl font-bold">title</h3>
        {/* <p className="text-sm text-gray-200">{course.level}</p> */}
        <p className="text-sm text-gray-500">level</p>
        {/* <p className="text-sm">{course.subtitle}</p> */}
        <p className="text-sm">subtitle</p>
        {renderHighlights()}
        {/* <CourseCTA course={course} /> */}
        <CourseCTA />
      </div>
    );
  };

  return (
    <Info
      title={renderInfo()}
      arrow
      interactive
      placement="right"
      PopperProps={{
        popperOptions: {
          placement: "auto",
          modifiers: [
            {
              name: "flip",
              options: {
                fallbackPlacements: ["left", "right"],
              },
            },
          ],
        },
      }}
    >
      {children}
    </Info>
  );
};

export default CourseInfoPopover;
