import React, { useState, useEffect } from "react";
import Button from "../../../Button";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const LectureForm = ({ onAddLecture, initialLectures }) => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [classType, setClassType] = useState("");
  const [duration, setDuration] = useState(0);
  const [embedUrl, setEmbedUrl] = useState("");
  const [lectureTitleError, setLectureTitleError] = useState("");
  const [lectures, setLectures] = useState("");

  const handleTitleChange = (e) => {
    setLectureTitle(e.target.value);
  };

  const handleClassTypeChange = (e) => {
    setClassType(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleEmbedUrlChange = (e) => {
    setEmbedUrl(e.target.value);
  };

  const validateLectureTitle = () => {
    if (!lectureTitle) {
      setLectureTitleError("Chapter title is required.");
      return false;
    }
    if (lectureTitle.length < 3 || lectureTitle.length > 80) {
      setLectureTitleError("Title must be between 3 and 80 characters.");
      return false;
    }
    setLectureTitleError("");
    return true;
  };

  // useEffect(() => {
  //   if (initialLectures.length > 0) {
  //     setLectures(initialLectures);
  //   }
  // }, [initialLectures]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateLectureTitle()) {
      onAddLecture(lectureTitle, classType, duration, embedUrl);
      console.log("add lecture successfully")
      setLectureTitle("");
      setClassType("");
      setDuration("");
      setEmbedUrl("");
    }
  };

  return (
    <div className="flex flex-col gap-3 h-min">
      <h2 className="text-lg font-semibold text-left">Chapter Item Form</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          className="w-full"
          margin="normal"
          required
          fullWidth
          label="Title"
          name="title"
          placeholder="Title"
          value={lectureTitle}
          onChange={handleTitleChange}
        />
        {lectureTitleError && (
          <p className="text-red-500">{lectureTitleError}</p>
        )}

        <div className="flex items-center gap-5">
          <FormControl required margin="normal" className="sm:w-1/3">
            <InputLabel>Class Type</InputLabel>
            <Select
              className="text-left"
              value={classType}
              label="Class Type"
              onChange={handleClassTypeChange}
            >
              <MenuItem value="video">Lecture</MenuItem>
              <MenuItem value="quiz">Quiz</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="number"
            inputProps={{
              min: 0, // Set the minimum value here
              max: 10000
            }}
            label="Duration (mins)"
            placeholder="0 minutes"
            className="sm:w-1/4"
            value={duration}
            onChange={handleDurationChange}
          />
        </div>
        <TextField
          className="w-full"
          margin="normal"
          required
          fullWidth
          id="URL"
          label="Embed URL"
          name="URL"
          placeholder="https://example.com"
          value={embedUrl}
          onChange={handleEmbedUrlChange}
          autoFocus
        />

        <Button label="Add" className="ml-auto w-min" type="submit" onClick={handleSubmit}/>
      </form>
    </div>
  );
};

export default LectureForm;