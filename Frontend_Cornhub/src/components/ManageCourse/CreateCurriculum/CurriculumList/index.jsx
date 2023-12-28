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
// import ChapterItem from "../ChapterItem";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))({
  // border: `1px solid ${theme.palette.divider}`,
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

export default function CurriculumList() {
  return (
    <div className="border border-solid border-black-400">
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary>
          <div className="flex items-center justify-between w-full gap-5 mr-5">
            <p className="font-semibold break-all text-body">
              chaper title
              {/* {chapter.chapterTitle} */}
            </p>
            {/* <p className='text-sm text-labelText'>{chapter?.duration}</p> */}
            <p className="text-sm text-gray-400"> duration </p>
          </div>
          <div className="flex gap-3">
            <IconButton aria-label="edit" size="small">
              <EditOutlinedIcon
                fontSize="small"
                // onClick={handleEditChapter}
              />
            </IconButton>
            <IconButton aria-label="delete" size="small">
              <DeleteOutlinedIcon
                fontSize="small"
                // onClick={handleDeleteChapter}
              />
            </IconButton>
          </div>
          {/* <div>chapter content</div> */}
        </AccordionSummary>
      </Accordion>
      <Button
        label="Add Chapter Item"
        variant="transparent"
        className="w-full"
        startIcon={<AddIcon />}
        // onClick={handleAddChapterItem}
      />
    </div>
  );
}