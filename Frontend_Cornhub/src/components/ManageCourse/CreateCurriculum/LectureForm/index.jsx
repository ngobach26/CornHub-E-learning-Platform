import React, { useState, useEffect } from "react";
import Button from "../../../Button";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import QuizCreatorPopup from "../QuizCreatorPopup";

const LectureForm = ({ onAddLecture, initialLectures }) => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [classType, setClassType] = useState("");
  const [duration, setDuration] = useState(0);
  const [embedUrl, setEmbedUrl] = useState("");
  const [lectureTitleError, setLectureTitleError] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [showQuizPopup, setShowQuizPopup] = useState(false);

  const openQuizPopup = () => {
    setShowQuizPopup(true);
  };

  const closeQuizPopup = () => {
    setShowQuizPopup(false);
  };

  const saveQuizData = (newQuizData) => {
    setQuizData(newQuizData);
    closeQuizPopup();
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateLectureTitle()) {
      onAddLecture(lectureTitle, classType, duration, embedUrl, quizData);
      console.log("add lecture successfully")
      console.log(lectureTitle);
      console.log(classType);
      console.log(duration);
      console.log(embedUrl);
      console.log(quizData);
      setLectureTitle("");
      setClassType("");
      setDuration(0);
      setEmbedUrl("");  
      setQuizData([]);
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
              <MenuItem value="video">Video</MenuItem>
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
        {classType==='video' && <TextField
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
        />}
        {classType==='quiz' && (
          <>
            <div className="mb-4">
              <Button label="Create Test" onClick={openQuizPopup}/>
            </div>
            {showQuizPopup && (
              <QuizCreatorPopup
                quizData={quizData}
                setQuizData={saveQuizData}
                onClose={closeQuizPopup}
              />
            )}
          </>
        )}

        <Button label="Add" className="ml-auto w-min" type="submit" onClick={handleSubmit}/>
      </form>
    </div>
  );
};

export default LectureForm;