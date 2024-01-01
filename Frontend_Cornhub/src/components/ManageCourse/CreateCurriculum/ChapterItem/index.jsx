import React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";

export default function ChapterItem({
  lectureTitle,
  duration,
  lectureType,
  deleteLecture
}) {
  console.log("lectureType:", lectureType);
  return (
    <div className="flex gap-5 ml-6">
      <div className="flex items-center justify-between w-full gap-5">
        <div className="flex items-center gap-5">
          {lectureType === "Lecture" && <OndemandVideoOutlinedIcon />}
          {lectureType === "Quiz" && <QuizOutlinedIcon />}
          <p className="break-all">{lectureTitle}</p>
        </div>
        <p className="text-sm text-gray-400">{duration}</p>
      </div>
      <div className="flex gap-3">
        <IconButton aria-label="delete" size="small" onClick={deleteLecture}>
          <DeleteOutlinedIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}

// ChapterItem.propTypes = {
//   title: PropTypes.string.isRequired,
//   duration: PropTypes.string.isRequired,
//   lectureType: PropTypes.oneOf(["Lecture", "Quiz"]).isRequired,
//   deleteLecture: PropTypes.func.isRequired,
// };