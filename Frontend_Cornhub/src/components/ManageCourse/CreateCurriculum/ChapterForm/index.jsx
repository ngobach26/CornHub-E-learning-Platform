import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../../../Button";
import { TextField } from "@mui/material";

export default function ChapterForm() {
  // const dispatch = useDispatch();
  const [chapterTitle, setChapterTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [chapterTitleError, setChapterTitleError] = useState("");
  const [durationError, setDurationError] = useState("");
  const isEditMode = false; // Set to true if it's edit mode

  const validateChapterTitle = (value) => {
    if (!value) {
      setChapterTitleError("Chapter title is required.");
      return false;
    }
    if (value.length < 3 || value.length > 80) {
      setChapterTitleError("Title must be between 3 and 80 characters.");
      return false;
    }
    setChapterTitleError("");
    return true;
  };

  const validateDuration = (value) => {
    // Add any specific validation logic for the duration if needed
    return true;
  };
  return (
    <div className="flex flex-col gap-3 h-min">
      <h2 className="text-lg font-semibold text-left">Edit/Add new chapter</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-2 mb-3 sm:flex-row">
          <TextField
            label="Title"
            type="text"
            placeholder="Title"
            required
            className="sm:w-3/4"
          />
          <TextField
            type="time"
            inputProps={{ step: 2 }}
            className="sm:w-1/4"
          />
        </div>
        <div className="text-left">
          <Button
            // label={isEditMode ? 'Update' : 'Add'}
            className="ml-auto w-min"
            label="Add"
            // onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}