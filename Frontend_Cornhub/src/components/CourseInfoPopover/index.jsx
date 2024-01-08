import React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import DoneIcon from "@mui/icons-material/Done";
import CourseCTA from "../CourseCTA";
import { convertArr } from "../../utils/formatter";

const Info = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "#000",
    maxWidth: 350,
    padding: "1rem",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.body,
  },
}));

const CourseInfoPopover = ({ children, course, isPurchased, courseID, isInCart, belongToUser }) => {
  // console.log(course);
  const renderHighlights = () => {
    if (!course.outcomes || !course.outcomes[0]) return null;
    const topHighlights = convertArr(course.outcomes[0]);
    return (
      <div className="flex flex-col gap-2 mt-2 text-sm">
        {topHighlights.map((outcome, index) => (
          <p key={index} className="flex items-center gap-2">
            <DoneIcon fontSize="small" color="success" />
            <span>{JSON.parse(outcome).points}</span>
          </p>
        ))}
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">{course.courseTitle}</h3>
        <p className="text-sm text-gray-400">{course.level}</p>
        {renderHighlights()}
        <CourseCTA isPurchased={isPurchased} courseID={course._id} isInCart={isInCart} belongToUser={belongToUser}/>
      </div>
    );
  };

  return (
    <Info
      title={renderInfo()}
      arrow
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
