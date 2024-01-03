import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import Button from "../../../Button";
import ChapterItem from "../ChapterItem";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
});

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1.3),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const renderLecture = (chapterIndex, lectures, deleteLecture) => {
  return lectures.map((lecture, index) => (
    <AccordionDetails
      className="cursor-pointer"
      id={index}
      onClick={(event) => event.stopPropagation()}
      key={index}
    >
      <ChapterItem
        lectureTitle={lecture.lessonTitle}
        duration={lecture.duration}
        lectureType={lecture.type}
        deleteLecture={() => deleteLecture(chapterIndex, index)}
      />
    </AccordionDetails>
  ));
};

const renderChapter = (
  curriculumItems,
  deleteChapter,
  toggleLectureForm,
  deleteLecture
) => {
  return curriculumItems.map((chapter, index) => (
    <React.Fragment key={index}>
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary>
          <div className="flex items-center justify-between w-full gap-5 mr-5">
            <p className="font-semibold break-all text-body">
              {chapter.sectionTitle}
            </p>
            <p className="text-sm text-gray-400">{chapter.duration} minutes</p>
          </div>
          <div className="flex gap-3">
            <IconButton aria-label="edit" size="small">
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => deleteChapter(index)}
            >
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
        </AccordionSummary>
        {chapter.content.length > 0 && renderLecture(index, chapter.content, deleteLecture)}
      </Accordion>
      <Button
        label="Add Chapter Item"
        variant="transparent"
        className="w-full"
        startIcon={<AddIcon />}
        onClick={() => toggleLectureForm(index)}
      />
    </React.Fragment>
  ));
};

export default function CurriculumList({
  curriculumItems,
  deleteChapter,
  toggleLectureForm,
  deleteLecture
}) {
  const [chapterItems, setChapterItems] = useState([]);
  
  return (
    <div className="border border-solid border-black-400">
      {renderChapter(
        curriculumItems,
        deleteChapter,
        toggleLectureForm,
        deleteLecture
      )}
    </div>
  );
}