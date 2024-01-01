import React, { useState } from "react";
import Button from "../../../Button";
import { TextField } from "@mui/material";

export default function ChapterForm({ onAddChapter }) {
  const [chapterTitle, setChapterTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [chapterTitleError, setChapterTitleError] = useState("");
  const [durationError, setDurationError] = useState("");

  const handleTitleChange = (e) => {
    setChapterTitle(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

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

  const handleSubmit = () => {
    if (validateChapterTitle(chapterTitle)) {
      onAddChapter(chapterTitle, duration);
      setChapterTitle("");
      setDuration("");
    }
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
            value={chapterTitle}
            onChange={handleTitleChange}
          />
          <TextField
            type="text"
            label="Duration"
            placeholder="1 hour 30 minutes"
            className="sm:w-1/4"
            value={duration}
            onChange={handleDurationChange}
          />
        </div>
        {chapterTitleError && <p className="text-red-500">{chapterTitleError}</p>}
        <div className="text-left">
          <Button
            className="ml-auto w-min"
            label="Add"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}