import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

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



export default function CurriculumAccordion(props) {
  const { viewOnly, curriculumItems, handleItemClick, handleLessonDisplay, lessonTypeCheck } = props;
  
  const renderLecture = (index, lectures) => {
    return lectures.map((lecture, index) => {
      const handleClick = (event) => {
        // event.stopPropagation() 
        if(!viewOnly){
          lessonTypeCheck(lecture.type)
          handleLessonDisplay(lecture.lessonTitle);
          handleItemClick(lecture.embedUrl);
        }
      };  
      return (
        <AccordionDetails
          className="cursor-pointer"
          id={index}
          onClick={handleClick}
          // onClick={(event) => event.stopPropagation()}
          key={index}
        >
          <ChapterItem
            lectureTitle={lecture.lessonTitle}
            duration={lecture.duration}
            lectureType={lecture.type}
          />
        </AccordionDetails>
      )
    });
  };
  
  const renderChapter = (curriculumItems) => {
    return curriculumItems.map((chapter, index) => (
      <React.Fragment key={index}>
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary>
            <div className="flex items-center justify-between w-full gap-5 mr-5">
              <p className="font-semibold text-left break-all text-body">
                {chapter.sectionTitle}
              </p>
              <p className="text-sm text-gray-400">{chapter.duration} minutes</p>
            </div>
          </AccordionSummary>
          {chapter.content.length > 0 && renderLecture(index, chapter.content)}
        </Accordion>
      </React.Fragment>
    ));
  };
  
  return (
    <div className="border border-solid border-black-400">
      {renderChapter(curriculumItems)}
    </div>
  );
}